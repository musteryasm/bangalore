import React, { useState, useEffect } from 'react';
import { Grid, TextField, Typography, Box, Button, Card, CardContent } from '@mui/material';
import { GoogleMap, LoadScript, Marker, InfoWindow, Circle, useLoadScript } from '@react-google-maps/api';

const mapStyles = [
  {
    featureType: 'all',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
];

const defaultCenter = { lat: 15.3173, lng: 75.7139 };

const HotspotsMapCard = () => {
  const [location, setLocation] = useState('');
  const [crime, setCrime] = useState('');
  const [clusteredData, setClusteredData] = useState([]);
  const [unclusteredData, setUnclusteredData] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [apiKey] = useState('AIzaSyBV853OPCEtlHQsWFqIebMdIhDFpxurTBM');
  const [mapRef, setMapRef] = useState(null);
  const [newMarker, setNewMarker] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const clusteredResponse = await fetch('http://ksp-dev.ap-south-1.elasticbeanstalk.com/clustered');
      const unclusteredResponse = await fetch('http://ksp-dev.ap-south-1.elasticbeanstalk.com/unclustered');

      if (!clusteredResponse.ok || !unclusteredResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const clusteredData = await clusteredResponse.json();
      const unclusteredData = await unclusteredResponse.json();

      setClusteredData(clusteredData.slice(0, 50));
      setUnclusteredData(unclusteredData.slice(0, 50));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.status === 'OK') {
        const { lat, lng } = data.results[0].geometry.location;

        const newCrimeData = {
          un_lat: lat,
          un_lon: lng,
          crimes: crime,
        };

        const submitResponse = await fetch('http://ksp-dev.ap-south-1.elasticbeanstalk.com/unclustered', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCrimeData),
        });

        if (!submitResponse.ok) {
          throw new Error('Failed to submit crime data');
        }

        const responseData = await submitResponse.json();
        console.log('Crime data submitted successfully:', responseData);

        const formattedResponseData = {
          latitude: parseFloat(responseData.latitude),
          longitude: parseFloat(responseData.longitude),
          crimes: responseData.crimes,
        };

        setUnclusteredData((prevData) => [...prevData, formattedResponseData]);

        setNewMarker({ lat, lng, crimes: crime.split(',') });

        if (mapRef) {
          mapRef.panTo({ lat, lng });
          mapRef.setZoom(15);
        }
      } else {
        console.error('Geocode was not successful for the following reason:', data.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMarkerClick = (report) => {
    const processedReport = { ...report };
    if (typeof report.crimes === 'string') {
      processedReport.crimes = report.crimes.split(',');
    } else {
      processedReport.crimes = report.crimes || [];
    }
    setSelectedReport(processedReport);
  };

  const handleInfoWindowClose = () => {
    setSelectedReport(null);
  };

  const isValidLatLng = (lat, lng) => {
    return typeof lat === 'number' && typeof lng === 'number';
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4} lg={3}>
              <Typography variant="h5" gutterBottom>
                Add Crime Location
              </Typography>
              <Box mt={2}>
                <Typography variant="body1">Location</Typography>
                <TextField
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  fullWidth
                  variant="outlined"
                />
              </Box>
              <Box mt={2}>
                <Typography variant="body1">Crime</Typography>
                <TextField
                  value={crime}
                  onChange={(e) => setCrime(e.target.value)}
                  fullWidth
                  variant="outlined"
                />
              </Box>
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <div style={{ height: '400px', backgroundColor: '#f0f0f0' }}>
                <GoogleMap
                  mapContainerStyle={{ height: '100%', width: '100%' }}
                  zoom={7}
                  center={defaultCenter}
                  options={{
                    styles: mapStyles,
                    disableDefaultUI: true,
                    zoomControl: false,
                    streetViewControl: false,
                    clickableIcons: false,
                  }}
                  onLoad={(map) => setMapRef(map)}
                >
                  {clusteredData.map((report, index) => {
                    const lat = parseFloat(report.latitude);
                    const lng = parseFloat(report.longitude);
                    const crimes = report.crimes.split(',');
                    const intensityColor = 'rgba(255, 0, 0, 0.5)';

                    if (!isValidLatLng(lat, lng)) {
                      console.error(`Invalid coordinates for clustered report: ${report}`);
                      return null;
                    }

                    return (
                      <React.Fragment key={index}>
                        <Marker
                          position={{ lat, lng }}
                          onClick={() => handleMarkerClick({ ...report, crimes })}
                        />
                        <Circle
                          center={{ lat, lng }}
                          radius={1000}
                          options={{
                            strokeColor: intensityColor,
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: intensityColor,
                            fillOpacity: 0.3,
                          }}
                        />
                      </React.Fragment>
                    );
                  })}
                  {unclusteredData.map((report, index) => {
                    const lat = parseFloat(report.latitude);
                    const lng = parseFloat(report.longitude);

                    if (!isValidLatLng(lat, lng)) {
                      console.error(`Invalid coordinates for unclustered report: ${report}`);
                      return null;
                    }

                    return (
                      <Marker
                        key={index}
                        position={{ lat, lng }}
                        onClick={() => handleMarkerClick(report)}
                      />
                    );
                  })}
                  {newMarker && (
                    <Marker
                      position={{ lat: newMarker.lat, lng: newMarker.lng }}
                      onClick={() => handleMarkerClick({ latitude: newMarker.lat, longitude: newMarker.lng, crimes: newMarker.crimes })}
                    />
                  )}
                  {selectedReport && (
                    <InfoWindow
                      position={{ lat: parseFloat(selectedReport.latitude), lng: parseFloat(selectedReport.longitude) }}
                      onCloseClick={handleInfoWindowClose}
                    >
                      <div>
                        <Typography variant="body1">Crimes:</Typography>
                        {Array.isArray(selectedReport.crimes) && selectedReport.crimes.length > 0 ? (
                          <ul>
                            {selectedReport.crimes.map((crime, index) => (
                              <li key={index}>{crime.trim()}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>No crimes reported</p>
                        )}
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default HotspotsMapCard;
