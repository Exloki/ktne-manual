import './MazeModule.css';
import MazeImg from './img/maze.png';
import DrawingCanvas from '../components/DrawingCanvas/DrawingCanvas';

function MazeModule() {
  return (
    <div>
      <h3>Maze</h3>
      <DrawingCanvas 
        backgroundImage={MazeImg} 
        strokeColor="#FF0000" 
        strokeWidth={2}
        buttonText="Clear Pencil"
        buttonPosition="default"
        className="maze-drawing-canvas"
      />
    </div>
  );
}

export default MazeModule;
