import React from 'react';
import './EasyModeToggle.css';

// Create a context to share the easy mode state across components
export const EasyModeContext = React.createContext<boolean>(false);

interface EasyModeToggleProps {
  isEasyMode: boolean;
  toggleEasyMode: () => void;
}

const EasyModeToggle: React.FC<EasyModeToggleProps> = ({ isEasyMode, toggleEasyMode }) => {
  return (
    <div className="easy-mode-toggle">
      <div className="easy-mode-label">Easy Mode</div>
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={isEasyMode}
          onChange={toggleEasyMode}
        />
        <span className="toggle-slider"></span>
      </label>
      <div className="tooltip">Easy mode will enable easier solving for Wires, Passowrds, & Morse Code</div>
    </div>
  );
};

export default EasyModeToggle; 