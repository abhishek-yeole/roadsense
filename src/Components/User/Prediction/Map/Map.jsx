import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { GeolocateControl } from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import './Map.css';
import Streets from '../../../../Assets/Themes/Streets.png';
import Satellite from '../../../../Assets/Themes/Satellite.png';
import Outdoors from '../../../../Assets/Themes/Outdoors.png';
import Light from '../../../../Assets/Themes/Light.png';
import Dark from '../../../../Assets/Themes/Dark.png';
import NavDay from '../../../../Assets/Themes/Navigation-Day.png';
import NavNight from '../../../../Assets/Themes/Navigation-Night.png';
import Alert from './Alert';
import { Icon } from '@iconify/react';

mapboxgl.accessToken = 'pk.eyJ1IjoibmFtaWNvIiwiYSI6ImNsa3R6Y2s1MTBlcngzcm15N2N6ZTR6emkifQ.fI4xpZC-8EXh0GcX-ouPCw';

const Map = () => {
  const mapContainerRef = useRef(null);
  const [selectedStyle, setSelectedStyle] = useState('mapbox://styles/mapbox/streets-v12');
  const [showTheme, setShowTheme] = useState(false);

  const [lng, setLng] = useState(79.1);
  const [lat, setLat] = useState(21.1);
  const [zoom, setZoom] = useState(3);
  
  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: selectedStyle,
      center: [lng, lat],
      zoom: zoom,
      pitch: 30,
      bearing: -10,
      antialias: true
    });

    map.on('style.load', () => {
      const layers = map.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']).id;
        map.addLayer({
          'id': 'add-3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'height']],
          'fill-extrusion-base': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'min_height']],
          'fill-extrusion-opacity': 0.6
        }},
        labelLayerId
      );
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-left');

    map.addControl(
      new MapboxDirections({
          accessToken: mapboxgl.accessToken
      }),
      'bottom-right'
    );

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(1));
      setLat(map.getCenter().lat.toFixed(1));
      setZoom(map.getZoom().toFixed(1));
    });

    const geolocateControl = new GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    map.addControl(geolocateControl, 'bottom-left');

    geolocateControl.on('geolocate', (e) => {
      const { coords } = e;
      map.flyTo({
        center: [coords.longitude, coords.latitude],
        essential: true
      });
    });

    const removeElements = () => {
      const elementToRemove = document.querySelector(".mapboxgl-ctrl.mapboxgl-ctrl-attrib");
      const elements = document.querySelector(".mapboxgl-ctrl-logo");

      if (elementToRemove) {
        elementToRemove.remove();
      }

      if (elements) {
        const parentElement = elements.parentElement;
        parentElement.remove();
      }
    };

    removeElements();

    const load = document.querySelector('.mapboxgl-ctrl-directions.mapboxgl-ctrl');
    load.classList.add('hide');

    // Clean up on unmount
    return () => map.remove();
  }, [selectedStyle]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStyleChange = (style) => {
    setSelectedStyle(style);
  };

  // const isDesktopView = window.matchMedia("(min-width: 1024px)").matches;
  const [hasHiddenClass, setHasHiddenClass] = useState(false);

  const handleDivClick = () => {
    const parentDiv = document.querySelector('.mapboxgl-ctrl-directions.mapboxgl-ctrl');
    const directions = document.querySelector('.navigate');
    
    if (parentDiv) {
      if (!hasHiddenClass) {
        const closeButton = document.createElement('div');
        closeButton.textContent = 'Close';
        closeButton.onclick = handleCloseButtonClick;
        closeButton.className = 'close';
        parentDiv.appendChild(closeButton);
      }
      parentDiv.classList.add('show');
      directions.classList.add('hide');
      parentDiv.classList.remove('hide');
      directions.classList.remove('show');
      setHasHiddenClass(!hasHiddenClass);
    }
  };

  const handleCloseButtonClick = () => {
    const parentDiv = document.querySelector('.mapboxgl-ctrl-directions.mapboxgl-ctrl')
    const directions = document.querySelector('.navigate');

    if (parentDiv) {
      const closeButton = parentDiv.querySelector('.close');
      if (closeButton) {
        parentDiv.removeChild(closeButton);
      }
      parentDiv.classList.add('hide');
      directions.classList.add('show');
      parentDiv.classList.remove('show');
      directions.classList.remove('hide');
      setHasHiddenClass(hasHiddenClass);
    }
  };

  const handleTheme = () => {
    setShowTheme(!showTheme);
  };

  return (
    <div>
      <Alert />
      <div className='sidebarStyle'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className='map-container' ref={mapContainerRef} />

      <div className='change-theme' onClick={handleTheme}>
        <img src={Streets} alt='Theme0'/>
      </div>

      {showTheme ? (
        <div className='style-selector'>
          <button
            className={`style-selector-button ${selectedStyle === 'mapbox://styles/mapbox/streets-v12' ? 'selected' : ''}`}
            onClick={() => handleStyleChange('mapbox://styles/mapbox/streets-v12')}
          >
            <div className='spacer-img'><img src={Streets} alt='Theme1'/></div>
          </button>
          <button
            className={`style-selector-button ${selectedStyle === 'mapbox://styles/mapbox/outdoors-v12' ? 'selected' : ''}`}
            onClick={() => handleStyleChange('mapbox://styles/mapbox/outdoors-v12')}
          >
            <div className='spacer-img'><img src={Outdoors} alt='Theme2'/></div>
          </button>
          <button
            className={`style-selector-button ${selectedStyle === 'mapbox://styles/mapbox/light-v11' ? 'selected' : ''}`}
            onClick={() => handleStyleChange('mapbox://styles/mapbox/light-v11')}
          >
            <div className='spacer-img'><img src={Light} alt='Theme3'/></div>
          </button>
          <button
            className={`style-selector-button ${selectedStyle === 'mapbox://styles/mapbox/dark-v11' ? 'selected' : ''}`}
            onClick={() => handleStyleChange('mapbox://styles/mapbox/dark-v11')}
          >
            <div className='spacer-img'><img src={Dark} alt='Theme4'/></div>
          </button>
          <button
            className={`style-selector-button ${selectedStyle === 'mapbox://styles/mapbox/satellite-streets-v12' ? 'selected' : ''}`}
            onClick={() => handleStyleChange('mapbox://styles/mapbox/satellite-streets-v12')}
          >
            <div className='spacer-img'><img src={Satellite} alt='Theme5'/></div>
          </button>
          <button
            className={`style-selector-button ${selectedStyle === 'mapbox://styles/mapbox/navigation-day-v1' ? 'selected' : ''}`}
            onClick={() => handleStyleChange('mapbox://styles/mapbox/navigation-day-v1')}
          >
            <div className='spacer-img'><img src={NavDay} alt='Theme6'/></div>
          </button>
          <button
            className={`style-selector-button ${selectedStyle === 'mapbox://styles/mapbox/navigation-night-v1' ? 'selected' : ''}`}
            onClick={() => handleStyleChange('mapbox://styles/mapbox/navigation-night-v1')}
          >
            <div className='spacer-img'><img src={NavNight} alt='Theme7'/></div>
          </button>
        </div>
      ):(<div />)}

      <div className='navigate' onClick={handleDivClick}>
      <Icon icon="eva:navigation-2-fill" /> Navigate
      </div>
    </div>
  );
};

export default Map;