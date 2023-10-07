import React, {useState, useEffect} from 'react';
import { Icon } from '@iconify/react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Permissions = () => {
    const [location, setLocation] = useState(null);

    const requestLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          (error) => {
            console.error("Error getting location:", error.message);
            setLocation(null);
          }
        );
      } else {
        console.error("Geolocation is not available in this browser.");
        setLocation(null);
      }
    };

    useEffect(() => {
        requestLocation();
    }, [location]);

    const [gyroscopeData, setGyroscopeData] = useState(null);

    const requestGyroscope = () => {
      if ("DeviceMotionEvent" in window) {
        window.addEventListener('devicemotion', (event) => {
          const { accelerationIncludingGravity } = event;
          setGyroscopeData(accelerationIncludingGravity);
        });
      } else {
        console.error("Gyroscope is not available in this browser.");
        setGyroscopeData(null);
      }
    };
  
    useEffect(() => {
      requestGyroscope();
    }, []);

    const [accelerometerData, setAccelerometerData] = useState(null);

    const requestAccelerometer = () => {
      if ("DeviceMotionEvent" in window) {
        window.addEventListener('devicemotion', (event) => {
          const { acceleration } = event;
          setAccelerometerData(acceleration);
        });
      } else {
        console.error("Accelerometer is not available in this browser.");
        setAccelerometerData(null);
      }
    };
  
    useEffect(() => {
      requestAccelerometer();
    }, []);

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    const [speed, setSpeed] = useState(0);
    const [error, setError] = useState(null);
    const [alertText, setAlertText] = useState('');
  
    const showSpeed = (position) => {
      if (position.coords.speed !== null) {
        setSpeed(((position.coords.speed)*3.6).toFixed(2) + ' km/hr');
        if (((position.coords.speed)*3.6).toFixed(2) > 50) {
          setAlertText('True');
        }
        else {
          setAlertText('False');
        }
      } else {
        setSpeed('Speed information not available');
      }
    };
  
    const showError = (error) => {
      setError('Error occurred: ' + error.message);
    };
  
    useEffect(() => {
        if ('geolocation' in navigator) {
          const watchId = navigator.geolocation.watchPosition(showSpeed, showError, { enableHighAccuracy: true });

          return () => {
			navigator.geolocation.clearWatch(watchId);
          };
        } else {
          setError('Geolocation is not supported in this browser.');
        }
    }, []);

    const [alerts, setAlerts] = useState([]);
    const [count, setCount] = useState(1);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        if (speed > 50) {
          const newAlert = {
            predict: true,
            id: count,
            message: `Alert ${count}: Please Take caution.`,
            type: 'warning',
          };
  
          setAlerts(prevAlerts => [...prevAlerts, newAlert]);
  
          localStorage.setItem('Accident_prediction', JSON.stringify(alerts));
  
          setCount(prevCount => prevCount + 1);
        }
      }, 2000);
  
      return () => {
        clearInterval(intervalId);
      };
    }, [count, speed, alerts]);
  

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography fontSize={'14px'}><Icon icon="mdi:location" /> Location {location ? (<Icon icon="ep:circle-check-filled" color="green" />) : (<Icon icon="mdi:denied" color="red" />)}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography fontSize={'small'} textAlign={'justify'}>
                        {location ? (
                            <div>
                                <p>Latitude: {location.latitude}</p>
                                <p>Longitude: {location.longitude}</p>
                            </div>
                            ) : (
                                <div>Permission Denied <button onClick={requestLocation}>Request Location</button></div>
                        )}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header" >
                    <Typography fontSize={'14px'}><Icon icon="mdi:location" /> Gyrosensor {gyroscopeData ? (<Icon icon="ep:circle-check-filled" color="green" />) : (<Icon icon="mdi:denied" color="red" />)}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography fontSize={'small'} textAlign={'justify'}>
                        {gyroscopeData ? (
                            <div>
                                <p>Acceleration X: {gyroscopeData.x}</p>
                                <p>Acceleration Y: {gyroscopeData.y}</p>
                                <p>Acceleration Z: {gyroscopeData.z}</p>
                            </div>
                        ) : (
                            <p>Gyroscope data not available.</p>
                        )}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header" >
                    <Typography fontSize={'14px'}><Icon icon="mdi:location" /> Accelerometer {accelerometerData ? (<Icon icon="ep:circle-check-filled" color="green" />) : (<Icon icon="mdi:denied" color="red" />)}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography fontSize={'small'} textAlign={'justify'}>
                        {accelerometerData ? (
                            <div>
                                <p>Acceleration X: {accelerometerData.x}</p>
                                <p>Acceleration Y: {accelerometerData.y}</p>
                                <p>Acceleration Z: {accelerometerData.z}</p>
                            </div>
                        ) : (
                            <p>Accelerometer data not available.</p>
                        )}
                    </Typography>
                </AccordionDetails>
            </Accordion>

			<Accordion  expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4a-content" id="panel4a-header" >
                    <Typography fontSize={'14px'}><Icon icon="mdi:location" /> Speed {error === null ? (<Icon icon="ep:circle-check-filled" color="green" />) : (<Icon icon="mdi:denied" color="red" />)}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography fontSize={'small'} textAlign={'justify'}>
						<div>
							<p>Speed: <span id="speed">{speed}</span></p>
							{error && <p>{error}</p>}
                            {alertText}
						</div>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion  expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5a-content" id="panel5a-header" >
                    <Typography fontSize={'14px'}><Icon icon="mdi:location" /> Predictions  <Icon icon="ep:circle-check-filled" color="green" /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography fontSize={'small'} color={'green'} textAlign={'justify'}>
                        <Icon icon="fluent:live-24-filled" color="green" /> Accident Predictions system is Live.
                    </Typography>
                </AccordionDetails>
            </Accordion>
      </div>
    );
  }
      

export default Permissions