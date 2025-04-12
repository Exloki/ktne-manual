import DrawingCanvas from '../components/DrawingCanvas/DrawingCanvas';
import './VennWireModule.css';
import compWires from './img/compWires.png';

function VennWireModule() {


  return (
      <div>
          <h3>Complicated Wires</h3>
          <DrawingCanvas 
            backgroundImage={compWires} 
            strokeColor="#FF0000"
            strokeWidth={4}
            buttonText="Clear Pencil"
            buttonPosition="default"
            className="wire-drawing-canvas"
          />
      </div>
  );
}

export default VennWireModule;
