import React, { useState } from 'react';
import { Grid, Typography, Box, Card, CardContent, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import SalesOverview from '../dashboard/components/SalesOverview';
import Joyride from 'react-joyride';

const cardContents = [
  { title: 'Complaints Received', text: '100000' },
  { title: 'Issues Resolved', text: '15000' },
  { title: 'Issues Unsolved', text: '25000' },
  { title: 'Feedbacks Recieved', text: '100000' },
  // { title: 'Card 5', text: 'This is the content of card 5' },
  // { title: 'Card 6', text: 'This is the content of card 6' },
  // { title: 'Card 7', text: 'This is the content of card 7' },
  // { title: 'Card 8', text: 'This is the content of card 8' },
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

  // Sample posts data
  const posts = [
    { id: 1, title: 'Post 1', content: 'Content of post 1' },
    { id: 2, title: 'Post 2', content: 'Content of post 2' },
    { id: 3, title: 'Post 3', content: 'Content of post 3' },
    { id: 4, title: 'Post 4', content: 'Content of post 4' },
    { id: 5, title: 'Post 5', content: 'Content of post 5' },
    { id: 6, title: 'Post 6', content: 'Content of post 6' },
    { id: 7, title: 'Post 7', content: 'Content of post 7' },
    { id: 8, title: 'Post 8', content: 'Content of post 8' },
    { id: 9, title: 'Post 9', content: 'Content of post 9' },
    { id: 10, title: 'Post 10', content: 'Content of post 10' },
  ];

  // Sample crime data for empty cards
  const crimeData = [
    { district: 'District A', crime: 'Burglary', count: 150 },
    { district: 'District B', crime: 'Assault', count: 100 },
    { district: 'District A', crime: 'Robbery', count: 80 },
    { district: 'District C', crime: 'Vandalism', count: 50 },
    { district: 'District B', crime: 'Fraud', count: 30 },
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
                    height: emptyCardHeight,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Reports Statistics
                    </Typography>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>District</TableCell>
                          <TableCell>Crime Type</TableCell>
                          <TableCell>Count</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {crimeData.map((crime, index) => (
                          <TableRow key={index}>
                            <TableCell>{crime.district}</TableCell>
                            <TableCell>{crime.crime}</TableCell>
                            <TableCell>{crime.count}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} className="tour-alerts">
                <Card
                  sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    height: '120%',
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
        <Card
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            width: '100%', // Cover the entire width of the screen
            height: '150%',
          }}
        >
          <CardContent style={{ display: 'flex' }}>
            {posts.map(post => (
              <Card key={post.id} sx={{ flex: '0 0 auto', minWidth: '300px', marginRight: '16px' }}>
                <CardContent>
                  <Typography variant="subtitle1">{post.title}</Typography>
                  <Typography variant="body2">{post.content}</Typography>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
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

