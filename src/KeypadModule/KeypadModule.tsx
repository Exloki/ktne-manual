import DrawingCanvas from '../components/DrawingCanvas/DrawingCanvas';
import './KeypadModule.css';
import Keypads from './img/keypad.png';

function KeypadModule() {

  return (
      <div>
          <h3>Keypads</h3>
              1) Find column with all 4 symbols on keypad<br/>
              2) Push from top to bottom of column<br/>
                  Highlighted symbols are unique 
        <DrawingCanvas 
          backgroundImage={Keypads} 
          strokeColor="#FF0000" 
          strokeWidth={50}
          strokeOpacity={0.5}
          isHighlighter={true}
          buttonText="Clear Highlighter"
          buttonPosition="far-below"
          className="keypad-drawing-canvas"
        />
      </div>
  );
}

export default KeypadModule;
