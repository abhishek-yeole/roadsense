import React, { useState, useEffect } from 'react'
import Header from './Layout/Header'
import Footer from './Layout/Footer'
import Report from './Report/Report'
import Feedback from './Feedback/Feedback'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Icon } from '@iconify/react';
import './admin.css'
import { Button } from '@mui/material'
import CheckLogin from '../Auth/CheckLogin'

const Admin = () => {
    const [displayReports, setDisplayReports] = useState(true);
    const [displayFeedbacks, setDisplayFeedbacks] = useState(false);
    const [bgColorReports, setBgColorReports] = useState('rgba(255, 79, 226, 1)');
    const [bgColorFeedBack, setBgColorFeedBack] = useState('rgba(255, 255, 255, 0)');

    const toogleReport = () => {
        setBgColorReports('rgba(255, 79, 226, 1)');
        setBgColorFeedBack('rgba(255, 255, 255, 0)');
        setDisplayFeedbacks(false);
        setDisplayReports(true);
    }

    const toogleFeedback = () => {
        setBgColorReports('rgba(255, 255, 255, 0)');
        setBgColorFeedBack('rgba(255, 79, 226, 1)');
        setDisplayReports(false);
        setDisplayFeedbacks(true);
    }

    const [mobileView, setMobileView] = useState(null);

    useEffect(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            setMobileView(true);
        } else {
            setMobileView(false);
        }
    }, []);

    const receiveDataFromChild = (data) => {
        console.log(data);
    };

  return (
    <div>
        <CheckLogin redirect={'/login'} trueRedirect={'/null'} sendDataToParent={receiveDataFromChild} loads={true} />
        <Header /><br /><br /><br />
            <div className='admin-control-feed'>
                {mobileView ? (
                    <div className='admin-pannel'>
                        <Button startIcon={<Icon icon="material-symbols:partner-reports-rounded" color="red"/>} onClick={toogleReport} style={{backgroundColor: bgColorReports, borderRadius: '4px', width: '35vw'}}>Reports</Button>
                        <Button startIcon={<Icon icon="mdi:feedback" color="green"/>} onClick={toogleFeedback} style={{backgroundColor: bgColorFeedBack, borderRadius: '4px', width: '35vw'}}>Feedbacks</Button>
                    </div>
                ) : (
                    <div className='admin-club'>
                        <div className='admin-pannel'>
                            <nav aria-label="main mailbox folders">
                                <List>
                                <ListItem disablePadding onClick={toogleReport} style={{backgroundColor: bgColorReports, borderRadius: '6px', marginBottom: '15px'}}>
                                    <ListItemButton>
                                    <ListItemIcon>
                                        <Icon icon="material-symbols:partner-reports-rounded" color="red" />
                                    </ListItemIcon>
                                    <ListItemText primary="Reports" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding onClick={toogleFeedback} style={{backgroundColor: bgColorFeedBack, borderRadius: '6px', marginBottom: '15px'}}>
                                    <ListItemButton>
                                    <ListItemIcon>
                                        <Icon icon="mdi:feedback" color="green" />
                                    </ListItemIcon>
                                    <ListItemText primary="Feedback" />
                                    </ListItemButton>
                                </ListItem>
                                </List>
                            </nav>
                        </div>
                        <div className='vertical-line'></div>
                    </div>
                )}
                <div className='admin-view'>
                    {displayReports && (<Report /> )}
                    {displayFeedbacks && (<Feedback /> )}
                </div>
            </div>
        <Footer />
    </div>
  )
}

export default Admin