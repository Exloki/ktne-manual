import React, { useRef, useState, useEffect } from 'react';
import './DrawingCanvas.css';

interface DrawingCanvasProps {
  width?: number;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
  backgroundImage?: string;
  className?: string;
  buttonText?: string;
  buttonPosition?: 'default' | 'below' | 'far-below';
  isHighlighter?: boolean;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  width,
  height,
  strokeColor = '#FF0000',
  strokeWidth = 3,
  strokeOpacity = 1,
  backgroundImage,
  className = '',
  buttonText = 'Clear Drawing',
  buttonPosition = 'default',
  isHighlighter = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: width || 0, height: height || 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

  // Add a ref to store the last position
  const lastPos = useRef({ x: 0, y: 0 });

  // Handle image loading and determine canvas size
  useEffect(() => {
    if (backgroundImage) {
      const img = new Image();
      img.src = backgroundImage;
      img.onload = () => {
        setImageLoaded(true);
        
        // If no explicit dimensions are provided, use the image's natural dimensions
        if (!width || !height) {
          setCanvasSize({
            width: img.naturalWidth,
            height: img.naturalHeight
          });
        }
      };
    }
  }, [backgroundImage, width, height]);

  // Initialize canvas context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageLoaded) return;

    // Set canvas dimensions
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    const context = canvas.getContext('2d');
    if (!context) return;
    
    setCtx(context);
    
    // If there's a background image, load it
    if (backgroundImage) {
      const img = new Image();
      img.src = backgroundImage;
      img.onload = () => {
        context.drawImage(img, 0, 0, canvasSize.width, canvasSize.height);
      };
    }
    
    return () => {
      setCtx(null);
    };
  }, [backgroundImage, canvasSize, imageLoaded]);

  // Handle resize for responsive behavior
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current || !ctx) return;

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Get the container's width for responsive sizing
      const containerWidth = containerRef.current?.clientWidth || canvasSize.width;
      const aspectRatio = canvasSize.height / canvasSize.width;
      
      // Maintain aspect ratio
      const responsiveHeight = containerWidth * aspectRatio;
      
      // Update canvas style (not the actual canvas dimensions)
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${responsiveHeight}px`;
      
      // Redraw background on resize
      if (backgroundImage) {
        const img = new Image();
        img.src = backgroundImage;
        img.onload = () => {
          if (ctx) {
            ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
            ctx.drawImage(img, 0, 0, canvasSize.width, canvasSize.height);
          }
        };
      }
    };

    // Initial sizing
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ctx, backgroundImage, canvasSize]);

  const getScaledCoordinates = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    
    // Calculate the scaling factor between the canvas element display size and its internal dimensions
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    // Apply the scaling factor to get the correct coordinates
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const calculateDistance = (point1: {x: number, y: number}, point2: {x: number, y: number}) => {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  };

  const configureDrawingStyle = () => {
    if (!ctx) return;
    
    // Apply highlighter effect if enabled
    if (isHighlighter) {
      ctx.globalAlpha = strokeOpacity;
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = strokeColor;
      ctx.fillStyle = strokeColor;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      if (ctx.globalCompositeOperation) {
        // This creates the transparent overlay effect typical of highlighters
        ctx.globalCompositeOperation = 'multiply';
      }
    } else {
      // Standard drawing
      ctx.globalAlpha = 1;
      ctx.strokeStyle = strokeColor;
      ctx.fillStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      if (ctx.globalCompositeOperation) {
        ctx.globalCompositeOperation = 'source-over';
      }
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctx) return;
    
    const { x, y } = getScaledCoordinates(e.clientX, e.clientY);
    
    configureDrawingStyle();
    
    ctx.beginPath();
    ctx.moveTo(x, y);

    if (isHighlighter) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    
    setIsDrawing(true);
    
    // Store the last position for line drawing
    lastPos.current = { x, y };
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx) return;
    
    const { x, y } = getScaledCoordinates(e.clientX, e.clientY);
    
    configureDrawingStyle();
    
    if (isHighlighter) {
      const distance = calculateDistance(lastPos.current, {x, y});
      
      // Skip if the distance is too small
      if (distance < 1) return;
      
      // For very large strokes, add intermediate points to smooth the line
      // The number of points is proportional to the distance and stroke width
      if (distance > strokeWidth / 2) {
        const steps = Math.ceil(distance / (strokeWidth / 4));
        
        for (let i = 0; i < steps; i++) {
          const t = i / steps;
          const nextX = lastPos.current.x + (x - lastPos.current.x) * t;
          const nextY = lastPos.current.y + (y - lastPos.current.y) * t;
          
          ctx.beginPath();
          ctx.moveTo(lastPos.current.x, lastPos.current.y);
          ctx.lineTo(nextX, nextY);
          ctx.stroke();
          
          lastPos.current = { x: nextX, y: nextY };
        }
      }
      
      // Draw the final segment
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      // Update last position
      lastPos.current = { x, y };
    } else {
      // Standard drawing behavior
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (!ctx) return;
    ctx.closePath();
    setIsDrawing(false);
    
    // Reset composite operation and alpha
    if (ctx.globalCompositeOperation) {
      ctx.globalCompositeOperation = 'source-over';
    }
    ctx.globalAlpha = 1;
  };

  const clearCanvas = () => {
    if (!ctx || !canvasRef.current) return;
    
    // For background images, load the image first then clear
    if (backgroundImage) {
      const img = new Image();
      img.src = backgroundImage;
      img.onload = () => {
        if (ctx) {
          ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
          ctx.drawImage(img, 0, 0, canvasSize.width, canvasSize.height);
        }
      };
    } else {
      // If no background image, just clear the canvas
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    }
  };

  // Determine the button class based on the buttonPosition prop
  const buttonClassName = `clear-button position-${buttonPosition}`;

  return (
    <div 
      className={`drawing-canvas-container ${className}`}
      ref={containerRef}
    >
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="drawing-canvas"
      />
      <button onClick={clearCanvas} className={buttonClassName}>
        {buttonText}
      </button>
    </div>
  );
};

export default DrawingCanvas; 