import React, { useState } from 'react'
import Header from './Layout/Header';
import LeftPanel from './Layout/LeftPanel';
import Map from './Prediction/Map/Map';
import Interface from './Prediction/Interface/Interface';
import CheckLogin from '../Auth/CheckLogin';

const User = () => {
  const [displayMap, setDisplayMap] = useState(true);

  const receiveDataFromChild = (data) => {
    console.log(data);
  };

  return (
    <div className='App'>
      <CheckLogin redirect={'/login'} trueRedirect={'/null'} sendDataToParent={receiveDataFromChild} loads={true}/>
      <Header />
      <LeftPanel toggleDisplay={() => setDisplayMap(!displayMap)} />
      {displayMap ? <Map /> : <Interface />}
    </div>
  )
}

export default User