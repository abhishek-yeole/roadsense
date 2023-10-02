import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import './layout.css';

const Footer = () => {
  const [coordinates, setCoordinates] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const coord = `${position.coords.longitude.toFixed(2)}, ${position.coords.latitude.toFixed(2)}`;
      setCoordinates(coord);
    });
  }, []);

  return (
    <div className='footer-container'>
      <div className='location'>
        {coordinates}
      </div>
      <div className='footer-name'>
        RoadSense@Copyright2023
      </div>
      <div className='live'>
        <Icon icon="fluent:live-24-filled" style={{color: 'green', fontWeight: 'bolder', fontSize: 'medium'}} />
        <div> Live</div>
      </div>
    </div>
  )
}

export default Footer