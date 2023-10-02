import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Icon } from '@iconify/react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import config from '../../../config';
import './report.css'
import CheckLogin from '../../Auth/CheckLogin';

const Report = () => {
	const [location, setLocation] = useState('');
	const [image, setImage] = useState(null);
	const [acknowledged, setAcknowledged] = useState(false); 
	const [imageUrl, setImageUrl] = useState('');
	const [preview, setPreview] = useState(false);
	const [id, setId] = useState(0);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [collisionTypeI, setCollisionTypeI] = useState('');
	const [collisionTypeII, setCollisionTypeII] = useState('');
	const [severity, setSeverity] = useState('')

    const fetchImage = async () => {
      try {
        const response = await fetch(config.apiUrlGetImage, {
			method: 'POST',
			headers: {
              	'Content-Type': 'application/json',
            },
			body: JSON.stringify({id}),
		});

        if (response.ok) {
			const blob = await response.blob();
			const url = URL.createObjectURL(blob);
			setImageUrl(url);
			} else {
			console.error('Failed to fetch image:', response.status);
			}
		} catch (error) {
			console.error('Error fetching image:', error);
		}
    };

	const handleLocationChange = (event) => {
		setLocation(event.target.value);
	};

	const handleImageChange = (event) => {
		setImage(event.target.files[0]);
	};

	const handleAcknowledgementChange = () => {
		setAcknowledged(!acknowledged);
	};

	const getUserLocation = () => {
		if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
			const latitude = position.coords.latitude;
			const longitude = position.coords.longitude;
			setLocation(`${latitude}, ${longitude}`);
			},
			(error) => {
			console.error('Error getting user location:', error.message);
			}
		);
		} else {
		console.log('Geolocation is not supported by this browser.');
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		
		if (acknowledged && location && image) {
		try {
			const formData = new FormData();
			formData.append('id', id);
			formData.append('name', name);
			formData.append('email', email);
			formData.append('collisionTypeI', collisionTypeI);
			formData.append('collisionTypeII', collisionTypeII);
			formData.append('severity', severity);
			formData.append('location', location);
			formData.append('image', image);
			console.log(formData);
			
			// Send a POST request using fetch
			const response = await fetch( config.apiUrlAccidentReport , {
				method: 'POST',
				body: formData,
			});

			// Handle the response as needed
			if (response.ok) {
			const responseData = await response.json();
			console.log('Accident report submitted:', responseData);
			setPreview(true);    
			fetchImage();
			
			// Clear the form after submission
			setLocation('');
			setImage(null);
			setAcknowledged(false);
			} else {
			console.error('Failed to submit accident report:', response.status);
			}
		} catch (error) {
			console.error('Error submitting accident report:', error);
		}
		} else {
			console.log('Please fill in all required fields.');
		}
	};

	const getWidth = () => {
		if (window.innerWidth <= 768) {
			return '30ch';
		} else {
			return '50ch';
		}
	};

	const defaultProps = {
		options: collisionOptions,
		getOptionLabel: (option) => option.title,
	};

	const receiveDataFromChild = (data) => {
        setId(data.id);
		setName(data.name);
		setEmail(data.email);
    };

	return (
		<div>
			<Header /><br /><br /><br /><br />
            <CheckLogin redirect={'/login'} trueRedirect={'/null'} sendDataToParent={receiveDataFromChild} loads={false} />
			<div className='report-container'>
				<h2>Report Accident</h2>
				{preview ? (
					<Box className='boxer'
					component="form"
					sx={{
						'& > :not(style)': { m: 2, width: getWidth(), display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', alignItems: 'center' },
					}}
					noValidate
					autoComplete="off"
					>
						<Box sx={{ '& > :not(style)': { m: 1 }, }}>
							<TextField id="filled-basic" label="Location" variant="filled" required fullWidth size='small' type="text" value={location} onChange={handleLocationChange} disabled/>
							<Button variant="outlined" type="button" onClick={getUserLocation} size='small' disabled >Use Current Location</Button>
						</Box>
						
						<div className='upload'>
							<img src={imageUrl} alt="Accident" style={{ objectFit: 'cover', overflow: 'hidden' }} />	
						</div>

						<Box sx={{ '& > :not(style)': { m: 1 }, }}>
							<p style={{fontSize: 'small', width: '90%', textAlign: 'center'}}><Checkbox type="checkbox" checked onChange={handleAcknowledgementChange} required color="success" disabled />Information provided is accurate.</p>
							<Button variant="contained" type="button" color='success'>Submitted</Button>
						</Box>
					</Box>
				) : (
					<Box
					component="form"
					sx={{
						'& > :not(style)': { m: 2, width: getWidth(), display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', alignItems: 'center' },
					}}
					noValidate
					autoComplete="off"
					>
						<Box sx={{ '& > :not(style)': { m: 1 }, }}>
							<TextField id="filled-basic" label="Location" variant="filled" required fullWidth size='small' type="text" value={location} onChange={handleLocationChange} />
							<Button variant="outlined" type="button" onClick={getUserLocation} size='small' >Use Current Location</Button>
						</Box>

						<div className='collision'>
							<Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: 'row', margin: 'auto', alignItems: 'flex-end', width: '100%', justifyContent: 'center', alignContent: 'center' }}>
								<div>Collision</div>
								<Autocomplete
									{...defaultProps}
									id="typeI"
									clearOnEscape
									fullWidth
									renderInput={(params) => (
									<TextField {...params} label="Type I" variant="standard" required value={collisionTypeI} onSelect={(e) => setCollisionTypeI(e.target.value)} onChange={(e) => setCollisionTypeI(e.target.value)} />
									)}
								/>
								<div> and </div>
								<Autocomplete
									{...defaultProps}
									id="typeII"
									clearOnEscape
									fullWidth
									renderInput={(params) => (
									<TextField {...params} label="Type II" variant="standard" required value={collisionTypeII} onSelect={(e) => setCollisionTypeI(e.target.value)} onChange={(e) => setCollisionTypeII(e.target.value)}/>
									)}
								/>
							</Box>
						</div>
						
						<div className='severity'>
							<Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: 'row', margin: 'auto', alignItems: 'center', width: '100%' }}>
								<div>Severity</div>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label" required>Severity</InputLabel>
									<Select labelId="demo-simple-select-label" value={severity} label='Severity' onChange={(e) => setSeverity(e.target.value)} required fullWidth>
										<MenuItem value='Low'>Low</MenuItem>
										<MenuItem value='Medium'>Medium</MenuItem>
										<MenuItem value='High'>High</MenuItem>
									</Select>
								</FormControl>
							</Box>
						</div>
						
						<div className='upload'>
							<Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: 'column', margin: 'auto', alignItems: 'center' }}>
								<Icon icon="line-md:upload-loop" style={{fontSize: '72px', color: 'purple', margin: 'auto'}}/>
								<input className='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall css-11qr2p8-MuiButtonBase-root-MuiButton-root' type="file" accept="image/*" onChange={handleImageChange} required style={{margin: 'auto'}}/>
								<p style={{textAlign: 'center'}}>Upload an Image of the accident at the spot.</p>
							</Box>
						</div>

						<Box sx={{ '& > :not(style)': { m: 1 }, }}>
							<p style={{fontSize: 'small', width: '90%', textAlign: 'center'}}><Checkbox type="checkbox" checked={acknowledged} onChange={handleAcknowledgementChange} required color="success" />Information provided is accurate.</p>
							<Button variant="contained" type="button" onClick={handleSubmit}>Submit</Button>
						</Box>
					</Box>
				)}
			</div><br /><br />	<br />
		{/* <div>
			<h2>Accident Image</h2>
			{imageUrl ? (
			<img src={imageUrl} alt="Accident" style={{ maxWidth: '100%', maxHeight: '400px' }} />
			) : (
			<p>Loading image...</p>
			)}
		</div> */}
			<Footer />
		</div>
	);
};


const collisionOptions = [
	{ title: 'Car' },
	{ title: 'Truck' },
	{ title: 'Bus' },
	{ title: 'Two wheeler' },
	{ title: 'FootPath' },
	{ title: 'Divider' },
	{ title: 'Pedestrian' },
	{ title: 'Rock' },
	{ title: 'Barriers' },
	{ title: 'Poles' },
	{ title: 'Others' },
];


export default Report;
