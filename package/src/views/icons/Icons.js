import React, { useState, useEffect } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import Joyride from 'react-joyride'; // Import Joyride
import axios from 'axios'; // Import Axios for HTTP requests
import MapComponent from './map1';
import MapComponent1 from './map2';
// Register chart elements with ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Icons = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [gender, setGender] = useState('Men');
  const [offenderGender, setOffenderGender] = useState('Men');
  const [runTour, setRunTour] = useState(false); // State to control tour
  const [victimYearStats, setVictimYearStats] = useState([]);
  const [victimYearMonthStats, setVictimYearMonthStats] = useState({});
  const [victimTopProfessions, setVictimTopProfessions] = useState([]);
  const [victimTopCastes, setVictimTopCastes] = useState([]);
  const [accusedGenderStats, setAccusedGenderStats] = useState([]);
  const [accusedYearStats, setAccusedYearStats] = useState([]);
  const [accusedYearMonthStats, setAccusedYearMonthStats] = useState({});
  const [accusedTopDistricts, setAccusedTopDistricts] = useState([]);
  const [accusedTopNationalities, setAccusedTopNationalities] = useState([]);
  const [accusedTopProfessions, setAccusedTopProfessions] = useState([]);

  useEffect(() => {
    fetchVictimStats();
    fetchAccusedStats();
  }, []);

  const fetchVictimStats = async () => {
    try {
      const response = await axios.get(
        'http://ksp-dev.ap-south-1.elasticbeanstalk.com/victim/stats/'
      );
      const data = response.data;
      setVictimYearStats(data.year_wise);
      setVictimYearMonthStats(data.year_month_wise);
      setVictimTopProfessions(data.top_10_professions);
      setVictimTopCastes(data.top_15_castes);
    } catch (error) {
      console.error('Error fetching victim stats:', error);
    }
  };

  const fetchAccusedStats = async () => {
    try {
      const response = await axios.get(
        'http://ksp-dev.ap-south-1.elasticbeanstalk.com/accused/stats/'
      );
      const data = response.data;
      setAccusedGenderStats(data.gender_wise_split);
      setAccusedYearStats(data.year_wise);
      setAccusedYearMonthStats(data.year_month_wise);
      setAccusedTopDistricts(data.top_10_districts);
      setAccusedTopNationalities(data.top_10_foreign_nationalities);
      setAccusedTopProfessions(data.top_10_professions);
    } catch (error) {
      console.error('Error fetching accused stats:', error);
    }
  };

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
    labels: Object.keys(victimYearMonthStats),
    datasets: [
      {
        label: `Crimes Reported (${gender})`,
        data: gender === 'Men' ? Object.values(victimYearMonthStats) : Array(Object.keys(victimYearMonthStats).length).fill(0),
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const offenderBarData = {
    labels: Object.keys(accusedYearMonthStats),
    datasets: [
      {
        label: `Crimes Committed (${offenderGender})`,
        data: offenderGender === 'Men' ? Object.values(accusedYearMonthStats) : Array(Object.keys(accusedYearMonthStats).length).fill(0),
        backgroundColor: 'rgba(153,102,255,0.4)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
      },
    ],
  };

  const victimPieData = {
    labels: victimTopProfessions.map((item) => item.Profession),
    datasets: [
      {
        data: victimTopProfessions.map((item) => item.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF8C00', '#7CFC00', '#BA55D3', '#5F9EA0', '#DAA520', '#CD5C5C'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF8C00', '#7CFC00', '#BA55D3', '#5F9EA0', '#DAA520', '#CD5C5C'],
      },
    ],
  };

  const offenderPieData = {
    labels: accusedTopProfessions.map((item) => item.Profession),
    datasets: [
      {
        data: accusedTopProfessions.map((item) => item.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF8C00', '#7CFC00', '#BA55D3', '#5F9EA0', '#DAA520', '#CD5C5C'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF8C00', '#7CFC00', '#BA55D3', '#5F9EA0', '#DAA520', '#CD5C5C'],
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
                      <Typography variant="h6">Top Professions of Victims</Typography>
                      <Pie data={victimPieData} />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Card sx={{ boxShadow: 3, height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6">Top Castes of Victims</Typography>
                      <ul>
  {victimTopCastes.slice(0, 5).map((item, index) => (
    <li key={index}>
      {item.Caste}: {item.count}
    </li>
  ))}
</ul>

                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} className="tour-choropleth-map">
                  <Card sx={{ boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h6">Choropleth Map</Typography>
                      <MapComponent />
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
                      <Typography variant="h6">Top Professions of Offenders</Typography>
                      <Pie data={offenderPieData} />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Card sx={{ boxShadow: 3, height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6">Top Districts of Offenders</Typography>
                      <ul>
                        {accusedTopDistricts.map((item, index) => (
                          <li key={index}>
                            {item.District}: {item.count}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} className="tour-choropleth-map">
                  <Card sx={{ boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h6">Choropleth Map</Typography>
                      <MapComponent1 />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </DashboardCard>
      <Button onClick={handleStartTour} variant="contained" color="primary" sx={{ mt: 2 }}>
        Start Tour
      </Button>
    </PageContainer>
  );
};

export default Icons;
