import React, { useState } from 'react';
import './MemoryModule.css';

function MemoryModule() {
  const [stages, setStages] = useState<Array<{position: number | null, label: number | null}>>(
    Array(4).fill(null).map(() => ({position: null, label: null}))
  );

  const handleSelect = (stageIndex: number, field: 'position' | 'label', value: number) => {
    const newStages = [...stages];
    newStages[stageIndex] = { ...newStages[stageIndex], [field]: value };
    setStages(newStages);
  };

  const handleClear = () => {
    setStages(Array(4).fill(null).map(() => ({position: null, label: null})));
  };

  const isStageComplete = (stageIndex: number) => {
    if (stageIndex < 2) {
      return stages[stageIndex].position !== null && stages[stageIndex].label !== null;
    } else {
      return stages[stageIndex].label !== null;
    }
  };

  return (
      <div>
        <h3>Memory</h3>
        {/* Center the original non-editable Memory table */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <table>
            <thead>
            <tr>
              <td colSpan={5}>
                Make sure to write down the label of each phase, and position of phase 1 and 2.
              </td>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th>DISPLAY</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
            </tr>
            <tr style={{ backgroundColor: isStageComplete(0) ? '#bbb' : 'transparent' }}>
              <th>STAGE 1</th>
              <td>2nd POS</td>
              <td>2nd POS</td>
              <td>3rd POS</td>
              <td>4th POS</td>
            </tr>
            <tr style={{ backgroundColor: isStageComplete(1) ? '#bbb' : 'transparent' }}>
              <th>STAGE 2</th>
              <td>"4"</td>
              <td><i>Stage 1 POS</i></td>
              <td>1st POS</td>
              <td><i>Stage 1 POS</i></td>
            </tr>
            <tr style={{ backgroundColor: isStageComplete(2) ? '#bbb' : 'transparent' }}>
              <th>STAGE 3</th>
              <td><i>Stage 2 LABEL</i></td>
              <td><i>Stage 1 LABEL</i></td>
              <td>3rd POS</td>
              <td>"4"</td>
            </tr>
            <tr style={{ backgroundColor: isStageComplete(3) ? '#bbb' : 'transparent' }}>
              <th>STAGE 4</th>
              <td><i>Stage 1 POS</i></td>
              <td>1st POS</td>
              <td><i>Stage 2 POS</i></td>
              <td><i>Stage 2 POS</i></td>
            </tr>
            <tr>
              <th>STAGE 5</th>
              <td><i>Stage 1 LABEL</i></td>
              <td><i>Stage 2 LABEL</i></td>
              <td><i>Stage 4 LABEL</i></td>
              <td><i>Stage 3 LABEL</i></td>
            </tr>
            </tbody>
          </table>
        </div>

        {/* Button selection table for user data */}
        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <table>
            <thead>
            <tr>
              <th>Stage</th>
              <th style={{ width: '150px' }}>Position</th>
              <th style={{ width: '150px' }}>Label</th>
            </tr>
            </thead>
            <tbody>
            {stages.map((stage, stageIndex) => (
                <tr key={stageIndex}>
                  <td style={{ textAlign: 'center' }}>
                    <b>{stageIndex + 1}</b>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {stage.position === null ? (
                      stageIndex < 2 ? (
                        <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                          {[1, 2, 3, 4].map(num => (
                            <button 
                              key={num} 
                              onClick={() => handleSelect(stageIndex, 'position', num)}
                              style={{ width: '30px', height: '30px' }}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div style={{ backgroundColor: '#ddd', borderRadius: '3px', padding: '5px', width: '100px', margin: '0 auto' }}>
                          N/A
                        </div>
                      )
                    ) : (
                      <div style={{ border: '1px solid #ccc', borderRadius: '3px', padding: '5px', width: '30px', margin: '0 auto' }}>
                        {stage.position}
                      </div>
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {stage.label === null ? (
                      <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                        {[1, 2, 3, 4].map(num => (
                          <button 
                            key={num} 
                            onClick={() => handleSelect(stageIndex, 'label', num)}
                            style={{ width: '30px', height: '30px' }}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div style={{ border: '1px solid #ccc', borderRadius: '3px', padding: '5px', width: '30px', margin: '0 auto' }}>
                        {stage.label}
                      </div>
                    )}
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
          <h3 onClick={handleClear} className="reset">RESET</h3>
        </div>
      </div>
  );
}

export default MemoryModule;