import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { GeolocateControl } from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const GeoCoder = () => {
    const [coordinates, setCoordinates] = useState('');

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
          setCoordinates(resultCoordinates.join(', '));
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
          const coord = ''+ coords.longitude + '' + coords.latitude;
          setCoordinates(coord);
        });
    }, []);
    
    return (
        <div>
            <div className='geocoder' />
            <div
                className='currentLocation'
                onClick={() => {
                    navigator.geolocation.getCurrentPosition((position) => {
                        const coord = `${position.coords.longitude}, ${position.coords.latitude}`;
                        setCoordinates(coord);
                    });
                }}
            >
                Use Current Location
            </div>
            <input
                type='text'
                value={coordinates}
                onChange={(e) => setCoordinates(e.target.value)}
                placeholder='Coordinates'
            />
        </div>
    )
}

export default GeoCoder