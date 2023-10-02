import React, {useEffect, useState} from 'react'
import Header from './Header';
import Footer from './Footer';
import Spline from '@splinetool/react-spline';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Icon } from '@iconify/react';
import './layout.css';
import mission from '../../Assets/land_mission.svg';
import MapboxMap from '../Admin/Report/MapboxMap';
import config from '../../config';
import Loader from './Loader';

const Landing = () => {
    const [bgImage, setBgImage] = useState(false);
    const [coordinates, setCoordinates] = useState('');
    const [displayMap, setDisplayMap] = useState(false);
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const [sumbittedFeed, setSumbittedFeed] = useState(false);

    useEffect(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            setBgImage(true);
        } else {
            setBgImage(false);
        }   
        navigator.geolocation.getCurrentPosition((position) => {
            const coord = `${position.coords.latitude}, ${position.coords.longitude}`;
            setCoordinates(coord);
            setDisplayMap(true);    
        });
    }, []);

    const handleStart = () => {
        window.location.href = './login';
    }

    const handleGit = () => {
        window.location.href = './login';
    }

    const handleSubmit = async() => {
        try {
            const response = await fetch( config.apiUrlFeedback, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, feedback }),
            });
        
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    console.log(data);
                    setSumbittedFeed(true);
                } else {
                    console.error('Login failed:', data.message);
                }
            } else {
                console.error('HTTP error:', response.status);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    return (
        <div className='Landing'>
            <Loader time='5000'/>
            <Header />
            {!bgImage ? (
                <div className='back-3d' id='about'>
                    <Spline scene="https://prod.spline.design/LqjNw7vOnglN3AmF/scene.splinecode" style={{width: '100%', height: '100%'}} />
                </div>
            ) : (
                <div>
                    <div className='background' id='about'>mobile</div>
                    <div className='spacer' id='mission'></div>
            <div className='spacer' id='mission'></div>
            <div className='spacer' id='mission'></div>
            <div className='spacer' id='mission'></div>
            <div className='spacer' id='mission'></div>
            <div className='spacer' id='mission'></div>
                </div>
            )}
            
            <div className='intro'>
                <div className='intro-mega1'>RoadSense</div>
                <div className='intro-mega2'>Navigating Safety, Predicting Accidents</div>
                <div className='intro-mini'>At RoadSense, we are revolutionizing road safety with cutting-edge technology and data-driven insights. Our real-time accident prediction system harnesses the power of machine learning and data analytics to keep you, your loved ones, and your community safe on the road.</div>
                <div className='intro-controls'><Button variant="contained" endIcon={<Icon icon="line-md:arrow-right" />} onClick={handleStart}><p style={{fontWeight: 'bolder'}}>Get Started</p></Button></div>
            </div>

            <div className='spacer' id='mission'></div>

            <div className='mission' >
                <img className='mission-image' src={mission} alt="Mission" />
                <div className='mission-content'>
                    <div className='mission-header'>Our Mission</div>
                    <div className='mission-text'>At RoadSense, our mission is simple yet crucial: to prevent accidents and save lives. We believe that with the right tools and information, accidents can be avoided, and roads can become safer for everyone. We're here to make that vision a reality.</div>
                </div>
            </div>

            <div className='spacer' id='working'></div>

            <div className='working'>
                <div className='working-content'>
                    <div className='working-header'>How does it Works?</div>
                    <div className='working-text'>Our advanced system constantly analyzes a wealth of data sources, including historical accident data, current weather conditions, live traffic updates, and road infrastructure details. By crunching this data in real-time, we identify accident-prone areas and provide you with instant alerts and route suggestions, ensuring that you stay out of harm's way.</div>
                </div>
                {displayMap && (
                    <div className='working-map'>
                        <div className='working-mapbox' id='working-mapbox'></div>
                        <MapboxMap location={coordinates} mapContainer='working-mapbox' mapStyle='mapbox://styles/mapbox/light-v11' zoom='1.2'/>
                    </div>
                )}
            </div>

            <div className='spacer' id='features'></div>

            <div className='features'>
                <h2>Features</h2><br />
                <div className="flex-container">
                    <div className="flex-item1">
                        <div className="marker">
                            <div className="ribbon">
                                <span>1</span>
                            </div>
                        </div>
                        <h2><b>Real-Time Alerts</b></h2><br />
                        <span>Our real-time alerts feature ensures your safety by delivering instant notifications about potential hazards, allowing you to make quick and informed decisions while driving. Stay one step ahead of accidents and road dangers.</span>
                    </div>
                    <div className="flex-item2"><div className="numbers"><h3>1</h3></div></div>
                </div>

                <div className="flex-container">
                    <div className="flex-item3"><div className="flex-item2"><div className="numbers"><h3>2</h3></div></div></div>
                    <div className="flex-item4">
                        <div className="marker">
                            <div className="ribbon">
                                <span>2</span>
                            </div>
                        </div>
                        <h2><b>Accident Predictions</b></h2><br />
                        <span>With our cutting-edge machine learning algorithms, we provide you with detailed accident predictions, empowering you to choose the safest routes for your journeys. Avoid high-risk areas and prioritize your safety on the road.</span>
                    </div>
                </div>

                <div className="flex-container">
                    <div className="flex-item5">
                        <div className="marker">
                            <div className="ribbon">
                                <span>3</span>
                            </div>
                        </div>
                        <h2><b>Weather Integration</b></h2><br />
                        <span>RoadSense integrates live weather data into your driving experience, keeping you informed about changing weather conditions that may affect road safety. Rain, snow, or sunshine, we've got you covered.</span>
                    </div>
                    <div className="flex-item6"><div className="flex-item2"><div className="numbers"><h3>3</h3></div></div></div>
                </div>

                <div className="flex-container">
                    <div className="flex-item7"><div className="flex-item2"><div className="numbers"><h3>4</h3></div></div></div>
                    <div className="flex-item8">
                        <div className="marker">
                            <div className="ribbon">
                                <span>4</span>
                            </div>
                        </div>
                        <h2><b>Infrastructure Analysis</b></h2><br />
                        <span>Stay in the know about road conditions, ongoing construction zones, and other vital infrastructure details. RoadSense ensures you are well-prepared for your journey, no matter the road ahead.</span>
                    </div>
                </div>
            </div>
            
            <div className='end-spacer' id='contact'></div>

            <div className='end-intro'>
                <div className='end-left'>
                    <div className='left-header'>Join the RoadSense Community</div>
                    <div className='left-content'>Become a part of the RoadSense community and contribute to safer roads for everyone. Together, we can make a difference and create a world where accidents are a thing of the past.</div>
                    <Button variant="contained" endIcon={<Icon icon="line-md:arrow-right" />} onClick={handleGit}><p style={{fontWeight: 'bolder'}}>Github </p></Button><br />
                    <div className='left-header'>Get Started Today</div>
                    <div className='left-content'>Don't wait for accidents to happen. Take control of your safety and join RoadSense today. Sign up now to experience the future of road safety.</div>
                    <Button variant="contained" endIcon={<Icon icon="line-md:arrow-right" />} onClick={handleStart}><p style={{fontWeight: 'bolder'}}>Sign Up Now !</p></Button>
                </div>
                <div className='end-right'>
                    <div className='right-header'>Contact Us</div>
                    <div className='right-content'>Have questions or need assistance? Our dedicated support team is here to help.</div>
                    <div className='contact-form'>
                        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, display: 'flex', flexDirection: 'row', width: '90%', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }, }} noValidate autoComplete="off">
                            <TextField id="filled-multiline-static" label="Email" fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} disabled={sumbittedFeed}/>
                            <TextField id="filled-multiline-static2" label="Message" multiline rows={4} fullWidth variant="filled" value={feedback} onChange={(e) => setFeedback(e.target.value)} disabled= {sumbittedFeed}/>
                        </Box>
                        {sumbittedFeed ? (
                            <div className='form-submit'><Button variant="contained" color='success' endIcon={<Icon icon="fluent:mail-checkmark-24-filled" />}><p style={{fontWeight: 'bolder'}} >SENT</p></Button><br />
                            <b><i>WE WILL REACH OUT TO YOU SOON!!!</i></b></div>
                        ) : (
                            <div className='form-submit'><Button variant="contained" endIcon={<Icon icon="ic:round-mail" />} onClick={handleSubmit}><p style={{fontWeight: 'bolder'}} >SEND</p></Button></div>
                        )}
                    </div>
                </div>
            </div>

            <div className='spacer' id='features'></div>
            
            <Footer />
        </div>
    )
}

export default Landing