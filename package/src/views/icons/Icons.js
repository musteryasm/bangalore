import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Card, CardContent, Grid, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import Joyride from 'react-joyride'; // Import Joyride

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Icons = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [gender, setGender] = useState('Men');
  const [offenderGender, setOffenderGender] = useState('Men');
  const [runTour, setRunTour] = useState(false); // State to control tour

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleOffenderGenderChange = (event) => {
    setOffenderGender(event.target.value);
  };

  const victimBarData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: `Crimes Reported (${gender})`,
        data: gender === 'Men' ? [65, 59, 80, 81, 56, 55, 40] : [45, 49, 60, 71, 36, 45, 30],
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const offenderBarData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: `Crimes Committed (${offenderGender})`,
        data: offenderGender === 'Men' ? [75, 69, 90, 91, 66, 65, 50] : [55, 59, 70, 81, 46, 55, 40],
        backgroundColor: 'rgba(153,102,255,0.4)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
      },
    ],
  };

  const victimPieData = {
    labels: ['Robbery', 'Assault', 'Theft', 'Burglary'],
    datasets: [
      {
        data: [300, 50, 100, 60],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const offenderPieData = {
    labels: ['Robbery', 'Assault', 'Theft', 'Burglary'],
    datasets: [
      {
        data: [200, 80, 120, 90],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const steps = [
    {
      target: '.tour-tabs', // CSS selector for Tabs component
      content: 'Welcome to the Demographics tour! Click Next to get started.',
    },
    {
      target: '.tour-victim-bar-chart', // CSS selector for Victim Bar Chart component
      content: 'This chart displays Crimes Reported by gender. You can select different genders using the dropdown.',
    },
    {
      target: '.tour-victim-pie-chart', // CSS selector for Victim Pie Chart component
      content: 'The Pie Chart shows a breakdown of crime types for victims.',
    },
    {
      target: '.tour-choropleth-map', // CSS selector for Choropleth Map component
      content: 'Explore geographical distribution using the Choropleth Map (placeholder).',
    },
    {
      target: '.tour-offender-bar-chart', // CSS selector for Offender Bar Chart component
      content: 'Switch to Offender tab to view Crimes Committed by gender.',
    },
    {
      target: '.tour-offender-pie-chart', // CSS selector for Offender Pie Chart component
      content: 'The Pie Chart shows a breakdown of crime types for offenders.',
    },
  ];

  const handleStartTour = () => {
    setRunTour(true); // Start the tour
  };

  return (
    <PageContainer title="Demographics" description="This is Demographics">
      <Joyride
        steps={steps}
        run={runTour}
        continuous={true}
        showSkipButton={true}
        showProgress={true}
        styles={{
          options: {
            zIndex: 10000, // Ensure Joyride appears above other elements
          },
        }}
      />
      <DashboardCard title="Demographics">
        <Card sx={{ mb: 4, boxShadow: 3 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="demographics tabs" className="tour-tabs">
              <Tab label="Victim" />
              <Tab label="Offender" />
            </Tabs>
          </Box>
        </Card>
        <Box sx={{ p: 3 }}>
          {activeTab === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>Victim Demographics</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ boxShadow: 3, height: '100%' }} className="tour-victim-bar-chart">
                    <CardContent>
                      <FormControl fullWidth>
                        <InputLabel id="gender-select-label">Gender</InputLabel>
                        <Select
                          labelId="gender-select-label"
                          id="gender-select"
                          value={gender}
                          label="Gender"
                          onChange={handleGenderChange}
                        >
                          <MenuItem value="Men">Men</MenuItem>
                          <MenuItem value="Women">Women</MenuItem>
                        </Select>
                      </FormControl>
                      <Bar data={victimBarData} />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card sx={{ boxShadow: 3, height: '100%' }} className="tour-victim-pie-chart">
                    <CardContent>
                      <Typography variant="h6">Pie Chart</Typography>
                      <Pie data={victimPieData} />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} className="tour-choropleth-map">
                  <Card sx={{ boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h6">Choropleth Map</Typography>
                      <Box sx={{ height: 300, backgroundColor: '#e0e0e0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="body1">Choropleth Map Placeholder</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>Offender Demographics</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ boxShadow: 3, height: '100%' }} className="tour-offender-bar-chart">
                    <CardContent>
                      <FormControl fullWidth>
                        <InputLabel id="offender-gender-select-label">Gender</InputLabel>
                        <Select
                          labelId="offender-gender-select-label"
                          id="offender-gender-select"
                          value={offenderGender}
                          label="Gender"
                          onChange={handleOffenderGenderChange}
                        >
                          <MenuItem value="Men">Men</MenuItem>
                          <MenuItem value="Women">Women</MenuItem>
                        </Select>
                      </FormControl>
                      <Bar data={offenderBarData} />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card sx={{ boxShadow: 3, height: '100%' }} className="tour-offender-pie-chart">
                    <CardContent>
                      <Typography variant="h6">Pie Chart</Typography>
                      <Pie data={offenderPieData} />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} className="tour-choropleth-map">
                  <Card sx={{ boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h6">Choropleth Map</Typography>
                      <Box sx={{ height: 300, backgroundColor: '#e0e0e0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="body1">Choropleth Map Placeholder</Typography>
                        </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </DashboardCard>

      {/* Button to start the tour */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button variant="contained" color="primary" onClick={handleStartTour}>
          Start Tour
        </Button>
      </Box>
    </PageContainer>
  );
};

export default Icons;

