import React from 'react';
import { Typography, Grid, Card, CardContent, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for typography cards
const ioCount = 453;
const unitCount = 287;
const ioOnDuty = 320;
const activeUnits = 220;

// Mock data for top 5 IO officers and units
const topOfficers = [
  { id: 1, name: 'Anand H Bhagwati', casesSolved: 50, responseTime: 13 },
  { id: 2, name: 'Sanjeev Baligar', casesSolved: 45, responseTime: 12 },
  { id: 3, name: 'Girish Balakrishnan', casesSolved: 40, responseTime: 10 },
  { id: 4, name: 'Nagarjuna Chaitanya', casesSolved: 35, responseTime: 11 },
  { id: 5, name: 'Y H Walikar', casesSolved: 30, responseTime: 12 },
];

const topUnits = [
  { id: 1, name: 'Unit A', casesSolved: 100, responseTime: 7 },
  { id: 2, name: 'Unit B', casesSolved: 95, responseTime: 8 },
  { id: 3, name: 'Unit C', casesSolved: 90, responseTime: 9 },
  { id: 4, name: 'Unit D', casesSolved: 85, responseTime: 10 },
  { id: 5, name: 'Unit E', casesSolved: 80, responseTime: 11 },
];

// Mock data for least performing IO officers and units
const leastPerformingOfficers = [
  { id: 1, name: 'Malika Arjan', casesSolved: 10, responseTime: 20 },
  { id: 2, name: 'Laxmi Kaant', casesSolved: 12, responseTime: 18 },
  { id: 3, name: 'Sumannath Swamy', casesSolved: 15, responseTime: 17 },
  { id: 4, name: 'Ramakrishnan Iyer', casesSolved: 18, responseTime: 16 },
  { id: 5, name: 'Chandrashekhar Suman', casesSolved: 20, responseTime: 15 },
];

const leastPerformingUnits = [
  { id: 1, name: 'Unit F', casesSolved: 50, responseTime: 18 },
  { id: 2, name: 'Unit G', casesSolved: 55, responseTime: 17 },
  { id: 3, name: 'Unit H', casesSolved: 60, responseTime: 16 },
  { id: 4, name: 'Unit I', casesSolved: 65, responseTime: 15 },
  { id: 5, name: 'Unit J', casesSolved: 70, responseTime: 14 },
];

// Mock data for response time of all units
const responseTimeData = [
  { unit: 'Unit A', responseTime: 7 },
  { unit: 'Unit B', responseTime: 8 },
  { unit: 'Unit C', responseTime: 9 },
  { unit: 'Unit D', responseTime: 10 },
  { unit: 'Unit E', responseTime: 11 },
  { unit: 'Unit F', responseTime: 12 },
  { unit: 'Unit G', responseTime: 13 },
  { unit: 'Unit H', responseTime: 14 },
  { unit: 'Unit I', responseTime: 15 },
  { unit: 'Unit J', responseTime: 16 },
  { unit: 'Unit K', responseTime: 12 },
  { unit: 'Unit L', responseTime: 7 },
  { unit: 'Unit M', responseTime: 19 },
  { unit: 'Unit N', responseTime: 12 },
  { unit: 'Unit O', responseTime: 13 },
  { unit: 'Unit P', responseTime: 17 },
  { unit: 'Unit Q', responseTime: 10 },
  { unit: 'Unit R', responseTime: 12 },
  { unit: 'Unit S', responseTime: 15 },
  { unit: 'Unit T', responseTime: 9 },
  { unit: 'Unit U', responseTime: 12 },
  { unit: 'Unit V', responseTime: 19 },
  { unit: 'Unit W', responseTime: 11 },
  { unit: 'Unit X', responseTime: 19 },
  { unit: 'Unit Y', responseTime: 12 },
  { unit: 'Unit Z', responseTime: 16 },
];


// Mock data for cases solved by IO officers
const casesSolvedData = [
  { officer: 'John Doe', casesSolved: 50 },
  { officer: 'Jane Smith', casesSolved: 45 },
  { officer: 'Michael Brown', casesSolved: 40 },
  { officer: 'Emily Johnson', casesSolved: 35 },
  { officer: 'David Lee', casesSolved: 30 },
];

const Officers = () => {
  const [selectedDistrict, setSelectedDistrict] = React.useState('');

  const handleChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">IO Count</Typography>
                <Typography variant="h4">{ioCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Unit Count</Typography>
                <Typography variant="h4">{unitCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">IO on Duty</Typography>
                <Typography variant="h4">{ioOnDuty}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Active Units</Typography>
                <Typography variant="h4">{activeUnits}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Top 5 IO Officers Table */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Top 5 IO Officers
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Cases Solved</TableCell>
                    <TableCell>Response Time (hrs)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topOfficers.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.casesSolved}</TableCell>
                      <TableCell>{row.responseTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Top 5 Units Table */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Top 5 Units
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Cases Solved</TableCell>
                    <TableCell>Response Time (hrs)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topUnits.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.casesSolved}</TableCell>
                      <TableCell>{row.responseTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Least Performing IO Officers Table */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Least Performing IO Officers
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Cases Solved</TableCell>
                    <TableCell>Response Time (hrs)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leastPerformingOfficers.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.casesSolved}</TableCell>
                      <TableCell>{row.responseTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Least Performing Units Table */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Least Performing IO Units
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Cases Solved</TableCell>
                    <TableCell>Response Time (hrs)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leastPerformingUnits.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.casesSolved}</TableCell>
                      <TableCell>{row.responseTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Bar Chart: Response Time of All Units */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Response Time of All Units
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="unit" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="responseTime" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Bar Chart: Cases Solved by IO Officers */}
      {/* <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Cases Solved by IO Officers
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={casesSolvedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="officer" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="casesSolved" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid> */}
    </Grid>
  );
};

export default Officers;

