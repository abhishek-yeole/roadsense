import React from 'react';
import logo from '../../../Assets/Road_Sense-removebg-preview.png'
import './layout.css';
import { Icon } from '@iconify/react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import config from '../../../config';
import Account from '../../LandingPage/Account';

const Header = () => {
  const toggleChange = () => {
    window.location.href = './user';
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async() => {
    const response = await fetch( config.apiUrlLogout, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'email': JSON.parse(localStorage.getItem('email')).email }),
    });
    if (response.ok) {
      const responseData = await response.json();
      if (responseData.logout) {
        localStorage.removeItem('email');
        window.location.href = '/login';
      }
    } else {
    console.error('Can not Logout:', response.status);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <header className='admin-header'>
          <div className='nav-bar' >
            <Button variant="contained" startIcon={<Icon icon="codicon:account" />} size='small' onClick={toggleChange}>User</Button>
            <div className='center' >
              <div className='logo'>
                <img className='img1' src={ logo } alt='Logo' />
              </div>
            </div>
            <Button aria-describedby={id} variant="contained" onClick={handleClick}>
              <Icon icon="uis:apps" />
            </Button>
            <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} >
              <Typography sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'flex-start', alignItems: 'flex-start' }}>
                  <Account />
                  <Button variant="text" startIcon={<Icon className='account-icon' icon="material-symbols:logout-rounded" />} onClick={handleLogout}>Logout</Button>
              </Typography>
            </Popover>
          </div>
      </header>
    </div>
  )
}

export default Header