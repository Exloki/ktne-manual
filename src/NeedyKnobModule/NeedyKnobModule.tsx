import './NeedyKnobModule.css';
import needyKnob from './img/knob.png';
import needyKnobAlt from './img/knob_2.png';

function NeedyKnobModule() {

    return (
        <div>
            <h3>Needy Knob</h3>
            <img src={needyKnob} width="100%" alt="glyphs" />
            <h3>Alternative Method</h3>
            <img src={needyKnobAlt} width="75%" alt="glyphs" />
        </div>
    );
}

export default NeedyKnobModule;
