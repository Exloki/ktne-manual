import './MorseCodeModule.css';
import tableImg from './img/results.png';
import { useState } from 'react';

function MorseCodeModule() {
    const [morseInput, setMorseInput] = useState('');
    
    // Table data for easier matching
    const morseData = [
        { morse: '... .... . .-.. .-..', word: 'shell', freq: '3.505 MHz' },
        { morse: '.... .- .-.. .-.. ...', word: 'halls', freq: '3.515 MHz' },
        { morse: '... .-.. .. -.-. -.-', word: 'slick', freq: '3.522 MHz' },
        { morse: '... - .. -. --.', word: 'sting', freq: '3.592 MHz' },
        { morse: '... - . .- -.-', word: 'steak', freq: '3.582 MHz' },
        { morse: '...- . -.-. - --- .-.', word: 'vector', freq: '3.595 MHz' },
        { morse: '... - .-. --- -... .', word: 'strobe', freq: '3.545 MHz' },
        { morse: '..-. .-.. .. -.-. -.-', word: 'flick', freq: '3.555 MHz' },
        { morse: '.-.. . .- -.- ...', word: 'leaks', freq: '3.542 MHz' },
        { morse: '-... .. ... - .-. ---', word: 'bistro', freq: '3.552 MHz' },
        { morse: '-... . .- - ...', word: 'beats', freq: '3.600 MHz' },
        { morse: '-... .-. .. -.-. -.-', word: 'brick', freq: '3.575 MHz' },
        { morse: '-... .-. . .- -.-', word: 'break', freq: '3.572 MHz' },
        { morse: '-... --- -- -... ...', word: 'bombs', freq: '3.565 MHz' },
        { morse: '- .-. .. -.-. -.-', word: 'trick', freq: '3.532 MHz' },
        { morse: '-... --- -..- . ...', word: 'boxes', freq: '3.535 MHz' }
    ];

    const addDot = () => {
        setMorseInput(prev => prev + '.');
    };

    const addDash = () => {
        setMorseInput(prev => prev + '-');
    };

    const addSpace = () => {
        setMorseInput(prev => prev + ' ');
    };

    const resetInput = () => {
        setMorseInput('');
    };

    const isRowMatching = (rowMorse: string): boolean => {
        if (!morseInput) return false;
        
        // Handle circular matching (wrap around)
        const doubledMorse = rowMorse + ' ' + rowMorse;
        return doubledMorse.includes(morseInput);
    };

    return (
        <div>
            <h3>Morse Code</h3>
            <div className="description" style={{ marginBottom: '20px' }}>The transcription of each word is below, sorted in dit-dah order, spaces ignored.<br />
              (e.g. IT .. - is sorted after V ...-, not before)</div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '0 20px', marginBottom: '20px' }}>
                <table style={{ width: '75%' }}>
                    <tbody>
                        {morseData.map((item, index) => (
                            <tr key={index} style={isRowMatching(item.morse) ? { backgroundColor: '#ffffcc' } : {}}>
                                <td>{item.morse}</td>
                                <td>{item.word}</td>
                                <td>{item.freq}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <input 
                        type="text" 
                        value={morseInput} 
                        readOnly 
                        className="morse-input"
                    />
                </div>
                <div className="buttons-container">
                    <button
                        onClick={addDot}
                        className="morse-button dot-button"
                    >
                        Dot (.)
                    </button>
                    <button
                        onClick={addDash}
                        className="morse-button dash-button"
                    >
                        Dash (-)
                    </button>
                    <button
                        onClick={addSpace}
                        className="morse-button space-button"
                    >
                        Space
                    </button>
                    <button
                        onClick={resetInput}
                        className="morse-button reset-button"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <img src={tableImg} width="100%" alt="" />
        </div>
    );
}

export default MorseCodeModule;