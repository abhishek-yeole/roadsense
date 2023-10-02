import React, { useState } from 'react';
import './layout.css';
import { Icon } from '@iconify/react';
import Permissions from './Permissions';

const LeftPanel = ({ toggleDisplay }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className={`sidebar-container ${isOpen ? '' : 'open'}`}>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Your sidebar content goes here */}
        <div className='permissions'>
          <Permissions />
        </div>
      </div>
      <div className={`open-close-bar open`}>
        <div className="bar" onClick={toggleSidebar}>
          <Icon icon={`${isOpen ? 'iconamoon:arrow-left-2-bold' : 'iconamoon:arrow-right-2-bold'}`} />
        </div>
        <div className="bar" onClick={toggleDisplay}> {/* This div toggles Map/Interface */}
          <Icon icon="tabler:switch-3" />
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
