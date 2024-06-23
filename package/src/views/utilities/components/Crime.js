import React, { useState } from 'react';
import { Grid, Typography, Card, CardContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import HeatmapCard from './heatmap';

// Updated city data
const cities = [
  'Bengaluru City', 'Bengaluru Dist', 'Belagavi Dist', 'Davanagere', 'Chikkamagaluru', 
  'Hubballi Dharwad City', 'Bidar', 'Bagalkot', 'Hassan', 'Belagavi City'
];

const crimeData = {
  'Bengaluru City': {
    crimeCounts: [
      { type: 'Of Automobiles - Of Two Wheelers', count: 16416 },
      { type: 'Other Roads', count: 11021 },
      { type: 'Information Technology Act 2000, 2009', count: 10630 },
      { type: 'Public Safety', count: 9025 },
      { type: 'CHEATING', count: 8920 },
      { type: 'Simple Hurt', count: 8663 },
      { type: 'Women', count: 8654 },
      { type: 'Man', count: 5962 },
    ],
    crimeTypesData: [
      { name: 'Of Automobiles - Of Two Wheelers', value: 16416 },
      { name: 'Other Roads', value: 11021 },
      { name: 'Information Technology Act 2000, 2009', value: 10630 },
      { name: 'Public Safety', value: 9025 },
      { name: 'CHEATING', value: 8920 },
      { name: 'Simple Hurt', value: 8663 },
      { name: 'Women', value: 8654 },
      { name: 'Man', value: 5962 },
    ],
    crimeStatusData: [
      { name: 'Non Heinous', count: 297588 },
      { name: 'Heinous', count: 40026 },
    ],
  },
  'Bengaluru Dist': {
    crimeCounts: [
      { type: 'National Highways', count: 4594 },
      { type: 'Of Automobiles - Of Two Wheelers', count: 3254 },
      { type: 'Other Roads', count: 3229 },
      { type: 'Women', count: 2933 },
      { type: 'Simple Hurt', count: 2017 },
      { type: 'State Highways', count: 1612 },
      { type: 'CHEATING', count: 1553 },
      { type: 'Man', count: 1417 },
    ],
    crimeTypesData: [
      { name: 'National Highways', value: 4594 },
      { name: 'Of Automobiles - Of Two Wheelers', value: 3254 },
      { name: 'Other Roads', value: 3229 },
      { name: 'Women', value: 2933 },
      { name: 'Simple Hurt', value: 2017 },
      { name: 'State Highways', value: 1612 },
      { name: 'CHEATING', value: 1553 },
      { name: 'Man', value: 1417 },
    ],
    crimeStatusData: [
      { name: 'Non Heinous', count: 297588 },
      { name: 'Heinous', count: 40026 },
    ],
  },
  'Belagavi Dist': {
    crimeCounts: [
      { type: 'State Highways', count: 4458 },
      { type: 'Other Roads', count: 2465 },
      { type: 'Gambling - Matka (78 Class C)', count: 1811 },
      { type: 'Karnataka Excise Act 1965', count: 1358 },
      { type: 'Simple Hurt', count: 1312 },
      { type: 'Street Gambling (87)', count: 1295 },
      { type: 'Women', count: 1294 },
      { type: 'Others', count: 1165 },
    ],
    crimeTypesData: [
      { name: 'State Highways', value: 4458 },
      { name: 'Other Roads', value: 2465 },
      { name: 'Gambling - Matka (78 Class C)', value: 1811 },
      { name: 'Karnataka Excise Act 1965', value: 1358 },
      { name: 'Simple Hurt', value: 1312 },
      { name: 'Street Gambling (87)', value: 1295 },
      { name: 'Women', value: 1294 },
      { name: 'Others', value: 1165 },
    ],
    crimeStatusData: [
      { name: 'Non Heinous', count: 297588 },
      { name: 'Heinous', count: 40026 },
    ],
  },
  'Davanagere': {
    crimeCounts: [
      { type: 'State Highways', count: 1305 },
      { type: 'Other Roads', count: 1067 },
      { type: 'Women', count: 943 },
      { type: 'Gambling - Matka (78 Class C)', count: 766 },
      { type: 'Simple Hurt', count: 711 },
      { type: 'Street Gambling (87)', count: 701 },
      { type: 'Of Automobiles - Of Two Wheelers', count: 578 },
      { type: 'National Highways', count: 530 },
    ],
    crimeTypesData: [
      { name: 'State Highways', value: 1305 },
      { name: 'Other Roads', value: 1067 },
      { name: 'Women', value: 943 },
      { name: 'Gambling - Matka (78 Class C)', value: 766 },
      { name: 'Simple Hurt', value: 711 },
      { name: 'Street Gambling (87)', value: 701 },
      { name: 'Of Automobiles - Of Two Wheelers', value: 578 },
      { name: 'National Highways', value: 530 },
    ],
    crimeStatusData: [
      { name: 'Non Heinous', count: 297588 },
      { name: 'Heinous', count: 40026 },
    ],
  },
  'Chikkamagaluru': {
    crimeCounts: [
      { type: 'Simple Hurt', count: 1405 },
      { type: 'Karnataka Excise Act 1965', count: 1077 },
      { type: 'Other Roads', count: 1022 },
      { type: 'National Highways', count: 990 },
      { type: 'State Highways', count: 889 },
      { type: 'Women', count: 635 },
      { type: 'Man', count: 358 },
      { type: 'Others', count: 336 },
    ],
    crimeTypesData: [
      { name: 'Simple Hurt', value: 1405 },
      { name: 'Karnataka Excise Act 1965', value: 1077 },
      { name: 'Other Roads', value: 1022 },
      { name: 'National Highways', value: 990 },
      { name: 'State Highways', value: 889 },
      { name: 'Women', value: 635 },
      { name: 'Man', value: 358 },
      { name: 'Others', value: 336 },
    ],
    crimeStatusData: [
      { name: 'Non Heinous', count: 297588 },
      { name: 'Heinous', count: 40026 },
    ],
  },
  'Hubballi Dharwad City': {
    crimeCounts: [
      { type: 'Information Technology Act 2000, 2009', count: 985 },
      { type: 'State Highways', count: 674 },
      { type: 'Simple Hurt', count: 630 },
      { type: 'Of Automobiles - Of Two Wheelers', count: 614 },
      { type: 'Other Roads', count: 573 },
      { type: 'Women', count: 561 },
      { type: 'Gambling - Matka (78 Class C)', count: 504 },
      { type: 'National Highways', count: 476 },
    ],
    crimeTypesData: [
      { name: 'Information Technology Act 2000, 2009', value: 985 },
      { name: 'State Highways', value: 674 },
      { name: 'Simple Hurt', value: 630 },
      { name: 'Of Automobiles - Of Two Wheelers', value: 614 },
      { name: 'Other Roads', value: 573 },
      { name: 'Women', value: 561 },
      { name: 'Gambling - Matka (78 Class C)', value: 504 },
      { name: 'National Highways', value: 476 },
    ],
    crimeStatusData: [
      { name: 'Non Heinous', count: 297588 },
      { name: 'Heinous', count: 40026 },
    ],
  },
  'Bidar': {
    crimeCounts: [
      { type: 'Of Automobiles - Of Two Wheelers', count: 2565 },
      { type: 'Simple Hurt', count: 1450 },
      { type: 'Other Roads', count: 1242 },
      { type: 'National Highways', count: 1222 },
      { type: 'Women', count: 1017 },
      { type: 'State Highways', count: 848 },
      { type: 'Man', count: 616 },
      { type: 'Others', count: 591 },
    ],
    crimeTypesData: [
      { name: 'Of Automobiles - Of Two Wheelers', value: 2565 },
      { name: 'Simple Hurt', value: 1450 },
      { name: 'Other Roads', value: 1242 },
      { name: 'National Highways', value: 1222 },
      { name: 'Women', value: 1017 },
      { name: 'State Highways', value: 848 },
      { name: 'Man', value: 616 },
      { name: 'Others', value: 591 },
    ],
    crimeStatusData: [
      { name: 'Non Heinous', count: 297588 },
      { name: 'Heinous', count: 40026 },
    ],
  },
  'Bagalkot': {
    crimeCounts: [
      { type: 'Simple Hurt', count: 2542 },
      { type: 'Karnataka Excise Act 1965', count: 1618 },
      { type: 'State Highways', count: 1363 },
      { type: 'Women', count: 1287 },
      { type: 'National Highways', count: 1153 },
      { type: 'Other Roads', count: 1106 },
      { type: 'Man', count: 705 },
      { type: 'Of Automobiles - Of Two Wheelers', count: 671 },
    ],
    crimeTypesData: [
      { name: 'Simple Hurt', value: 2542 },
      { name: 'Karnataka Excise Act 1965', value: 1618 },
      { name: 'State Highways', value: 1363 },
      { name: 'Women', value: 1287 },
      { name: 'National Highways', value: 1153 },
      { name: 'Other Roads', value: 1106 },
      { name: 'Man', value: 705 },
      { name: 'Of Automobiles - Of Two Wheelers', value: 671 },
    ],
    crimeStatusData: [
      { name: 'Non Heinous', count: 297588 },
      { name: 'Heinous', count: 40026 },
    ],
  },
  'Hassan': {
    crimeCounts: [
      { type: 'Simple Hurt', count: 1931 },
      { type: 'National Highways', count: 1295 },
      { type: 'Women', count: 1240 },
      { type: 'State Highways', count: 1147 },
      { type: 'Other Roads', count: 1140 },
      { type: 'Karnataka Excise Act 1965', count: 1106 },
      { type: 'Of Automobiles - Of Two Wheelers', count: 662 },
      { type: 'Others', count: 613 },
    ],
    crimeTypesData: [
      { name: 'Simple Hurt', value: 1931 },
      { name: 'National Highways', value: 1295 },
      { name: 'Women', value: 1240 },
      { name: 'State Highways', value: 1147 },
      { name: 'Other Roads', value: 1140 },
      { name: 'Karnataka Excise Act 1965', value: 1106 },
      { name: 'Of Automobiles - Of Two Wheelers', value: 662 },
      { name: 'Others', value: 613 },
    ],
    crimeStatusData: [
      { name: 'Non Heinous', count: 297588 },
      { name: 'Heinous', count: 40026 },
    ],
  },
  'Belagavi City': {
    crimeCounts: [
      { type: 'Simple Hurt', count: 1425 },
      { type: 'National Highways', count: 1400 },
      { type: 'Women', count: 1327 },
      { type: 'State Highways', count: 1285 },
      { type: 'Other Roads', count: 1207 },
      { type: 'Karnataka Excise Act 1965', count: 1136 },
      { type: 'Man', count: 961 },
      { type: 'Of Automobiles - Of Two Wheelers', count: 705 },
    ],
    crimeTypesData: [
      { name: 'Simple Hurt', value: 1425 },
      { name: 'National Highways', value: 1400 },
      { name: 'Women', value: 1327 },
      { name: 'State Highways', value: 1285 },
      { name: 'Other Roads', value: 1207 },
      { name: 'Karnataka Excise Act 1965', value: 1136 },
      { name: 'Man', value: 961 },
      { name: 'Of Automobiles - Of Two Wheelers', value: 705 },
    ],
    crimeStatusData: [
      { name: 'Non Heinous', count: 297588 },
      { name: 'Heinous', count: 40026 },
    ],
  },
};

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF19A3', '#19FF7A', '#FF1919'
];

const CrimeDashboard = () => {
  const [selectedCity, setSelectedCity] = useState('Bengaluru City');
  const cityCrimeData = crimeData[selectedCity];

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>Select City</InputLabel>
        <Select value={selectedCity} onChange={handleCityChange}>
          {cities.map((city) => (
            <MenuItem key={city} value={city}>{city}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="h4" component="h1" gutterBottom>
        Crime Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Crime Type Distribution</Typography>
              <PieChart width={300} height={300}>
                <Pie data={cityCrimeData.crimeTypesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                  {cityCrimeData.crimeTypesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Crime Counts by Type</Typography>
              <BarChart width={300} height={300} data={cityCrimeData.crimeCounts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Crime Status</Typography>
              <BarChart width={300} height={300} data={cityCrimeData.crimeStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <HeatmapCard />
    </div>
  );
};

export default CrimeDashboard;
