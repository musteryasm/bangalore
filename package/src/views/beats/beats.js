import React, { useState } from 'react';
import { Grid,Box, Typography, Card, CardContent, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { BarChart, Bar, PieChart, Pie, Tooltip, Legend, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import PageContainer from 'src/components/container/PageContainer';
import BlankCard from 'src/components/shared/BlankCard';
import Joyride from 'react-joyride';

// Mock data for beats
const beats = ['Beat 1', 'Beat 2', 'Beat 3', 'Beat 4'];

// Mock data for beat performance
const beatPerformanceData = {
  'Beat 1': {
    deploymentMap: 'Map image URL for Beat 1',
    aiRecommendations: 'AI recommendations text for Beat 1',
    performance: [
      { month: 'Jan', crimes: 30 },
      { month: 'Feb', crimes: 25 },
      { month: 'Mar', crimes: 28 },
      // Add more data as needed
    ],
    areasPatrolled: [
      { name: 'Residential', value: 30 },
      { name: 'Commercial', value: 20 },
      { name: 'Industrial', value: 10 },
      { name: 'Public Spaces', value: 15 },
      { name: 'Other', value: 25 },
    ],
  },
  // Add data for other beats
};

const BeatsPage = () => {
  const [selectedBeat, setSelectedBeat] = useState(beats[0]);
  const [runTour, setRunTour] = useState(false);
  const currentData = beatPerformanceData[selectedBeat];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  const tourSteps = [
    {
      target: '#beat-select',
      content: 'Select a beat from this dropdown.',
    },
    {
      target: '#beat-deployment',
      content: 'This section shows the beat deployment map.',
    },
    {
      target: '#ai-recommendations',
      content: 'Here are the AI recommendations for this beat.',
    },
    {
      target: '#areas-patrolled',
      content: 'This pie chart shows the areas patrolled.',
    },
    {
      target: '#beat-performance',
      content: 'This bar chart shows the beat performance over months.',
    },
  ];

  return (
    <PageContainer title="Beat Management" description="Manage and monitor beats">
      <Joyride steps={tourSteps} run={runTour} continuous showSkipButton />
      <Card>
        <CardContent>
          <Grid container spacing={3}>
           
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="beat-select-label">Beat</InputLabel>
                <Select
                  labelId="beat-select-label"
                  id="beat-select"
                  value={selectedBeat}
                  onChange={(e) => setSelectedBeat(e.target.value)}
                >
                  {beats.map((beat) => (
                    <MenuItem key={beat} value={beat}>
                      {beat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Card id="beat-deployment">
                <CardContent>
                  <Typography variant="h5" gutterBottom>Beat Deployment</Typography>
                  <BlankCard>
                    <CardContent>
                      <img src={currentData.deploymentMap} alt="Deployment Map" style={{ width: '100%', height: 'auto' }} />
                    </CardContent>
                  </BlankCard>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card id="ai-recommendations">
                <CardContent>
                  <Typography variant="h5" gutterBottom>AI Recommendations</Typography>
                  <BlankCard>
                    <CardContent>
                      <Typography variant="body1">
                        {currentData.aiRecommendations}
                      </Typography>
                    </CardContent>
                  </BlankCard>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card id="areas-patrolled">
                    <CardContent>
                      <Typography variant="h5" gutterBottom>Areas Patrolled</Typography>
                      <BlankCard>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                              <Pie
                                data={currentData.areasPatrolled}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label
                              >
                                {currentData.areasPatrolled.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </BlankCard>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card id="beat-performance">
                    <CardContent>
                      <Typography variant="h5" gutterBottom>Beat Performance</Typography>
                      <BlankCard>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={currentData.performance}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="crimes" fill="#8884d8" />
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </BlankCard>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        
      </Card>
      <Grid item xs={12}>
  <Box display="flex" justifyContent="center" alignItems="center" height="100%">
    <Button variant="contained" color="primary" onClick={() => setRunTour(true)}>
      Start Tour
    </Button>
  </Box>
</Grid>

    </PageContainer>
  );
};

export default BeatsPage;
