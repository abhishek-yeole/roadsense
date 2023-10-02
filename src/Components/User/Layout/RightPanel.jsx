import React, {useState} from 'react'
import './layout.css'
import { Icon } from '@iconify/react';

const LeftPanel = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
      setIsOpen((prevState) => !prevState);
    };

    return (
        <div className={`right-container ${isOpen ? '' : 'open'}`}>
            <div className={`right-open-close-bar open`} onClick={toggleSidebar}>
                <div className="right-bar">
                    <Icon icon={`${isOpen ? 'iconamoon:arrow-right-2-bold' : 'iconamoon:arrow-left-2-bold'}`} />
                </div>
            </div>
            <div className={`history ${isOpen ? 'open' : ''}`}>
                {/* Your sidebar content goes here */}
                <div className='permissions'>
                    Hii
                </div>
            </div>
      </div>
	);
};

export default LeftPanel