import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, Marker, InfoWindow } from '@react-google-maps/api';

const mapStyles = [
  {
    featureType: 'all',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
];

const defaultCenter = { lat: 15.3173, lng: 75.7139 };

function CrimeReportForm() {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [unitName, setUnitName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [reason, setReason] = useState('');
  const [reportList, setReportList] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [apiKey] = useState('AIzaSyBV853OPCEtlHQsWFqIebMdIhDFpxurTBM');
  const [mapRef, setMapRef] = useState(null);

  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {
    try {
      const response = await fetch('http://ksp-dev.ap-south-1.elasticbeanstalk.com/beats');
      const routes = await response.json();
      const loadedReports = await Promise.all(routes.map(async (route) => {
        try {
          const directionsResult = await getDirections(
            { lat: route.start_lat, lng: route.start_lng },
            { lat: route.end_lat, lng: route.end_lng }
          );
          return {
            id: route.id,
            unitName: route.unit_name,
            startTime: route.start_time,
            endTime: route.end_time,
            reason: route.reason,
            route: directionsResult,
          };
        } catch (error) {
          console.warn(`Failed to get directions for route ${route.id}:`, error);
          return null;
        }
      }));
      setReportList(loadedReports.filter(report => report !== null));
    } catch (error) {
      console.error('Error loading routes:', error);
    }
  };

  const getDirections = (origin, destination) => {
    return new Promise((resolve, reject) => {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            resolve(result);
          } else {
            reject(new Error('Directions request failed due to ' + status));
          }
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const startLatLng = await getLatLng(startLocation);
      const endLatLng = await getLatLng(endLocation);

      const newReport = {
        unit_name: unitName,
        start_lat: startLatLng.lat,
        start_lng: startLatLng.lng,
        end_lat: endLatLng.lat,
        end_lng: endLatLng.lng,
        start_time: new Date(startTime).toISOString(),
        end_time: new Date(endTime).toISOString(),
        reason: reason,
      };

      console.log('Sending data:', newReport);

      const response = await fetch('http://ksp-dev.ap-south-1.elasticbeanstalk.com/beats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReport),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const savedReport = await response.json();
      const directionsResult = await getDirections(
        { lat: savedReport.start_lat, lng: savedReport.start_lng },
        { lat: savedReport.end_lat, lng: savedReport.end_lng }
      );

      const newReportWithRoute = {
        ...savedReport,
        id: savedReport.id,
        unitName: savedReport.unit_name,
        startTime: savedReport.start_time,
        endTime: savedReport.end_time,
        route: directionsResult,
      };

      setReportList((prevList) => [...prevList, newReportWithRoute]);

      // Zoom to the route
      const bounds = new window.google.maps.LatLngBounds();
      directionsResult.routes[0].overview_path.forEach((point) => bounds.extend(point));
      mapRef.fitBounds(bounds);

      // Clear input fields
      setStartLocation('');
      setEndLocation('');
      setUnitName('');
      setStartTime('');
      setEndTime('');
      setReason('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getLatLng = (address) => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          resolve({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          });
        } else {
          reject(new Error('Geocode was not successful for the following reason: ' + status));
        }
      });
    });
  };

  const handleMarkerClick = (report) => {
    setSelectedRoute(report);
  };

  const handleInfoWindowClose = () => {
    setSelectedRoute(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ padding: '20px', backgroundColor: '#f5f5f5', flex: '0 1 auto' }}>
        <h2>Beat Deployment</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
          <div>
            <label>Start Location</label>
            <input
              type="text"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label>End Location</label>
            <input
              type="text"
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label>Unit Name</label>
            <input
              type="text"
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label>Start Time</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label>End Time</label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label>Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              style={{ width: '100%' }}
            />
          </div>
          <button type="submit" style={{ padding: '10px', backgroundColor: '#1976d2', color: '#fff', border: 'none', cursor: 'pointer' }}>
            Submit
          </button>
        </form>
      </div>
      <div style={{ flexGrow: 1, height: '100%' }}>
        <LoadScript googleMapsApiKey={apiKey}>
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
            {reportList.map((report) => (
              <React.Fragment key={report.id}>
                {report.route && (
                  <>
                    <DirectionsRenderer
                      directions={report.route}
                      options={{
                        suppressMarkers: true,
                        preserveViewport: true,
                        polylineOptions: {
                          strokeColor: "#0000FF",
                          strokeOpacity: 0.8,
                          strokeWeight: 5,
                        }
                      }}
                    />
                    <Marker
                      position={report.route.routes[0].legs[0].start_location}
                      label="S"
                      onClick={() => handleMarkerClick(report)}
                    />
                    <Marker
                      position={report.route.routes[0].legs[0].end_location}
                      label="E"
                      onClick={() => handleMarkerClick(report)}
                    />
                  </>
                )}
              </React.Fragment>
            ))}
            {selectedRoute && (
              <InfoWindow
                position={selectedRoute.route.routes[0].legs[0].start_location}
                onCloseClick={handleInfoWindowClose}
              >
                <div>
                  <p>Unit: {selectedRoute.unitName}</p>
                  <p>Start Time: {new Date(selectedRoute.startTime).toLocaleString()}</p>
                  <p>End Time: {new Date(selectedRoute.endTime).toLocaleString()}</p>
                  <p>Reason: {selectedRoute.reason}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default CrimeReportForm;
