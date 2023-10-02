import React, { useEffect, useState } from 'react';
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
        <Icon icon="material-symbols:location-on" /> {coordinates}
      </div>
      <div className='copyright'>
        RoadSense
      </div>
      <div className='live'>
        Live
      </div>
    </div>
  )
}

export default Footer