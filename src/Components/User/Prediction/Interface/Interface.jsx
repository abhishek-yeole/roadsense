import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { GeolocateControl } from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Icon } from '@iconify/react';
import { FormControl } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import background1 from '../../../../Assets/back1.svg';
import background2 from '../../../../Assets/back2.svg';
import config from '../../../../config';
import './interface.css';

const Interface = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const weatherConditions = ['Sunny/Clear', 'Rainy', 'Hail/Sleet', 'Foggy/Misty', 'Others'];
  const impactTypes = ['Pedestrian', 'Bicycles', 'Two Wheelers', 'Auto Rickshaws', 'Cars, Taxis, Vans & LMV', 'Trucks, Lorries', 'Buses', 'Non-motorized Vehicles', 'Others'];
  const trafficViolationTypes = ['Speeding', 'Jumping Red Light', 'Distracted Driving', 'Drunk Driving', 'Other'];
  const roadFeatures = ['Straight Road', 'Curved Road', 'Bridge', 'Culvert', 'Pot Holes', 'Steep Grade', 'Ongoing Road Works/Under Construction', 'Others'];
  const roadJunctionTypes = ['T-Junction', 'Y-Junction', 'Four arm Junction', 'Staggered Junction', 'Round about Junction', 'Others'];
  const trafficControls = ['Traffic Light Signal', 'Police Controlled', 'Stop Sign', 'Flashing Signal/Blinker', 'Uncontrolled', 'Others'];
  const timeOfDayRanges = ['morning', 'afternoon', 'evening', 'night'];
  const injuryTypes = ['Killed', 'Grievously Injured', 'Minor Injury'];
  const ageRanges = ['13-17', '18-25', '26-40', '41-60', '60-80', '80 above'];
  const safetyFeatures = ['Yes', 'No'];
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [prediction, setPrediction] = useState(false);

  const [formData, setFormData] = useState({
    Latitude: 0.0,
    Longitude: 0.0,
    personCount: 0,
    selectedWeatherCondition: '',
    selectedImpactType: '',
    selectedTrafficViolationType: '',
    selectedRoadFeaturesType: '',
    selectedRoadJunctionType: '',
    selectedTrafficControl: '',
    selectedTimeOfDay: '',
    selectedInjuryType: '',
    selectedAge: '',
    selectedSafetyFeature: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
	console.log('Form Data:', formData);
	
	if (!loading) {
		setSuccess(false);
		setLoading(true);
		try {
			const form = new FormData();
			form.append('formdata', formData);

			const response = await fetch( config.apiUrlPrediction, {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			// Handle the response as needed
			if (response.ok) {
				const responseData = await response.json();
				console.log('Prediction Data submitted:', responseData);
				timer.current = window.setTimeout(() => {
					setSuccess(true);
					setLoading(false);
					setDisplaySuccess(true);
					setPrediction(responseData.prediction);
				}, 2000);
			} else {
			console.error('Failed to submit accident report:', response.status);
			}
		} catch (error) {
			console.error('Error submitting accident report:', error);
		}
	}
	};

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoibmFtaWNvIiwiYSI6ImNsa3R6Y2s1MTBlcngzcm15N2N6ZTR6emkifQ.fI4xpZC-8EXh0GcX-ouPCw';
    
        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          types: 'country,region,place,postcode,locality,neighborhood',
        });
    
        geocoder.addTo('.geocoder');
    
        const results = document.getElementById('result');
    
        geocoder.on('result', (e) => {
          const resultCoordinates = e.result.geometry.coordinates;
          setLatitude(resultCoordinates[0]);
		  console.log(latitude);
          handleInputChange({
            target: {
              name: 'Latitude',
              value: resultCoordinates[0],
            },
          });
          setLongitude(resultCoordinates[1]);
          handleInputChange({
            target: {
              name: 'Longitude',
              value: resultCoordinates[1],
            },
          });
        });
    
        geocoder.on('clear', () => {
          results.innerText = '';
        });

        const elements = document.getElementsByClassName('mapboxgl-ctrl-geocoder');
        if (elements.length >= 2) {
            elements[0].parentNode.removeChild(elements[0]);
        }

        const geolocateControl = new GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        });
    
        geolocateControl.on('geolocate', (e) => {
          const { coords } = e;
          setLatitude(coords.latitude);
          handleInputChange({
            target: {
              name: 'Latitude',
              value: coords.latitude,
            },
          });
          setLongitude(coords.longitude);
          handleInputChange({
            target: {
              name: 'Longitude',
              value: coords.longitude,
            },
          });
        });
    });

	const getDirection = () => {
		if (window.innerWidth <= 768) {
			return 'column';
		} else {
			return 'row';
		}
	};

	const [loading, setLoading] = React.useState(false);
	const [success, setSuccess] = React.useState(false);
	const timer = React.useRef();
  
	const buttonSx = {
	  ...(success && {
		bgcolor: green[500],
		'&:hover': {
		  bgcolor: green[700],
		},
	  }),
	};
  
	React.useEffect(() => {
	  return () => {
		clearTimeout(timer.current);
	  };
	}, []);

	const [bgImage, setBgImage] = useState(false);

    useEffect(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            setBgImage(true);
        } else {
            setBgImage(false);
        }
    }, []);
  
	// const handleButtonClick = () => {
	//   if (!loading) {
	// 	setSuccess(false);
	// 	setLoading(true);
	// 	timer.current = window.setTimeout(() => {
	// 	  setSuccess(true);
	// 	  setLoading(false);
	// 	}, 2000);
	//   }
	// };

	return (
		<div><br /><br /><br /><br />
		<div className='interface-container'>
			<h2>Accident Prediction</h2>
			<Box>
				<Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: getDirection(), alignItems: 'center' }}>
					<Box sx={{ '& > :not(style)': { m: 0 }, display: 'flex', alignItems: 'center' }}>
						<Icon icon="fa-solid:search-location" style={{fontSize: '28px'}}/>
						<div className='geocoder' />	
					</Box>
					<Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', flexDirection: getDirection(), alignItems: 'center' }}>
						<Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
							<Icon icon="tabler:world-latitude" style={{fontSize: '32px'}}/>
							<TextField id="filled-basic" label="Latitude" variant="filled" name='Latitude' type='number' value={latitude} onChange={ handleInputChange } placeholder='Coordinates' required />
						</Box>
						<Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
							<Icon icon="tabler:world-longitude" style={{fontSize: '32px'}}/>
							<TextField id="filled-basic" label="Longitude" variant="filled" name='Longitude' type='number' value={longitude} onChange={ handleInputChange } placeholder='Coordinates' required />
						</Box>
					</Box>
					<Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', flexDirection: getDirection(), alignItems: 'center' }}>
						<Button variant="contained" type="button" size='small' onClick={() => {
							navigator.geolocation.getCurrentPosition((position) => {
								setLatitude(position.coords.latitude);
								handleInputChange({
									target: {
										name: 'Latitude',
										value: position.coords.latitude,
									},
								});
								setLongitude(position.coords.longitude);
								handleInputChange({
									target: {
										name: 'Longitude',
										value: position.coords.longitude,
									},
								});
							});
						}}>Use Current Location</Button>
					</Box>
				</Box>

				<Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: getDirection(), alignItems: 'center' }}>
					<Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center', width: '100%' }}>
						<Icon icon="pepicons-print:persons" style={{fontSize: '32px'}}/>
						<FormControl fullWidth>
							<InputLabel id="age-input-label" required>Person Count</InputLabel>
							<Select labelId="age-input-label" label="Person Count" name="personCount" onChange={handleInputChange} required fullWidth >
								<MenuItem value={1}>1</MenuItem>
								<MenuItem value={2}>2</MenuItem>
								<MenuItem value={3}>3</MenuItem>
								<MenuItem value={4}>4</MenuItem>
								<MenuItem value={0}>Above 4</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center', width: '100%' }}>
						<Icon icon="carbon:road-weather" style={{fontSize: '32px'}}/>
						<FormControl fullWidth>
							<InputLabel id="weather-input-label" required>Weather Conditions</InputLabel>
							<Select labelId="weather-input-label" label="Weather Conditions" name="selectedWeatherCondition" onChange={handleInputChange} required >
								{weatherConditions.map((condition) => (
									<MenuItem key={condition} value={condition}>
									{condition}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
				</Box>

				<Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: getDirection(), alignItems: 'center' }}>
					<Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center', width: '100%' }}>
						<Icon icon="grommet-icons:impact" style={{fontSize: '32px'}}/>
						<FormControl fullWidth>
							<InputLabel id="impact-input-label" required>Impact Type</InputLabel>
							<Select labelId="impact-input-label" label="Imapct Type" name="selectedImpactType" onChange={handleInputChange} required >
								{impactTypes.map((condition) => (
									<MenuItem key={condition} value={condition}>
									{condition}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
					<Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center', width: '100%' }}>
						<Icon icon="tabler:traffic-lights-off" style={{fontSize: '32px'}}/>
						<FormControl fullWidth>
							<InputLabel id="traffic-violation-input-label" required>Traffic Violation Type</InputLabel>
							<Select labelId="traffic-violation-input-label" label="Traffic Violation Type" name="selectedImpactType" onChange={handleInputChange} required >
								{trafficViolationTypes.map((violation) => (
									<MenuItem key={violation} value={violation}>
									{violation}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
				</Box>

				<Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: getDirection(), alignItems: 'center' }}>
					<Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center', width: '100%' }}>
						<Icon icon="fa-solid:road" style={{fontSize: '32px'}}/>
						<FormControl fullWidth>
							<InputLabel id="road-features-input-label" required>Road Features</InputLabel>
							<Select labelId="road-features-input-label" label="Road Features" name="selectedRoadFeaturesType" onChange={handleInputChange} required >
								{roadFeatures.map((feature) => (
									<MenuItem key={feature} value={feature}>
									{feature}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
					<Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center', width: '100%' }}>
						<Icon icon="gis:road-map" style={{fontSize: '32px'}}/>
						<FormControl fullWidth>
							<InputLabel id="road-junctions-input-label" required>Road Junction Type</InputLabel>
							<Select labelId="road-junctions-input-label" label="Road Junction Type" name="selectedRoadJunctionType" onChange={handleInputChange} required >
								{roadJunctionTypes.map((feature) => (
									<MenuItem key={feature} value={feature}>
									{feature}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
				</Box>

				<Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: getDirection(), alignItems: 'center' }}>
					<Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center', width: '100%' }}>
						<Icon icon="game-icons:traffic-lights-orange" style={{fontSize: '32px'}}/>
						<FormControl fullWidth>
							<InputLabel id="traffic-controls-input-label" required>Traffic Controls</InputLabel>
							<Select labelId="traffic-controls-input-label" label="Traffic Controls" name="selectedTrafficControl" onChange={handleInputChange} required >
								{trafficControls.map((controls) => (
									<MenuItem key={controls} value={controls}>
									{controls}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
					<Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center', width: '100%' }}>
						<Icon icon="mdi:time-of-day" style={{fontSize: '32px'}}/>
						<FormControl fullWidth>
							<InputLabel id="time-of-day-input-label" required>Time of Day</InputLabel>
							<Select labelId="time-of-day-input-label" label="Time of Day" name="selectedTimeOfDay" onChange={handleInputChange} required >
								{timeOfDayRanges.map((controls) => (
									<MenuItem key={controls} value={controls}>
									{controls}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
				</Box>

				<Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: getDirection(), alignItems: 'center' }}>
					<Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center', width: '100%' }}>
						<Icon icon="mdi:account-injury" style={{fontSize: '32px'}}/>
						<FormControl fullWidth>
							<InputLabel id="injury-input-label" required>Injury Type</InputLabel>
							<Select labelId="injury-input-label" label="Injury Type" name="selectedInjuryType" onChange={handleInputChange} required >
								{injuryTypes.map((injury) => (
									<MenuItem key={injury} value={injury}>
									{injury}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
					<Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center', width: '100%' }}>
						<Icon icon="game-icons:ages" style={{fontSize: '32px'}}/>
						<FormControl fullWidth>
							<InputLabel id="age-input-label" required>Age</InputLabel>
							<Select labelId="age-input-label" label="Age" name="selectedAge" onChange={handleInputChange} required >
								{ageRanges.map((age) => (
									<MenuItem key={age} value={age}>
									{age}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
				</Box>

				<Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center', width: '100%' }}>
					<Icon icon="tdesign:map-safety" style={{fontSize: '32px'}}/>
					<FormControl fullWidth>
						<InputLabel id="safety-input-label" required>Equipped with Safety Features</InputLabel>
						<Select labelId="safety-input-label" label="Equipped with Safety Features" name="selectedSafetyFeature" onChange={handleInputChange} required >
							{safetyFeatures.map((feature) => (
								<MenuItem key={feature} value={feature}>
								{feature}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box><br />
				{/* <Button variant="contained" type="button" onClick={handleSubmit}>Predict</Button> */}
				<Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
					<Box sx={{ m: 1, position: 'relative' }}>
						<Fab aria-label="save" color="secondary" sx={buttonSx} onClick={handleSubmit} size='small' >
							{success ? <Icon icon="gg:check-o" style={{fontSize: '20px'}}/> : <Icon icon="vscode-icons:folder-type-model-opened" style={{fontSize: '20px'}} />}
						</Fab>
						{loading && (
							<CircularProgress size={50} sx={{ color: green[500], position: 'absolute', top: -5, left: -5, zIndex: 1 }} />
						)}
					</Box>
					<Box sx={{ m: 1, position: 'relative' }}>
						<Button variant="contained" sx={buttonSx} disabled={loading} onClick={handleSubmit} > Predict </Button>
						{loading && (
							<CircularProgress size={24} sx={{ color: green[500], position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />
						)}
					</Box>
				</Box>
				{displaySuccess && (
					<div>
						<Box sx={{ m: 1, position: 'relative' }}>
							{prediction ? (
								<div className='predictions-true' style={{color: 'red'}}>Accident Prediction : True. Accident might happen.</div>
							) : (
								<div className='predictions-false' style={{color: 'green'}}>Accident Prediction : False. Accident may not happen.</div>
							)}
						</Box>
					</div>
				)}
			</Box>
		</div>
		<br /><br /><br />
		{bgImage ? (
			<div className='background' style={{backgroundImage: `url(${ background2 })`}}></div>
		) : (
			<div className='background' style={{backgroundImage: `url(${ background1 })`}}></div>
		)}
		</div>
	);
};

export default Interface;
