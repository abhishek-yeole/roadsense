import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const MapboxMap = ({ location, mapContainer, mapStyle, zoom }) => {
  // Extract latitude and longitude from the location string
  const [latitude, longitude] = location.split(', ');

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmFtaWNvIiwiYSI6ImNsa3R6Y2s1MTBlcngzcm15N2N6ZTR6emkifQ.fI4xpZC-8EXh0GcX-ouPCw'; // Replace with your Mapbox access token

    // Create a new Mapbox map
    const map = new mapboxgl.Map({
      container: mapContainer, // Specify the container ID where the map will be rendered
      style: mapStyle, // You can change the map style if needed
      center: [longitude, latitude], // Center the map at the specified coordinates
      zoom: zoom, // Adjust the initial zoom level
    });
    const size = 200;
 
    // This implements `StyleImageInterface`
    // to draw a pulsing dot icon on the map.
    const pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),
    
    // When the layer is added to the map,
    // get the rendering context for the map canvas.
    onAdd: function () {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext('2d');
    },
    
    // Call once before every frame where the icon will be used.
    render: function () {
    const duration = 1000;
    const t = (performance.now() % duration) / duration;
    
    const radius = (size / 2) * 0.3;
    const outerRadius = (size / 2) * 0.7 * t + radius;
    const context = this.context;
    
    // Draw the outer circle.
    context.clearRect(0, 0, this.width, this.height);
    context.beginPath();
    context.arc(
    this.width / 2,
    this.height / 2,
    outerRadius,
    0,
    Math.PI * 2
    );
    context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
    context.fill();
    
    // Draw the inner circle.
    context.beginPath();
    context.arc(
    this.width / 2,
    this.height / 2,
    radius,
    0,
    Math.PI * 2
    );
    context.fillStyle = 'rgba(255, 100, 100, 1)';
    context.strokeStyle = 'white';
    context.lineWidth = 2 + 4 * (1 - t);
    context.fill();
    context.stroke();
    
    // Update this image's data with data from the canvas.
    this.data = context.getImageData(
    0,
    0,
    this.width,
    this.height
    ).data;
    
    // Continuously repaint the map, resulting
    // in the smooth animation of the dot.
    map.triggerRepaint();
    
    // Return `true` to let the map know that the image was updated.
    return true;
    }
    };
    
    map.on('load', () => {
    map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
    
    map.addSource('dot-point', {
    'type': 'geojson',
    'data': {
    'type': 'FeatureCollection',
    'features': [
    {
    'type': 'Feature',
    'geometry': {
    'type': 'Point',
    'coordinates': [longitude, latitude] // icon position [lng, lat]
    }
    }
    ]
    }
    });
    map.addLayer({
    'id': 'layer-with-pulsing-dot',
    'type': 'symbol',
    'source': 'dot-point',
    'layout': {
    'icon-image': 'pulsing-dot'
    }
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

    // Add a marker to the map
    new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(map);
  }, [latitude, longitude, mapContainer, mapStyle, zoom]);

  return (
    <div></div>
  );
};

export default MapboxMap;
