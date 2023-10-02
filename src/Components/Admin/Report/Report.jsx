import React, {useState, useEffect} from 'react';
import '../Layout/layout.css';
import config from '../../../config';
import MapboxMap from './MapboxMap';
import { Icon } from '@iconify/react';
import Button from '@mui/material/Button';

const Report = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const response = await fetch(config.apiUrlGetImage, {
            method: 'GET',
            });
            
            if (response.ok) {
            const data = await response.json();
            if (data.success) {
                setUserData(data.data);
            } else {
                console.error(data.message);
            }
            } else {
            console.error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
        };

        fetchUserData();
    }, []);

    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [mobile, setMobile] = useState(null);

    useEffect(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            setWidth('100%');
            setHeight('25vh');
            setMobile(true);
        } else {
            setWidth('28vw');
            setHeight('28vh');
            setMobile(false);
        }
    }, []);

    const [accept, setAccept] = useState({});

    const handleAccept = async (user, type) => {
        try {
        const response = await fetch(config.apiUrlOperate, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: type,
                index: user.index,
                id: user.id,
            }),
        });

        if (response.ok) {
            setAccept((prevState) => ({ ...prevState, [user.index]: true }));
        } else {
            console.error('Failed to send Reply');
        }
        } catch (error) {
        console.error('Error sending Reply:', error);
        }
    };

    const [deleted, setDeleted] = useState({});

    const handleDelete = async (user) => {
        try {
        const response = await fetch(config.apiUrlOperate, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'deleteFeedback',
                index: user.index,
                id: user.id,
            }),
        });

        if (response.ok) {
            setDeleted((prevState) => ({ ...prevState, [user.index]: true }));
        } else {
            console.error('Failed to send Reply');
        }
        } catch (error) {
        console.error('Error sending Reply:', error);
        }
    };

    return (
        <div className='user-reports'>
            <ul className='no-bullets'>
                {userData.map((user) => (
                    <li key={user.index}>
                        <div className='rep-container'>
                            <div className='rep-details'>
                                <p>Accident between {user.collisionI} and {user.collisionII}</p>
                                <p>Severity: {user.severity}</p>
                                <p>Reported By -</p>
                                <p>Name: {user.name}</p>
                                <p>Email: {user.email}</p>
                            </div>
                            {mobile ? (
                                <hr style={{width: '90%', margin: 'auto'}}/>
                            ) : (
                                <div className="vl-space"></div>
                            )}
                            <div className='rep-image'>
                                <div className='accident-image'>
                                    <img src={`data:image/png;base64,${user.image}`} alt="Accident" style={{ objectFit: 'contain', width: width, height: height }} />	
                                </div>
                            </div>
                            {mobile ? (
                                <hr style={{width: '90%', margin: 'auto'}}/>
                            ) : (
                                <div className="vl-space"></div>
                            )}
                            <div className='rep-map'>
                                <div className='maps' id={`map-${user.index}`} style={{ width: width, height: height }}></div>
                                <MapboxMap location={user.location} mapContainer={`map-${user.index}`} mapStyle='mapbox://styles/mapbox/streets-v12' zoom='14'/>
                                <p>Location: {user.location}</p>
                            </div>
                            {mobile ? (
                                <hr style={{width: '90%', margin: 'auto'}}/>
                            ) : (
                                <div className="vl-space"></div>
                            )}
                            <div className='rep-actions'>
                                {user.accepted === 1 || accept[user.index] ? (
                                    <Button variant="outlined" disabled startIcon={<Icon icon="emojione-v1:left-check-mark" />}>Accepted</Button>
                                ) : (
                                    <Button variant="contained" onClick={() => handleAccept(user, 'accept')} startIcon={<Icon icon="emojione-v1:left-check-mark" />}>Accept</Button>
                                )}
                                {user.accepted === 0 || !accept[user.index] ? (
                                    <Button variant="outlined" disabled startIcon={<Icon icon="noto:cross-mark" />}>Rejected</Button>
                                ) : (
                                    <Button variant="contained"  onClick={() => handleAccept(user, 'reject')} startIcon={<Icon icon="noto:cross-mark" />}>Reject</Button>
                                )}
                                {deleted[user.id] ? (
                                    <Button variant="outlined" disabled startIcon={<Icon icon="mdi:trash" color='red' />}>Deleted</Button>
                                ) : (
                                    <Button variant="contained"  onClick={() => handleDelete(user)} startIcon={<Icon icon="mdi:trash" color='red' />}>Delete</Button>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <br />
        </div>
    )
}

export default Report