import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, HeatmapLayer, useLoadScript } from '@react-google-maps/api';

const mapStyles = [
  {
    featureType: 'all',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
];

const defaultCenter = { lat: 15.3173, lng: 75.7139 };

const HeatmapCard = () => {
  const [heatmapData, setHeatmapData] = useState([]);
  const apiKey = 'AIzaSyBV853OPCEtlHQsWFqIebMdIhDFpxurTBM';
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ['visualization'],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const clusteredResponse = await fetch('http://ksp-dev.ap-south-1.elasticbeanstalk.com/clustered');
      const unclusteredResponse = await fetch('http://ksp-dev.ap-south-1.elasticbeanstalk.com/unclustered');

      if (!clusteredResponse.ok || !unclusteredResponse.ok) {
        throw new Error('Failed to fetch data from the API');
      }

      const clusteredData = await clusteredResponse.json();
      const unclusteredData = await unclusteredResponse.json();

      const combinedData = [
        ...clusteredData.slice(0, 50).map(report => ({ location: new window.google.maps.LatLng(parseFloat(report.latitude), parseFloat(report.longitude)) })),
        ...unclusteredData.slice(0, 50).map(report => ({ location: new window.google.maps.LatLng(parseFloat(report.latitude), parseFloat(report.longitude)) }))
      ];

      setHeatmapData(combinedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMap
        mapContainerStyle={{ height: '100%', width: '100%' }}
        zoom={7}
        center={defaultCenter}
        options={{
          styles: mapStyles,
          disableDefaultUI: true,
          zoomControl: true,
          streetViewControl: false,
          clickableIcons: false,
        }}
      >
        {heatmapData.length > 0 && (
          <HeatmapLayer
            data={heatmapData}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default HeatmapCard;
