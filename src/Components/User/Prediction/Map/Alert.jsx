import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import './alert.css';

const alertTypeIcons = {
    info: 'fa-solid:info-circle',
    warning: 'fa-solid:exclamation-triangle',
    error: 'fa-solid:times-circle',
};

const Alert = () => {
    const [alertsData, setAlertsData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };
    
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            const storedData = localStorage.getItem('Accident_prediction');
        
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                setAlertsData(parsedData);
            }
        }, 2000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

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
                        <div className="alert-icon">
                            <Icon icon={alertTypeIcons[alertsData[alertsData.length-1].type]} />
                        </div>
                        <div className="alert-content">{alertsData[alertsData.length-1].message}</div>
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
