import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import './alert.css';

const alertsData = [
  { id: 1, message: 'Alert 1: Something happened!', type: 'info' },
  { id: 2, message: 'Alert 2: Another event occurred.', type: 'info' },
  { id: 3, message: 'Alert 3: Another event occurred.', type: 'info' },
  { id: 4, message: 'Alert 4: Another event occurred.', type: 'info' },
  { id: 5, message: 'Alert 5: Another event occurred.', type: 'warning' },
  { id: 6, message: 'Alert 6: Another event occurred.', type: 'warning' },
  { id: 7, message: 'Alert 7: Another event occurred.', type: 'warning' },
  { id: 8, message: 'Alert 8: Another event occurred.', type: 'error' },
  { id: 9, message: 'Alert 9: Another event occurred.', type: 'error' },
  { id: 10, message: 'Alert 10: Another event occurred.', type: 'error' },
];

const alertTypeIcons = {
    info: 'fa-solid:info-circle',
    warning: 'fa-solid:exclamation-triangle',
    error: 'fa-solid:times-circle',
};

const Alert = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };
    
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

  return (
    <div className={`alert-container ${isOpen ? 'open' : ''}`}>
        <div className='controller' onClick={toggleOpen}>
            <Icon icon={`${isOpen ? 'iconamoon:arrow-left-2-bold' : 'iconamoon:arrow-right-2-bold'}`} />
        </div>
        <div className={`alert-panel ${expanded ? 'expanded' : ''}`}>
            <div className="alert-list">
            {expanded ? (
                <div className="alert-scrollable">
                {alertsData.map(alert => (
                    <div key={alert.id} className="alert-item">
                        <div className="alert-icon">
                            <Icon icon={alertTypeIcons[alert.type]} />
                        </div>
                        <div className="alert-content">{alert.message}</div>
                    </div>
                ))}
                </div>
            ) : (
                <div className="latest-alert">
                {alertsData.length > 0 && (
                    <div className="alert-item">
                        No Alerts...
                        {/* <div className="alert-icon">
                            <Icon icon={alertTypeIcons[alertsData[0].type]} />
                        </div>
                        <div className="alert-content">{alertsData[0].message}</div> */}
                    </div>
                )}
                </div>
            )}
            </div>
            <div className='alert-controls' onClick={toggleExpand}>
                    {expanded ? 'Collapse' : 'See All'}
            </div>
        </div>
    </div>
  );
};

export default Alert;
