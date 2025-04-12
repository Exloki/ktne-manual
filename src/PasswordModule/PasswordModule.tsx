import React, { useEffect, useMemo, useState, useContext } from 'react';
import './PasswordModule.css';
import { EasyModeContext } from '../components/EasyModeToggle';

function PasswordModule() {
    // Use the existing Easy Mode context
    const isEasyMode = useContext(EasyModeContext);
    
    const allWords = useMemo(() => ["about", "after", "again", "below", "could",
        "every", "first", "found", "great", "house",
        "large", "learn", "never", "other", "place",
        "plant", "point", "right", "small", "sound",
        "spell", "still", "study", "their", "there",
        "these", "thing", "think", "three", "water",
        "where", "which", "world", "would", "write"], []);

    const [possibleWords, setPossibleWords] = useState(allWords);
    const [selected1stCharacters, setPossible1stCharacters] = useState<Set<string>>(new Set([]));
    const [selected2ndCharacters, setPossible2ndCharacters] = useState<Set<string>>(new Set([]));
    const [selected3rdCharacters, setPossible3rdCharacters] = useState<Set<string>>(new Set([]));
    const [selected4thCharacters, setPossible4thCharacters] = useState<Set<string>>(new Set([]));
    const [selected5thCharacters, setPossible5thCharacters] = useState<Set<string>>(new Set([]));
    
    // Add state for the text inputs
    const [input1stCharacters, setInput1stCharacters] = useState("");
    const [input2ndCharacters, setInput2ndCharacters] = useState("");
    const [input3rdCharacters, setInput3rdCharacters] = useState("");
    const [input4thCharacters, setInput4thCharacters] = useState("");
    const [input5thCharacters, setInput5thCharacters] = useState("");
    
    // Add state to track words filtered only by 1st column
    const [wordsFilteredBy1stColumn, setWordsFilteredBy1stColumn] = useState(allWords);

    useEffect(() => {
        let filteredWords = allWords;
        if (selected1stCharacters.size > 0) {
            filteredWords = filteredWords.filter(word => selected1stCharacters.has(word.charAt(0)));
        }
        if (selected2ndCharacters.size > 0) {
            filteredWords = filteredWords.filter(word => selected2ndCharacters.has(word.charAt(1)));
        }
        if (selected3rdCharacters.size > 0) {
            filteredWords = filteredWords.filter(word => selected3rdCharacters.has(word.charAt(2)));
        }
        if (selected4thCharacters.size > 0) {
            filteredWords = filteredWords.filter(word => selected4thCharacters.has(word.charAt(3)));
        }
        if (selected5thCharacters.size > 0) {
            filteredWords = filteredWords.filter(word => selected5thCharacters.has(word.charAt(4)));
        }
        setPossibleWords(filteredWords);
        
        // Filter words based on just the first column selection
        let wordsFrom1stColumn = allWords;
        if (selected1stCharacters.size > 0) {
            wordsFrom1stColumn = allWords.filter(word => selected1stCharacters.has(word.charAt(0)));
        }
        setWordsFilteredBy1stColumn(wordsFrom1stColumn);
    }, [selected1stCharacters, selected2ndCharacters, selected3rdCharacters, selected4thCharacters, selected5thCharacters, allWords]);

    function getAllUniqueFirstCharacters(index: number): Set<string> {
        const firstCharacters = allWords.map((string) => string.charAt(index));
        return new Set(firstCharacters);
    }

    function getUniquePossibleFirstCharacters(index: number): Set<string> {
        const firstCharacters = possibleWords.map((string) => string.charAt(index));
        return new Set(firstCharacters);
    }

    // New function to get characters that would be possible based only on first column selection
    function getPossibleCharactersFrom1stColumnSelection(index: number): Set<string> {
        const characters = wordsFilteredBy1stColumn.map((string) => string.charAt(index));
        return new Set(characters);
    }

    function getCharClass(character: string, possibleChars: Set<string>, selectedChars: Set<string>, index: number) {
        if (selectedChars.has(character)) { 
            return "characterSelected"; 
        }
        
        if (index === 0) {
            // First column - use standard highlighting
            if (possibleChars.has(character)) { 
                return "possibleCharacter"; 
            }
        } else {
            // Columns 2-5
            const possibleBasedOn1stColumn = getPossibleCharactersFrom1stColumnSelection(index);
            
            // If character is in current possible set (based on all selections)
            if (possibleChars.has(character)) {
                return "possibleCharacter";
            } 
            // If character is possible based on first column but not in current possible set
            else if (possibleBasedOn1stColumn.has(character)) {
                return "secondaryPossibleCharacter";
            }
        }
        
        return "";
    }

    function updatePossible1stCharacters(character: string) {
        if (selected1stCharacters.has(character)) {
            selected1stCharacters.delete(character);
        } else {
            selected1stCharacters.add(character);
        }
        setPossible1stCharacters(new Set(selected1stCharacters));
    }

    function updatePossible2ndCharacters(character: string) {
        if (selected2ndCharacters.has(character)) {
            selected2ndCharacters.delete(character);
        } else {
            selected2ndCharacters.add(character);
        }
        setPossible2ndCharacters(new Set(selected2ndCharacters));
    }

    function updatePossible3rdCharacters(character: string) {
        if (selected3rdCharacters.has(character)) {
            selected3rdCharacters.delete(character);
        } else {
            selected3rdCharacters.add(character);
        }
        setPossible3rdCharacters(new Set(selected3rdCharacters));
    }

    function updatePossible4thCharacters(character: string) {
        if (selected4thCharacters.has(character)) {
            selected4thCharacters.delete(character);
        } else {
            selected4thCharacters.add(character);
        }
        setPossible4thCharacters(new Set(selected4thCharacters));
    }

    function updatePossible5thCharacters(character: string) {
        if (selected5thCharacters.has(character)) {
            selected5thCharacters.delete(character);
        } else {
            selected5thCharacters.add(character);
        }
        setPossible5thCharacters(new Set(selected5thCharacters));
    }

    // Function to clear all selections
    function clearSelections() {
        setPossible1stCharacters(new Set([]));
        setPossible2ndCharacters(new Set([]));
        setPossible3rdCharacters(new Set([]));
        setPossible4thCharacters(new Set([]));
        setPossible5thCharacters(new Set([]));
        setPossibleWords(allWords);
        setWordsFilteredBy1stColumn(allWords);
    }

    // Function to handle input changes and update the selected characters
    function handleInput1stChange(e: React.ChangeEvent<HTMLInputElement>) {
        const input = e.target.value.toLowerCase();
        setInput1stCharacters(input);
        const uniqueChars = new Set<string>(input.split('').filter(char => /[a-z]/.test(char)));
        setPossible1stCharacters(uniqueChars);
    }

    function handleInput2ndChange(e: React.ChangeEvent<HTMLInputElement>) {
        const input = e.target.value.toLowerCase();
        setInput2ndCharacters(input);
        const uniqueChars = new Set<string>(input.split('').filter(char => /[a-z]/.test(char)));
        setPossible2ndCharacters(uniqueChars);
    }

    function handleInput3rdChange(e: React.ChangeEvent<HTMLInputElement>) {
        const input = e.target.value.toLowerCase();
        setInput3rdCharacters(input);
        const uniqueChars = new Set<string>(input.split('').filter(char => /[a-z]/.test(char)));
        setPossible3rdCharacters(uniqueChars);
    }

    function handleInput4thChange(e: React.ChangeEvent<HTMLInputElement>) {
        const input = e.target.value.toLowerCase();
        setInput4thCharacters(input);
        const uniqueChars = new Set<string>(input.split('').filter(char => /[a-z]/.test(char)));
        setPossible4thCharacters(uniqueChars);
    }

    function handleInput5thChange(e: React.ChangeEvent<HTMLInputElement>) {
        const input = e.target.value.toLowerCase();
        setInput5thCharacters(input);
        const uniqueChars = new Set<string>(input.split('').filter(char => /[a-z]/.test(char)));
        setPossible5thCharacters(uniqueChars);
    }

    // Function to clear all inputs
    function clearInputs() {
        setInput1stCharacters("");
        setInput2ndCharacters("");
        setInput3rdCharacters("");
        setInput4thCharacters("");
        setInput5thCharacters("");
        clearSelections();
    }

    return (
        <div>
            <h3>Password</h3>
            <p><i><span style={{ color: 'green' }}>Selected</span> | <span style={{ color: 'blue' }}>Possible (based on selection)</span> | <span style={{ color: '#FFD700' }}>Possible (based on first column)</span></i></p>
            <div className="possibleWords">
                {possibleWords.sort((a, b) => a.localeCompare(b)).join(', ')}
            </div>

            <div className="grid">
                <div>
                    <div className="characterCount">{getUniquePossibleFirstCharacters(0).size}</div>
                    {Array.from(getAllUniqueFirstCharacters(0).values()).sort((a, b) => a.localeCompare(b)).map(x =>
                        <div key={`char-0-${x}`}
                             className={getCharClass(x, getUniquePossibleFirstCharacters(0), selected1stCharacters, 0)}
                             onClick={() => updatePossible1stCharacters(x)}>
                            {x}
                        </div>
                    )}
                </div>
                <div>
                    <div className="characterCount">{getUniquePossibleFirstCharacters(1).size}</div>
                    {Array.from(getAllUniqueFirstCharacters(1).values()).sort((a, b) => a.localeCompare(b)).map(x =>
                        <div key={`char-1-${x}`}
                             className={getCharClass(x, getUniquePossibleFirstCharacters(1), selected2ndCharacters, 1)}
                             onClick={() => updatePossible2ndCharacters(x)}>
                            {x}
                        </div>
                    )}
                </div>
                <div>
                    <div className="characterCount">{getUniquePossibleFirstCharacters(2).size}</div>
                    {Array.from(getAllUniqueFirstCharacters(2).values()).sort((a, b) => a.localeCompare(b)).map(x =>
                        <div key={`char-2-${x}`}
                             className={getCharClass(x, getUniquePossibleFirstCharacters(2), selected3rdCharacters, 2)}
                             onClick={() => updatePossible3rdCharacters(x)}>
                            {x}
                        </div>
                    )}
                </div>
                <div>
                    <div className="characterCount">{getUniquePossibleFirstCharacters(3).size}</div>
                    {Array.from(getAllUniqueFirstCharacters(3).values()).sort((a, b) => a.localeCompare(b)).map(x =>
                        <div key={`char-3-${x}`}
                             className={getCharClass(x, getUniquePossibleFirstCharacters(3), selected4thCharacters, 3)}
                             onClick={() => updatePossible4thCharacters(x)}>
                            {x}
                        </div>
                    )}
                </div>
                <div>
                    <div className="characterCount">{getUniquePossibleFirstCharacters(4).size}</div>
                    {Array.from(getAllUniqueFirstCharacters(4).values()).sort((a, b) => a.localeCompare(b)).map(x =>
                        <div key={`char-4-${x}`}
                             className={getCharClass(x, getUniquePossibleFirstCharacters(4), selected5thCharacters, 4)}
                             onClick={() => updatePossible5thCharacters(x)}>
                            {x}
                        </div>
                    )}
                </div>
            </div>

            {isEasyMode && (
                <>
                    <p><i>Click characters above, or type in the boxes below</i></p>

                    <div className="grid">
                        <div>
                            <label>1st letter</label>
                            <input 
                                type="text" 
                                value={input1stCharacters} 
                                onChange={handleInput1stChange} 
                                placeholder="e.g. abc"
                                style={{ width: '80%', marginBottom: '10px' }}
                            />
                            <div>{selected1stCharacters.size > 0 ? Array.from(selected1stCharacters).join(', ') : 'N/A'}</div>
                        </div>
                        <div>
                            <label>2nd letter</label>
                            <input 
                                type="text" 
                                value={input2ndCharacters} 
                                onChange={handleInput2ndChange} 
                                placeholder="e.g. def"
                                style={{ width: '80%', marginBottom: '10px' }}
                            />
                            <div>{selected2ndCharacters.size > 0 ? Array.from(selected2ndCharacters).join(', ') : 'N/A'}</div>
                        </div>
                        <div>
                            <label>3rd letter</label>
                            <input 
                                type="text" 
                                value={input3rdCharacters} 
                                onChange={handleInput3rdChange} 
                                placeholder="e.g. ghi"
                                style={{ width: '80%', marginBottom: '10px' }}
                            />
                            <div>{selected3rdCharacters.size > 0 ? Array.from(selected3rdCharacters).join(', ') : 'N/A'}</div>
                        </div>
                        <div>
                            <label>4th letter</label>
                            <input 
                                type="text" 
                                value={input4thCharacters} 
                                onChange={handleInput4thChange} 
                                placeholder="e.g. jkl"
                                style={{ width: '80%', marginBottom: '10px' }}
                            />
                            <div>{selected4thCharacters.size > 0 ? Array.from(selected4thCharacters).join(', ') : 'N/A'}</div>
                        </div>
                        <div>
                            <label>5th letter</label>
                            <input 
                                type="text" 
                                value={input5thCharacters} 
                                onChange={handleInput5thChange} 
                                placeholder="e.g. mno"
                                style={{ width: '80%', marginBottom: '10px' }}
                            />
                            <div>{selected5thCharacters.size > 0 ? Array.from(selected5thCharacters).join(', ') : 'N/A'}</div>
                        </div>
                    </div>
                </>
            )}

            <h3 onClick={clearInputs} className="reset">RESET</h3>
        </div>
    );
}

export default PasswordModule;
