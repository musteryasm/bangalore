import React, { useState } from 'react';
import { Card, CardContent, Box, Grid, Typography, Button, ButtonGroup } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Officers from './components/Officers';  // Adjust the import paths as necessary
import Units from './components/Units';
import Locations from './components/Location';
import Performance from './components/Performance';
import Crime from './components/Crime';
import Joyride from 'react-joyride';

const SamplePage = () => {
  const [selectedToggle, setSelectedToggle] = useState('Officers');
  const [runTour, setRunTour] = useState(false);

  const handleToggleChange = (toggle) => {
    setSelectedToggle(toggle);
  };

  const renderComponent = () => {
    switch (selectedToggle) {
      case 'Resources':
        return <Officers />;
      case 'Locations':
        return <Locations />;
      case 'Performance':
        return <Performance />;
      case 'Crime':
        return <Crime />;
      default:
        return <Typography variant="body1">Please select an option.</Typography>;
    }
  };

  const steps = [
    {
      target: '.tour-dashboard',
      content: 'This is the dashboard where you can see the overall performance.',
    },
    {
      target: '.tour-button-group',
      content: 'Use these buttons to toggle between different sections.',
    },
    {
      target: '.tour-resources',
      content: 'This section shows the unit and personnel performance.',
    },
    {
      target: '.tour-locations',
      content: 'This section shows most vulnerable locations and their statistics.',
    },
    {
      target: '.tour-performance',
      content: 'This section shows the performance metrics.',
    },
    {
      target: '.tour-crime',
      content: 'This section shows the crime statistics.',
    },
  ];

  return (
    <PageContainer title="Key Performance Indicators" description="Statistics">
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
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={22} md={25}>
          <Card
            className="tour-dashboard"
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              padding: 4,
            }}
          >
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Dashboard
              </Typography>
              <Box display="flex" justifyContent="center" mb={3}>
                <ButtonGroup className="tour-button-group" variant="contained" aria-label="outlined primary button group">
                  {['Resources', 'Locations', 'Performance', 'Crime'].map((toggle) => (
                    <Button
                      key={toggle}
                      className={`tour-${toggle.toLowerCase()}`}
                      color={selectedToggle === toggle ? 'primary' : 'secondary'}
                      onClick={() => handleToggleChange(toggle)}
                    >
                      {toggle}
                    </Button>
                  ))}
                </ButtonGroup>
              </Box>
              <Box mt={12}>
                {renderComponent()}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button variant="contained" color="primary" onClick={() => setRunTour(true)}>
          Start Tour
        </Button>
      </Box>
    </PageContainer>
  );
};

export default SamplePage;
