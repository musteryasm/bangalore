import React, { useState } from 'react';
import { Grid, Typography, Card, CardContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

// Mock data for districts
const districts = ['District 1', 'District 2', 'District 3'];

// Mock data for crimes per district
const crimeData = {
  'District 1': {
    crimeCounts: [
      { type: 'Theft', count: 120 },
      { type: 'Assault', count: 80 },
      { type: 'Burglary', count: 50 },
      { type: 'Vandalism', count: 30 },
    ],
    crimeTypesData: [
      { name: 'Theft', value: 120 },
      { name: 'Assault', value: 80 },
      { name: 'Burglary', value: 50 },
      { name: 'Vandalism', value: 30 },
    ],
    crimeStatusData: [
      { name: 'Resolved', count: 150 },
      { name: 'Unresolved', count: 80 },
      { name: 'Under Investigation', count: 50 },
    ],
  },
  'District 2': {
    crimeCounts: [
      { type: 'Theft', count: 100 },
      { type: 'Assault', count: 90 },
      { type: 'Burglary', count: 60 },
      { type: 'Vandalism', count: 40 },
    ],
    crimeTypesData: [
      { name: 'Theft', value: 100 },
      { name: 'Assault', value: 90 },
      { name: 'Burglary', value: 60 },
      { name: 'Vandalism', value: 40 },
    ],
    crimeStatusData: [
      { name: 'Resolved', count: 160 },
      { name: 'Unresolved', count: 70 },
      { name: 'Under Investigation', count: 60 },
    ],
  },
  'District 3': {
    crimeCounts: [
      { type: 'Theft', count: 130 },
      { type: 'Assault', count: 70 },
      { type: 'Burglary', count: 40 },
      { type: 'Vandalism', count: 20 },
    ],
    crimeTypesData: [
      { name: 'Theft', value: 130 },
      { name: 'Assault', value: 70 },
      { name: 'Burglary', value: 40 },
      { name: 'Vandalism', value: 20 },
    ],
    crimeStatusData: [
      { name: 'Resolved', count: 140 },
      { name: 'Unresolved', count: 90 },
      { name: 'Under Investigation', count: 40 },
    ],
  },
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Crime = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);
  const currentData = crimeData[selectedDistrict];

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

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Crime Heatmap
            </Typography>
            {/* Placeholder for heatmap */}
            <div style={{ width: '100%', height: '300px', backgroundColor: '#e0e0e0' }}>
              {/* Integrate your heatmap here */}
              Heatmap Placeholder
            </div>
          </CardContent>
        </Card>
      </Grid>

      {currentData.crimeCounts.map((crime) => (
        <Grid item xs={12} sm={6} md={3} key={crime.type}>
          <Card>
            <CardContent>
              <Typography variant="h6">{crime.type}</Typography>
              <Typography variant="h4">{crime.count}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Crime Types Distribution</Typography>
            <PieChart width={500} height={400}>
              <Pie
                data={currentData.crimeTypesData}
                cx={200}
                cy={200}
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {currentData.crimeTypesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Crime Resolution Status</Typography>
            <BarChart
              width={500}
              height={400}
              data={currentData.crimeStatusData}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
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
  );
};

export default Crime;
