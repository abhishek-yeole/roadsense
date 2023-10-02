import React, {useState, useEffect} from 'react'
import config from '../../../config';
import { Icon } from '@iconify/react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Feedback = () => {
    const [feedbackData, setFeedbackData] = useState([]);
    
    useEffect(() => {
        const fetchFeedbackData = async () => {
            try {
                const response = await fetch(config.apiUrlFeedback, {
                method: 'GET',
                });
                
                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        setFeedbackData(data.data);
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
        fetchFeedbackData();
    }, []);

    const [mobile, setMobile] = useState(null);

    useEffect(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            setMobile(true);
        } else {
            setMobile(false);
        }
    }, []);

    const [sent, setSent] = useState({});

    const handleSend = async (user) => {
        try {
        const response = await fetch(config.apiUrlOperate, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'sendMail',
                id: user.id,
                email: user.email,
                feedback: user.feedback,
                reply: user.reply
            }),
        });

        if (response.ok) {
            setSent((prevState) => ({ ...prevState, [user.id]: true }));
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
                id: user.id,
                email: user.email,
            }),
        });

        if (response.ok) {
            setDeleted((prevState) => ({ ...prevState, [user.id]: true }));
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
                {feedbackData.map((user) => (
                    <li key={user.id}>
                        <div className='rep-container'>
                            <div className='rep-details'>
                                <p>Email: {user.email}</p>
                            </div>
                            {mobile ? (
                                <hr style={{width: '90%', margin: 'auto'}}/>
                            ) : (
                                <div class="vl-space"></div>
                            )}
                            <div className='rep-image'>
                                <p>Feedback: {user.feedback}</p>
                            </div>
                            {mobile ? (
                                <hr style={{width: '90%', margin: 'auto'}}/>
                            ) : (
                                <div class="vl-space"></div>
                            )}
                            <div className='rep-map'>
                                <TextField id="outlined-multiline-static" label="Reply" disabled={user.reply === 1 || sent[user.id]} multiline rows={mobile ? (4) : (6)} required defaultValue={user.comment} fullWidth onChange={(e) => user.reply=e.target.value}/>
                            </div>
                            {mobile ? (
                                <hr style={{width: '90%', margin: 'auto'}}/>
                            ) : (
                                <div class="vl-space"></div>
                            )}
                            <div className='rep-actions'>
                                {user.reply === 1 || sent[user.id] ? (
                                    <Button variant="outlined" disabled endIcon={<Icon icon="ic:round-mail" />}>SENT</Button>
                                ) : (
                                    <Button variant="outlined" onClick={() => handleSend(user)} endIcon={<Icon icon="ic:round-mail" />}>SEND</Button>
                                )}
                                {deleted[user.id] ? (
                                    <Button variant="outlined" disabled endIcon={<Icon icon="mdi:trash" color="red" />}>DELETE</Button>
                                ) : (
                                    <Button variant="outlined" onClick={() => handleDelete(user)} endIcon={<Icon icon="mdi:trash" color="red" />}>DELETE</Button>
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

export default Feedback