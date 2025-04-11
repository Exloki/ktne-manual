import React from 'react';
import ButtonComponent from '../img/module/ButtonComponent.svg';
import KeypadComponent from '../img/module/KeypadComponent.svg';
import MazeComponent from '../img/module/MazeComponent.svg';
import MemoryComponent from '../img/module/MemoryComponent.svg';
import PasswordComponent from '../img/module/PasswordComponent.svg';
import WireComponent from '../img/module/WireComponent.svg';
import SimonComponent from '../img/module/SimonComponent.svg';
import WhosOnFirstComponent from '../img/module/WhosOnFirstComponent.svg';
import VennWireComponent from '../img/module/VennWireComponent.svg';
import WireSequenceComponent from '../img/module/WireSequenceComponent.svg';
import MorseCodeComponent from '../img/module/MorseCodeComponent.svg';
import NeedyKnobComponent from '../img/module/NeedyKnobComponent.svg';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  // Group modules into 3 groups of 4 for better vertical distribution
  const moduleGroups = [
    [
      { id: 'WiresModule', img: WireComponent, alt: 'Wire Module' },
      { id: 'ButtonModule', img: ButtonComponent, alt: 'Button Module' },
      { id: 'MazeModule', img: MazeComponent, alt: 'Maze Module' },
      { id: 'KeypadModule', img: KeypadComponent, alt: 'Keypad Module' },
    ],
    [
      { id: 'MemoryModule', img: MemoryComponent, alt: 'Memory Module' },
      { id: 'PasswordModule', img: PasswordComponent, alt: 'Password Module' },
      { id: 'SimonModule', img: SimonComponent, alt: "Simon's said Module" },
      { id: 'WhosOnFirstModule', img: WhosOnFirstComponent, alt: 'WhosOnFirst Module' },
    ],
    [
      { id: 'VennWireModule', img: VennWireComponent, alt: 'VennWire Module' },
      { id: 'WireSequenceModule', img: WireSequenceComponent, alt: 'Wire Sequence Module' },
      { id: 'MorseCodeModule', img: MorseCodeComponent, alt: 'MorseCode Module' },
      { id: 'NeedyKnobModule', img: NeedyKnobComponent, alt: 'NeedyKnob Module' },
    ]
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <h3>Quick Navigation</h3>
        
        {moduleGroups.map((group, groupIndex) => (
          <div key={`group-${groupIndex}`} className="sidebar-grid">
            {group.map((module) => (
              <a 
                key={module.id} 
                href={`#${module.id}`} 
                className="sidebar-item"
              >
                <img src={module.img} alt={module.alt} />
              </a>
            ))}
          </div>
        ))}
        
        <div className="sidebar-footer">
          <a href="#top" className="back-to-top">Back to Top</a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 