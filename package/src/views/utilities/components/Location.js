import React from 'react';
import { Typography, Grid, Card, CardContent, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Box } from '@mui/material';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Legend, ComposedChart } from 'recharts';
import HotspotsMapCard from '../../dashboard/components/Hotspots';

// Mock data for top reported locations
const topLocations = [
  { id: 1, location: 'Location A', reports: 50, details: 'High theft incidents' },
  { id: 2, location: 'Location B', reports: 45, details: 'Vandalism cases' },
  { id: 3, location: 'Location C', reports: 40, details: 'Assaults reported' },
  { id: 4, location: 'Location D', reports: 35, details: 'Burglary concerns' },
  { id: 5, location: 'Location E', reports: 30, details: 'Low patrol coverage' },
];

// Mock data for patrol frequency
const patrolFrequency = [
  { location: 'Location A', frequency: 20 },
  { location: 'Location B', frequency: 25 },
  { location: 'Location C', frequency: 18 },
  { location: 'Location D', frequency: 22 },
  { location: 'Location E', frequency: 15 },
];

// Mock data for incidents reported by location
const incidentsReported = [
  { year: '2020', 'Location A': 50, 'Location B': 45, 'Location C': 40, 'Location D': 35, 'Location E': 30 },
  { year: '2021', 'Location A': 55, 'Location B': 50, 'Location C': 42, 'Location D': 38, 'Location E': 32 },
  { year: '2022', 'Location A': 60, 'Location B': 55, 'Location C': 48, 'Location D': 42, 'Location E': 35 },
];

// Mock data for predicted vulnerable locations
const predictedLocations = [
  { location: 'Location F', prediction: 'High theft incidents' },
  { location: 'Location G', prediction: 'Potential vandalism cases' },
  { location: 'Location H', prediction: 'Increased assault reports' },
  { location: 'Location H', prediction: 'Increased assault reports' },
  { location: 'Location H', prediction: 'Increased assault reports' },
  
];

const Locations = () => {
  return (
    <Grid container spacing={3}>
      {/* Hotspots Map */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Hotspots Map
            </Typography>
            {/* <HotspotsMapCard/> */}
            <div style={{ height: '300px', backgroundColor: '#f0f0f0', textAlign: 'center', lineHeight: '300px' }}>
              <HotspotsMapCard/>
            </div>
          </CardContent>
        </Card>
      </Grid>

      {/* Top Reported Locations Table */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Top Reported Locations
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Location</TableCell>
                    <TableCell>Reports</TableCell>
                    <TableCell>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topLocations.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.location}</TableCell>
                      <TableCell>{row.reports}</TableCell>
                      <TableCell>{row.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Predicted Vulnerable Locations */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Predicted Vulnerable Locations (Next 3 Years)
            </Typography>
            <Typography variant="body1" gutterBottom>
              Predictions based on historical data and analytics.
            </Typography>
            {predictedLocations.map((location) => (
              <Box key={location.location} mb={2}>
                <Typography variant="subtitle1">{location.location}</Typography>
                <Typography variant="body2">{location.prediction}</Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>

      {/* Total Number of Locations Card */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Number of Locations</Typography>
            <Typography variant="h4">100</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Number of Locations</Typography>
            <Typography variant="h4">100</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Number of Locations</Typography>
            <Typography variant="h4">100</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Number of Locations</Typography>
            <Typography variant="h4">100</Typography>
          </CardContent>
        </Card>
        
      </Grid>

      {/* Patrol Frequency Bar Chart */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Patrol Frequency by Location
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={patrolFrequency} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="location" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="frequency" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Incidents Reported Line Chart */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Incidents Reported by Location Over Years
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={incidentsReported}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                {Object.keys(incidentsReported[0])
                  .filter((key) => key !== 'year')
                  .map((location) => (
                    <Line key={location} type="monotone" dataKey={location} stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                  ))}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Locations;
