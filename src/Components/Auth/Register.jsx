import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { Icon } from '@iconify/react';
import background1 from '../../Assets/back1.svg';
import background2 from '../../Assets/back2.png';
import config from '../../config';
import './Auth.css';
import Header from '../LandingPage/Header';
import Footer from '../LandingPage/Footer';
import { InputLabel } from '@mui/material';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [shareData, setShareData] = useState(false);
    const [otp, setOtp] = useState('');
    const [showOTP, setshowOTP] = useState(false);
    const [displayLoader, setDisplayLoader] = useState(false);
    const [displayError, setDisplayError] = useState(false);
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        const checkLogin = async () => {
          try {
              const response = await fetch(config.apiUrlLogin, {
                  method: 'GET',
              });
          
              if (response.ok) {
                  const data = await response.json();
                  console.log(data);
                  if (data.login) {
                        window.location.href = '/user';
                  } else {
                    console.error('Login success:', data.message);
                  }
              } else {
                  console.error('HTTP error:', response.status);
              }
          } catch (error) {
              console.error('An error occurred:', error);
          }
        };
      checkLogin();
    }, []);

    const handleRegister = async (event) => {
        event.preventDefault();
        if (name && email && age && address && vehicleType && password && repeatPassword && agreeTerms) {
            if (password !== repeatPassword) {
                setDisplayLoader(false);
                setDisplayError(true);
                setErrorText('Passwords do not match.');
                return;
            }
            
			setDisplayLoader(true);
            try {
                const response = await fetch(config.apiUrlRegister, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        formName: 'verification',
                        name,
                        email,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        setshowOTP(true);
                        setDisplayLoader(false);
                        setDisplayError(false);
                    } else {
                        setDisplayLoader(false);
                        setDisplayError(true);
                        setErrorText('Invalid Credentials. Please check !!');
                    }
                } else {
                    setDisplayError(true);
                    setDisplayLoader(false);
                    setErrorText('Cannot connect to server right now !!');
                }
            } catch (error) {
                setDisplayLoader(false);
                setDisplayError(true);
                setErrorText('We are experiencing heavy traffic !!');
            }
        } else {
            setDisplayLoader(false);
            setDisplayError(true);
            setErrorText('Please fill in all required fields.');
        }
    };
    
    const handleOtpSubmit = async (event) => {
        event.preventDefault();
        if (otp && name && email && age && address && vehicleType && password && repeatPassword && agreeTerms) {
            if (password !== repeatPassword) {
                setDisplayLoader(false);
                setDisplayError(true);
                setErrorText('Passwords do not match.');
                return;
            }
            
			setDisplayLoader(true);
            try {
                const response = await fetch(config.apiUrlVerify, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        formName: 'registration',
                        otp,
                        name,
                        email,
                        age,
                        address,
                        vehicleType,
                        password,
                        shareData,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        window.location.href = '/login';
                    } else {
                        setDisplayLoader(false);
                        setDisplayError(true);
                        setErrorText('Invalid Credentials. Please check !!');
                    }
                } else {
                    setDisplayError(true);
                    setDisplayLoader(false);
                    setErrorText('Cannot connect to server right now !!');
                }
            } catch (error) {
                setDisplayLoader(false);
                setDisplayError(true);
                setErrorText('We are experiencing heavy traffic !!');
            }
        } else {
            setDisplayLoader(false);
            setDisplayError(true);
            setErrorText('Please fill in all required fields.');
        }
    };

    const handleAlready = () => {
        window.location.href = '/login';
    };

    const [bgImage, setBgImage] = useState(false);

    useEffect(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            setBgImage(true);
        } else {
            setBgImage(false);
        }
    }, []);

    const getDirection = () => {
		if (window.innerWidth <= 768) {
			return 'column';
		} else {
			return 'row';
		}
	};

    return (
        <div>
            <Header />
            <br /><br /><br /><br />
            {bgImage ? (
            <div className='background' style={{backgroundImage: `url(${ background2 })`}}></div>
            ) : (
                <div className='background' style={{backgroundImage: `url(${ background1 })`}}></div>
            )}
            <div className='register-container'>
                <h2>Register</h2>
                <Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: getDirection(), alignItems: 'center' }}>
                    <Box component="form" sx={{'& > :not(style)': { m: 1 }, display: 'flex', alignItems: 'center', flexDirection: 'column',}} autoComplete="off">
                        <Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: getDirection(), alignItems: 'center' }}>
                            <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
                                <Icon icon="wpf:name" style={{fontSize: '32px'}}/>
                                <TextField id="outlined-basic" label="Name" variant="outlined" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                            </Box>
                            <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
                                <Icon icon="line-md:email" style={{fontSize: '32px'}}/>
                                <TextField id="outlined-basic" label="Email" variant="outlined" type='text' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            </Box>
                        </Box>
                        <Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: getDirection(), alignItems: 'center' }}>
                            <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
                                <Icon icon="game-icons:ages" style={{fontSize: '32px'}}/>
                                <TextField id="outlined-basic" label="Age" variant="outlined" type='number' value={age} onChange={(e) => setAge(e.target.value)} required />
                            </Box>
                            <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
                                <Icon icon="ph:address-book-fill" style={{fontSize: '32px'}}/>
                                <TextField id="outlined-basic" label="Address" variant="outlined" type='text' value={address} onChange={(e) => setAddress(e.target.value)} required/>
                            </Box>
                        </Box>
                        <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center', width: '94%' }}>
                            <Icon icon="tdesign:vehicle" style={{fontSize: '32px'}}/>
                            <FormControl fullWidth>
                                <InputLabel id="vehicle-type-select-label" required>Vehicle Type</InputLabel>
                                <Select labelId='vehicle-type-select-label' value= {vehicleType} onChange={(e) => setVehicleType(e.target.value)} fullWidth label="Vehicle Type">
                                    <MenuItem value="car">Car</MenuItem>
                                    <MenuItem value="bike">Bike</MenuItem>
                                    <MenuItem value="truck">Truck</MenuItem>
                                    <MenuItem value="auto">Auto / Rickshaws</MenuItem>
                                </Select> 
                            </FormControl>
                        </Box>
                        <Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: getDirection(), alignItems: 'center' }}>
                            <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
                                <Icon icon="ic:baseline-password" style={{fontSize: '32px'}}/>
                                <TextField id="outlined-basic" label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </Box>
                            <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
                                <Icon icon="ic:baseline-password" style={{fontSize: '32px'}}/>
                                <TextField id="outlined-basic" label="Repeat Password" variant="outlined" type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required />
                            </Box>
                        </Box>
                        {displayError && (
                            <div style={{textAlign: 'center', color: 'red', fontWeight: '500'}}><p>{errorText}</p></div>
                        )}
                        <Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: getDirection(), alignItems: 'flex-start' }}>
                            <p style={{fontSize: 'small', fontWeight: '500'}}><Checkbox type="checkbox" checked={agreeTerms} onChange={() => setAgreeTerms(!agreeTerms)} required color="success" />I Agree to Terms & Conditions.</p>
                            <p style={{fontSize: 'small', fontWeight: '500'}}><Checkbox type="checkbox" checked={shareData} onChange={() => setShareData(!shareData)} required color="success" />I Agree to share my data.</p>
                        </Box>
                    <Button variant="contained" type="button" onClick={handleRegister}>Register</Button>
                    <Button onClick={handleAlready} style={{ cursor: 'pointer' }}>Already have an Account? Login in.</Button>
                </Box>
                </Box>
            </div>
            {showOTP && (
                <div className="fullscreen-overlay">
                    <div className="otp-container">
                        <div className='otp-control'><h2>Enter OTP</h2><div className='icon' onClick={() => {setshowOTP(false);}}><Icon icon="maki:cross" /></div></div>
                        <Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', alignItems: 'center' }}>
                            <Icon icon="teenyicons:otp-outline" style={{fontSize: '32px'}}/>
                            <TextField id="outlined-basic" label="OTP" variant="outlined" type='number' value={otp} onChange={(e) => setOtp(e.target.value)} required/>
                        </Box>
                        <Button variant="contained" type="button" onClick={handleOtpSubmit}>Submit OTP</Button>
                        <Button onClick={handleRegister} style={{ cursor: 'pointer' }}>Resend OTP?</Button>
                    </div>
                </div>
            )}

            {displayLoader && (
                <div className='check-login'>
                    <div className='checker'>
                        <svg className="car" width="102" height="40" xmlns="http://www.w3.org/2000/svg">
                            <g transform="translate(2 1)" stroke="#002742" fill="none" fillRule='evenodd' strokeLinecap='round' strokeLinejoin='round'>
                                <path className="car__body" d="M47.293 2.375C52.927.792 54.017.805 54.017.805c2.613-.445 6.838-.337 9.42.237l8.381 1.863c2.59.576 6.164 2.606 7.98 4.531l6.348 6.732 6.245 1.877c3.098.508 5.609 3.431 5.609 6.507v4.206c0 .29-2.536 4.189-5.687 4.189H36.808c-2.655 0-4.34-2.1-3.688-4.67 0 0 3.71-19.944 14.173-23.902zM36.5 15.5h54.01" strokeWidth="3"/>
                                <ellipse className="car__wheel--left" strokeWidth="3.2" fill="#FFF" cx="83.493" cy="30.25" rx="6.922" ry="6.808"/>
                                <ellipse className="car__wheel--right" strokeWidth="3.2" fill="#FFF" cx="46.511" cy="30.25" rx="6.922" ry="6.808"/>
                                <path className="car__line car__line--top" d="M22.5 16.5H2.475" strokeWidth="3"/>
                                <path className="car__line car__line--middle" d="M20.5 23.5H.4755" strokeWidth="3"/>
                                <path className="car__line car__line--bottom" d="M25.5 9.5h-19" strokeWidth="3"/>
                            </g>
                        </svg><br />
                        <div className='check-text'>Authenticating</div>
                    </div>
                </div>
            )}
            <br /><br />
            <Footer />
        </div>
    );
};

export default Register;
