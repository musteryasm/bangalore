import React, { useState } from 'react';
import { Grid, Typography, Card, CardContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';

// Mock data for districts
const districts = ['District 1', 'District 2', 'District 3'];

// Mock data for performance metrics per district
const performanceData = {
  'District 1': {
    resolutionRate: [
      { year: '2020', rate: 75 },
      { year: '2021', rate: 80 },
      { year: '2022', rate: 85 },
    ],
    responseTime: [
      { year: '2020', time: 10 },
      { year: '2021', time: 8 },
      { year: '2022', time: 7 },
    ],
    timeToResolve: [
      { crime: 'Theft', time: 5 },
      { crime: 'Assault', time: 8 },
      { crime: 'Burglary', time: 12 },
      { crime: 'Vandalism', time: 3 },
    ],
    futurePredictions: [
      { year: '2023', prediction: 90 },
      { year: '2024', prediction: 92 },
      { year: '2025', prediction: 95 },
    ],
  },
  'District 2': {
    resolutionRate: [
      { year: '2020', rate: 70 },
      { year: '2021', rate: 75 },
      { year: '2022', rate: 80 },
    ],
    responseTime: [
      { year: '2020', time: 12 },
      { year: '2021', time: 9 },
      { year: '2022', time: 8 },
    ],
    timeToResolve: [
      { crime: 'Theft', time: 6 },
      { crime: 'Assault', time: 9 },
      { crime: 'Burglary', time: 11 },
      { crime: 'Vandalism', time: 4 },
    ],
    futurePredictions: [
      { year: '2023', prediction: 85 },
      { year: '2024', prediction: 88 },
      { year: '2025', prediction: 90 },
    ],
  },
  'District 3': {
    resolutionRate: [
      { year: '2020', rate: 80 },
      { year: '2021', rate: 85 },
      { year: '2022', rate: 90 },
    ],
    responseTime: [
      { year: '2020', time: 11 },
      { year: '2021', time: 9 },
      { year: '2022', time: 6 },
    ],
    timeToResolve: [
      { crime: 'Theft', time: 4 },
      { crime: 'Assault', time: 7 },
      { crime: 'Burglary', time: 10 },
      { crime: 'Vandalism', time: 2 },
    ],
    futurePredictions: [
      { year: '2023', prediction: 92 },
      { year: '2024', prediction: 94 },
      { year: '2025', prediction: 96 },
    ],
  },
};

const Performance = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);
  const currentData = performanceData[selectedDistrict];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>District</InputLabel>
          <Select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            {districts.map((district) => (
              <MenuItem key={district} value={district}>
                {district}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Incident Resolution Rate</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentData.resolutionRate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="rate" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Response Time</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentData.responseTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="time" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">Average Time to Resolve Incident</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={currentData.timeToResolve}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="crime" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="time" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">Future Predictions</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentData.futurePredictions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="prediction" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Performance;
