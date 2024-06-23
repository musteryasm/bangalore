import React, { useState } from 'react';
import { Grid, Typography, Card, CardContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';

// Mock data for cities
const cities = [
  'Bengaluru City', 'Bengaluru Dist', 'Belagavi Dist', 'Davanagere', 'Chikkamagaluru', 
  'Hubballi Dharwad City', 'Bidar', 'Bagalkot', 'Hassan', 'Belagavi City'
];

// Mock data for performance metrics per city
const performanceData = {
  'Bengaluru City': {
    resolutionRate: [
      { year: '2018', rate: 68 },
      { year: '2019', rate: 70 },
      { year: '2020', rate: 72 },
      { year: '2021', rate: 75 },
      { year: '2022', rate: 78 },
    ],
    responseTime: [
      { year: '2018', time: 15 },
      { year: '2019', time: 14 },
      { year: '2020', time: 12 },
      { year: '2021', time: 10 },
      { year: '2022', time: 8 },
    ],
    timeToResolve: [
      { crime: 'Of Automobiles - Of Two Wheelers', time: 10 },
      { crime: 'Other Roads', time: 15 },
      { crime: 'Information Technology Act 2000, 2009', time: 20 },
      { crime: 'Public Safety', time: 12 },
    ],
    futurePredictions: [
      { year: '2023', prediction: 80 },
      { year: '2024', prediction: 82 },
      { year: '2025', prediction: 85 },
    ],
  },
  'Bengaluru Dist': {
    resolutionRate: [
      { year: '2018', rate: 68 },
      { year: '2019', rate: 69 },
      { year: '2020', rate: 70 },
      { year: '2021', rate: 72 },
      { year: '2022', rate: 75 },
    ],
    responseTime: [
      { year: '2018', time: 16 },
      { year: '2019', time: 15 },
      { year: '2020', time: 15 },
      { year: '2021', time: 13 },
      { year: '2022', time: 11 },
    ],
    timeToResolve: [
      { crime: 'National Highways', time: 14 },
      { crime: 'Of Automobiles - Of Two Wheelers', time: 18 },
      { crime: 'Other Roads', time: 12 },
      { crime: 'Women', time: 9 },
    ],
    futurePredictions: [
      { year: '2023', prediction: 77 },
      { year: '2024', prediction: 80 },
      { year: '2025', prediction: 83 },
    ],
  },
  'Belagavi Dist': {
    resolutionRate: [
      { year: '2018', rate: 60 },
      { year: '2019', rate: 62 },
      { year: '2020', rate: 65 },
      { year: '2021', rate: 68 },
      { year: '2022', rate: 70 },
    ],
    responseTime: [
      { year: '2018', time: 22 },
      { year: '2019', time: 21 },
      { year: '2020', time: 20 },
      { year: '2021', time: 18 },
      { year: '2022', time: 15 },
    ],
    timeToResolve: [
      { crime: 'State Highways', time: 25 },
      { crime: 'Other Roads', time: 20 },
      { crime: 'Gambling - Matka (78 Class C)', time: 22 },
      { crime: 'Karnataka Excise Act 1965', time: 18 },
    ],
    futurePredictions: [
      { year: '2023', prediction: 72 },
      { year: '2024', prediction: 75 },
      { year: '2025', prediction: 78 },
    ],
  },
  'Davanagere': {
    resolutionRate: [
      { year: '2018', rate: 55 },
      { year: '2019', rate: 58 },
      { year: '2020', rate: 60 },
      { year: '2021', rate: 62 },
      { year: '2022', rate: 65 },
    ],
    responseTime: [
      { year: '2018', time: 20 },
      { year: '2019', time: 19 },
      { year: '2020', time: 18 },
      { year: '2021', time: 16 },
      { year: '2022', time: 14 },
    ],
    timeToResolve: [
      { crime: 'State Highways', time: 22 },
      { crime: 'Other Roads', time: 18 },
      { crime: 'Women', time: 20 },
      { crime: 'Gambling - Matka (78 Class C)', time: 16 },
    ],
    futurePredictions: [
      { year: '2023', prediction: 68 },
      { year: '2024', prediction: 70 },
      { year: '2025', prediction: 73 },
    ],
  },
  'Chikkamagaluru': {
    resolutionRate: [
      { year: '2018', rate: 50 },
      { year: '2019', rate: 55 },
      { year: '2020', rate: 58 },
      { year: '2021', rate: 60 },
      { year: '2022', rate: 62 },
    ],
    responseTime: [
      { year: '2018', time: 24 },
      { year: '2019', time: 23 },
      { year: '2020', time: 22 },
      { year: '2021', time: 20 },
      { year: '2022', time: 18 },
    ],
    timeToResolve: [
      { crime: 'Simple Hurt', time: 20 },
      { crime: 'Karnataka Excise Act 1965', time: 22 },
      { crime: 'Other Roads', time: 18 },
      { crime: 'National Highways', time: 15 },
    ],
    futurePredictions: [
      { year: '2023', prediction: 65 },
      { year: '2024', prediction: 67 },
      { year: '2025', prediction: 70 },
    ],
  },
  'Hubballi Dharwad City': {
    resolutionRate: [
      { year: '2018', rate: 58 },
      { year: '2019', rate: 60 },
      { year: '2020', rate: 62 },
      { year: '2021', rate: 65 },
      { year: '2022', rate: 68 },
    ],
    responseTime: [
      { year: '2018', time: 24 },
      { year: '2019', time: 22 },
      { year: '2020', time: 20 },
      { year: '2021', time: 18 },
      { year: '2022', time: 15 },
    ],
    timeToResolve: [
      { crime: 'Information Technology Act 2000, 2009', time: 20 },
      { crime: 'State Highways', time: 22 },
      { crime: 'Simple Hurt', time: 18 },
      { crime: 'Of Automobiles - Of Two Wheelers', time: 16 },
    ],
    futurePredictions: [
      { year: '2023', prediction: 70 },
      { year: '2024', prediction: 73 },
      { year: '2025', prediction: 75 },
    ],
  },
  'Bidar': {
    resolutionRate: [
      { year: '2018', rate: 45 },
      { year: '2019', rate: 48 },
      { year: '2020', rate: 50 },
      { year: '2021', rate: 55 },
      { year: '2022', rate: 60 },
    ],
    responseTime: [
      { year: '2018', time: 27 },
      { year: '2019', time: 26 },
      { year: '2020', time: 25 },
      { year: '2021', time: 22 },
      { year: '2022', time: 20 },
    ],
    timeToResolve: [
      { crime: 'Simple Hurt', time: 24 },
      { crime: 'Other Roads', time: 22 },
      { crime: 'National Highways', time: 20 },
      { crime: 'State Highways', time: 18 },
    ],
    futurePredictions: [
      { year: '2023', prediction: 63 },
      { year: '2024', prediction: 65 },
      { year: '2025', prediction: 68 },
    ],
  },
  'Bagalkot': {
    resolutionRate: [
      { year: '2018', rate: 40 },
      { year: '2019', rate: 45 },
      { year: '2020', rate: 48 },
      { year: '2021', rate: 50 },
      { year: '2022', rate: 55 },
    ],
    responseTime: [
      { year: '2018', time: 26 },
      { year: '2019', time: 25 },
      { year: '2020', time: 24 },
      { year: '2021', time: 22 },
      { year: '2022', time: 20 },
    ],
    timeToResolve: [
      { crime: 'National Highways', time: 22 },
      { crime: 'State Highways', time: 20 },
      { crime: 'Women', time: 18 },
      { crime: 'Of Automobiles - Of Two Wheelers', time: 16 },
    ],
    futurePredictions: [
      { year: '2023', prediction: 58 },
      { year: '2024', prediction: 60 },
      { year: '2025', prediction: 63 },
    ],
  },
  'Hassan': {
    resolutionRate: [
      { year: '2018', rate: 70 },
      { year: '2019', rate: 72 },
      { year: '2020', rate: 74 },
      { year: '2021', rate: 76 },
      { year: '2022', rate: 78 },
    ],
    responseTime: [
      { year: '2018', time: 14 },
      { year: '2019', time: 13 },
      { year: '2020', time: 12 },
      { year: '2021', time: 11 },
      { year: '2022', time: 10 },
    ],
    timeToResolve: [
      { crime: 'Information Technology Act 2000, 2009', time: 12 },
      { crime: 'Of Automobiles - Of Two Wheelers', time: 10 },
      { crime: 'Women', time: 8 },
      { crime: 'Simple Hurt', time: 6 },
    ],
    futurePredictions: [
      { year: '2023', prediction: 80 },
      { year: '2024', prediction: 82 },
      { year: '2025', prediction: 85 },
    ],
  },
  'Belagavi City': {
    resolutionRate: [
      { year: '2018', rate: 55 },
      { year: '2019', rate: 58 },
      { year: '2020', rate: 60 },
      { year: '2021', rate: 62 },
      { year: '2022', rate: 65 },
    ],
    responseTime: [
      { year: '2018', time: 24 },
      { year: '2019', time: 22 },
      { year: '2020', time: 20 },
      { year: '2021', time: 18 },
      { year: '2022', time: 16 },
    ],
    timeToResolve: [
      { crime: 'State Highways', time: 20 },
      { crime: 'Other Roads', time: 18 },
      { crime: 'Simple Hurt', time: 16 },
      { crime: 'Karnataka Excise Act 1965', time: 14 },
    ],
    futurePredictions: [
      { year: '2023', prediction: 68 },
      { year: '2024', prediction: 70 },
      { year: '2025', prediction: 72 },
    ],
  },
};

const Performance = () => {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const currentData = performanceData[selectedCity];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>City</InputLabel>
          <Select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
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

      {/* <Grid item xs={12}>
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
      </Grid> */}
    </Grid>
  );
};

export default Performance;
