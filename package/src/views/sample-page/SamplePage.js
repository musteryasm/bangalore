import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Card, CardContent, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import SalesOverview from '../dashboard/components/SalesOverview';
import Joyride from 'react-joyride';

const cardContents = [
  { title: 'Complaints Received', text: '853' },
  { title: 'Issues Resolved', text: '150' },
  { title: 'Issues Unsolved', text: '250' },
  { title: 'Feedbacks Received', text: '102' },
];

const emptyCardHeight = 330; // Set the height to match the expected height of the YearlyBreakup and MonthlyEarnings components

const SamplePage = () => {
  const [open, setOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertDescription, setAlertDescription] = useState('');
  const [alertDateFrom, setAlertDateFrom] = useState('');
  const [alertDateTo, setAlertDateTo] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [runTour, setRunTour] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://ksp-dev.ap-south-1.elasticbeanstalk.com/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    setAlerts([...alerts, { title: alertTitle, description: alertDescription, dateFrom: alertDateFrom, dateTo: alertDateTo }]);
    setAlertTitle('');
    setAlertDescription('');
    setAlertDateFrom('');
    setAlertDateTo('');
    handleClose();
  };

  const steps = [
    {
      target: '.tour-cards',
      content: 'These are the main cards for providing information.',
    },
    {
      target: '.tour-sales-overview',
      content: 'This section shows the trend of complaints received.',
    },
    {
      target: '.tour-reports-statistics',
      content: 'This table displays the statistics of the complaints.',
    },
    {
      target: '.tour-alerts',
      content: 'This section is for managing alerts.',
    },
    {
      target: '.tour-posts',
      content: 'These are the recent community posts.',
    },
    {
      target: '.tour-add-alert-button',
      content: 'Click here to add a new alert.',
    },
  ];

  const crimeCategories = [
    { category: 'Theft', count: 120 },
    { category: 'Assault', count: 80 },
    { category: 'Vandalism', count: 60 },
    { category: 'Fraud', count: 45 },
    { category: 'Burglary', count: 30 },
  ];

  return (
    <PageContainer title="Sample Page" description="This is a sample page">
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
      <Box mb={4} className="tour-cards">
        <Grid container spacing={3}>
          {cardContents.map((content, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {content.title}
                  </Typography>
                  <Typography>
                    {content.text}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8} className="tour-sales-overview">
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} className="tour-reports-statistics">
                <Card
                  sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    height: '100%', // Fill the entire height of the parent grid item
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Reports Statistics
                    </Typography>
                    {crimeCategories.map((category, index) => (
                      <Typography key={index} variant="body2" sx={{ marginBottom: 1 }}>
                        {category.category}: {category.count}
                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} className="tour-alerts">
                <Card
                  sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    height: '100%', // Adjust height as needed
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Alerts
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleOpen}
                      className="tour-add-alert-button"
                    >
                      Add Alert
                    </Button>
                    <Box mt={2}>
                      {alerts.map((alert, index) => (
                        <Typography key={index} variant="body1">
                          {alert.title}
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box mt={4} className="tour-posts">
        <Grid container spacing={3}>
          {posts.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <img src={post.image} alt={post.description} style={{ objectFit: 'cover', height: 200 }} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6">
                    {post.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Created At: {new Date(post.created_at).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button variant="contained" color="primary" onClick={() => setRunTour(true)}>
          Start Tour
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Alert</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details for the new alert.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={alertTitle}
            onChange={(e) => setAlertTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={alertDescription}
            onChange={(e) => setAlertDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Date From"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={alertDateFrom}
            onChange={(e) => setAlertDateFrom(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Date To"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={alertDateTo}
            onChange={(e) => setAlertDateTo(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default SamplePage;
