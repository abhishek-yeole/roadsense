import React, { useState } from 'react'
import Map from './Map/Map';
import Interface from './Interface/Interface';
import './prediction.css'

const Prediction = () => {
  const [showComponentA, setShowComponentA] = useState(true);

  const handleClick = (showA) => {
    setShowComponentA(showA);
  };

  return (
    <div className='switcher'>
      <div onClick={() => handleClick(true)} style={{ cursor: 'pointer' }}>
        Click to show Component A
      </div>
      <div onClick={() => handleClick(false)} style={{ cursor: 'pointer' }}>
        Click to show Component B
      </div>
      {showComponentA ? <Map /> : <Interface />}
    </div>
  )
}

export default Prediction