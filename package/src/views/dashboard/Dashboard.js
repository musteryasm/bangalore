import React, { useState, useEffect } from 'react';
import { Grid, Box, Tab, Tabs, Button, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Joyride from 'react-joyride';
import DashboardCard from '../../components/shared/DashboardCard';
import YearlyBreakup from './components/YearlyBreakup';
import CrimeTrendChart from './components/CrimeTrendChart';
import CrimeStatsDashboard from './components/CrimeStats';
import CombinedCrimeDashboard from './components/crime';
import FirCard from './components/FIR';

const Dashboard = () => {
  const [value, setValue] = useState(0);
  const [runTour, setRunTour] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null); // State to store feedback data

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Function to fetch feedback data from API
  const fetchFeedbackData = () => {
    fetch('http://ksp-dev.ap-south-1.elasticbeanstalk.com/police_station_ratings')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched feedback data:', data); // Log fetched data for debugging
        setFeedbackData(data);
      })
      .catch(error => console.error('Error fetching feedback data:', error));
  };

  useEffect(() => {
    fetchFeedbackData(); // Fetch data on component mount
  }, []);

  const steps = [
    {
      target: '.tour-tabs',
      content: 'These are the main sections of the dashboard.',
    },
    {
      target: '.tour-trends',
      content: 'This section shows various crime statistics and trends.',
    },
    {
      target: '.tour-crimes',
      content: 'This section provides detailed crime dashboards.',
    },
    {
      target: '.tour-reporting',
      content: 'This section is for reporting.',
    },
    {
      target: '.tour-crime-stats-dashboard',
      content: 'These are the Statistics for every division.',
    },
    {
      target: '.tour-crime-trend-chart',
      content: 'This chart shows the crime trends over time.',
    },
    {
      target: '.tour-yearly-breakup',
      content: 'This section gives us statistical insights for various crimes.',
    },
  ];

  return (
    <PageContainer title="Dashboard" description="Karnataka State Police Datathon">
      <Joyride
        steps={steps}
        run={runTour}
        continuous
        showSkipButton
        showProgress
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="dashboard tabs"
          className="tour-tabs"
          variant="scrollable" // Ensures tabs are scrollable on smaller screens
          scrollButtons="auto" // Automatically shows scroll buttons when necessary
        >
          <Tab label="Trends" />
          <Tab label="Crimes" />
          <Tab label="Reporting" />
        </Tabs>

        {value === 0 && (
          <Grid container spacing={3} className="tour-trends">
            <Grid item xs={12} lg={8} className="tour-crime-stats-dashboard">
              <CrimeStatsDashboard />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Grid container spacing={3}>
                <Grid item xs={12} className="tour-yearly-breakup">
                  <YearlyBreakup />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={9} className="tour-crime-trend-chart">
              <CrimeTrendChart />
            </Grid>
            <Grid item xs={12} lg={3}>
              {feedbackData && (
                <DashboardCard title="Feedback Received" style={{ marginTop: '20px' }}>
                  <Box style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '100%', padding: '20px' }}>
                    <div>
                      {feedbackData.map((item, index) => (
                        <div key={index}>
                          <Typography variant="body1">Branch Name: {item.branch_name}</Typography>
                          <Typography variant="body1">Feedback: {item.feedback}</Typography>
                          <Typography variant="body1">Rating: {item.rating}/5</Typography>
                          {index < feedbackData.length - 1 && <Box mt={2} mb={2} borderBottom={1} />}
                        </div>
                      ))}
                    </div>
                  </Box>
                </DashboardCard>
              )}
            </Grid>
          </Grid>
        )}

        {value === 1 && (
          <Grid container spacing={3} className="tour-crimes">
            <CombinedCrimeDashboard />
          </Grid>
        )}

        {value === 2 && (
          <FirCard className="tour-reporting" />
        )}
      </Box>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button variant="contained" color="primary" onClick={() => setRunTour(true)}>
          Start Tour
        </Button>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
