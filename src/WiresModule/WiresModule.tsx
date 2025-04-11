import './WiresModule.css';
import { useState, useEffect } from 'react';

function WiresModule() {
    // State to track wires by color
    const [wires, setWires] = useState({
        red: 0,
        blue: 0,
        yellow: 0,
        white: 0,
        black: 0
    });
    
    // Track the sequence of wires added
    const [wireSequence, setWireSequence] = useState<string[]>([]);
    
    // Track the last wire color added
    const [lastWireColor, setLastWireColor] = useState<string | null>(null);
    
    // State to track which rules are highlighted
    const [highlightedRules, setHighlightedRules] = useState<string[]>([]);
    
    // Calculate total wires
    const totalWires = wireSequence.length;
    
    // Add a wire of the specified color
    const addWire = (color: keyof typeof wires) => {
        if (totalWires >= 6) return; // Don't allow more than 6 wires
        
        setWires(prev => ({
            ...prev,
            [color]: prev[color] + 1
        }));
        setWireSequence(prev => [...prev, color]);
        setLastWireColor(color);
    };
    
    // Check rules when wires change
    useEffect(() => {
        const newHighlightedRules: string[] = [];
        
        // Only check rules if there are wires
        if (totalWires > 0) {
            // Check 3 WIRES rules
            if (totalWires === 3) {
                if (wires.red === 0) {
                    newHighlightedRules.push('3-1');
                }
                if (wires.blue > 1) {
                    newHighlightedRules.push('3-2');
                }
                // The "otherwise" rule is always highlighted if wire count matches
                newHighlightedRules.push('3-3');
            }
            
            // Check 4 WIRES rules
            if (totalWires === 4) {
                if (wires.red > 1) {
                    newHighlightedRules.push('4-1');
                }
                if (wires.red === 0 && lastWireColor === 'yellow') {
                    newHighlightedRules.push('4-2');
                }
                if (wires.blue === 1) {
                    newHighlightedRules.push('4-3');
                }
                if (wires.yellow > 2) {
                    newHighlightedRules.push('4-4');
                }
                // The "otherwise" rule is always highlighted if wire count matches
                newHighlightedRules.push('4-5');
            }
            
            // Check 5 WIRES rules
            if (totalWires === 5) {
                if (lastWireColor === 'black') {
                    newHighlightedRules.push('5-1');
                }
                if (wires.red === 1 && wires.yellow > 1) {
                    newHighlightedRules.push('5-2');
                }
                if (wires.black === 0) {
                    newHighlightedRules.push('5-3');
                }
                // The "otherwise" rule is always highlighted if wire count matches
                newHighlightedRules.push('5-4');
            }
            
            // Check 6 WIRES rules
            if (totalWires === 6) {
                if (wires.yellow === 0) {
                    newHighlightedRules.push('6-1');
                }
                if (wires.yellow === 1 && wires.white > 1) {
                    newHighlightedRules.push('6-2');
                }
                if (wires.red === 0) {
                    newHighlightedRules.push('6-3');
                }
                // The "otherwise" rule is always highlighted if wire count matches
                newHighlightedRules.push('6-4');
            }
        }
        
        setHighlightedRules(newHighlightedRules);
    }, [wires, totalWires, lastWireColor]);
    
    return (
        <div>
            <h3>Simple Wires</h3>
            <table className="table_simplewires">
                <tbody>
                    <tr>
                        <th colSpan={2}>Cut <b>one</b> wire. Wires are numbered from top to bottom</th>
                    </tr>
                    <tr>
                        <td>
                            <div className="wire-header">
                                <h4 className={totalWires === 3 ? 'active-rule' : ''}>3 WIRES</h4>
                            </div>
                            <ul>
                                <li className={highlightedRules.includes('3-1') ? 'highlighted-rule' : ''}>0 <span className="red">red</span>: <b>2nd</b></li>
                                <li className={highlightedRules.includes('3-2') ? 'highlighted-rule' : ''}>&gt;1 <span className="blue">blue</span>: <b>2nd blue</b></li>
                                <li className={highlightedRules.includes('3-3') ? 'highlighted-rule' : ''}>otherwise: <b>last</b></li>
                            </ul>
                        </td>
                        <td>
                            <div className="wire-header">
                                <h4 className={totalWires === 5 ? 'active-rule' : ''}>5 WIRES</h4>
                            </div>
                            <ul>
                                <li className={highlightedRules.includes('5-1') ? 'highlighted-rule' : ''}>last=black &amp; serial=odd: <b>4th</b></li>
                                <li className={highlightedRules.includes('5-2') ? 'highlighted-rule' : ''}>1 <span className="red">red</span> &amp; &gt;1 <span className="yellow">yellow</span>: <b>1st</b></li>
                                <li className={highlightedRules.includes('5-3') ? 'highlighted-rule' : ''}>0 black: <b>2nd</b></li>
                                <li className={highlightedRules.includes('5-4') ? 'highlighted-rule' : ''}>otherwise: <b>1st</b></li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="wire-header">
                                <h4 className={totalWires === 4 ? 'active-rule' : ''}>4 WIRES</h4>
                            </div>
                            <ul>
                                <li className={highlightedRules.includes('4-1') ? 'highlighted-rule' : ''}>&gt;1 <span className="red">red </span>&amp; serial=odd: <b>last red</b></li>
                                <li className={highlightedRules.includes('4-2') ? 'highlighted-rule' : ''}>0 <span className="red">red</span> &amp; last=<span className="yellow">yellow</span>: <b>1st</b></li>
                                <li className={highlightedRules.includes('4-3') ? 'highlighted-rule' : ''}>1 <span className="blue">blue</span>: <b>1st</b></li>
                                <li className={highlightedRules.includes('4-4') ? 'highlighted-rule' : ''}>&gt;2 <span className="yellow">yellow</span>: <b>last</b></li>
                                <li className={highlightedRules.includes('4-5') ? 'highlighted-rule' : ''}>otherwise: <b>2nd</b></li>
                            </ul>
                        </td>
                        <td>
                            <div className="wire-header">
                                <h4 className={totalWires === 6 ? 'active-rule' : ''}>6 WIRES</h4>
                            </div>
                            <ul>
                                <li className={highlightedRules.includes('6-1') ? 'highlighted-rule' : ''}>0 <span className="yellow">yellow</span> &amp; serial=odd: <b>3rd</b></li>
                                <li className={highlightedRules.includes('6-2') ? 'highlighted-rule' : ''}>1 <span className="yellow">yellow</span> &amp; &gt;1 white: <b>4th</b></li>
                                <li className={highlightedRules.includes('6-3') ? 'highlighted-rule' : ''}>0 <span className="red">red</span>: <b>last</b></li>
                                <li className={highlightedRules.includes('6-4') ? 'highlighted-rule' : ''}>otherwise: <b>4th</b></li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            {/* Wire display area */}
            <div className="wire-display">
                {wireSequence.map((color, index) => (
                    <div key={index} className={`wire ${color}`}></div>
                ))}
            </div>
            
            {/* Wire count display */}
            <div className="wire-count">
                <p>Total wires: {totalWires}</p>
                <p>
                    Red: {wires.red}, 
                    Blue: {wires.blue}, 
                    Yellow: {wires.yellow}, 
                    White: {wires.white}, 
                    Black: {wires.black}
                </p>
            </div>
            
            {/* Wire buttons */}
            <div className="wire-buttons">
                <button 
                    className="wire-button red-button" 
                    onClick={() => addWire('red')}
                >
                    Red
                </button>
                <button 
                    className="wire-button blue-button" 
                    onClick={() => addWire('blue')}
                >
                    Blue
                </button>
                <button 
                    className="wire-button yellow-button" 
                    onClick={() => addWire('yellow')}
                >
                    Yellow
                </button>
                <button 
                    className="wire-button white-button" 
                    onClick={() => addWire('white')}
                >
                    White
                </button>
                <button 
                    className="wire-button black-button" 
                    onClick={() => addWire('black')}
                >
                    Black
                </button>
                <button 
                    className="wire-button reset-button" 
                    onClick={() => {
                        setWires({red: 0, blue: 0, yellow: 0, white: 0, black: 0});
                        setWireSequence([]);
                        setLastWireColor(null);
                    }}
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

export default WiresModule;
