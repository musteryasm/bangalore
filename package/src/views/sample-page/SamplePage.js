import React, { useState } from 'react';
import { Grid, Typography, Box, Card, CardContent, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import SalesOverview from '../dashboard/components/SalesOverview';

const cardContents = [
  { title: 'Card 1', text: 'This is the content of card 1' },
  { title: 'Card 2', text: 'This is the content of card 2' },
  { title: 'Card 3', text: 'This is the content of card 3' },
  { title: 'Card 4', text: 'This is the content of card 4' },
  { title: 'Card 5', text: 'This is the content of card 5' },
  { title: 'Card 6', text: 'This is the content of card 6' },
  { title: 'Card 7', text: 'This is the content of card 7' },
  { title: 'Card 8', text: 'This is the content of card 8' },
];

const emptyCardHeight = 230; // Set the height to match the expected height of the YearlyBreakup and MonthlyEarnings components

const SamplePage = () => {
  const [open, setOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertDescription, setAlertDescription] = useState('');
  const [alertDateFrom, setAlertDateFrom] = useState('');
  const [alertDateTo, setAlertDateTo] = useState('');
  const [alerts, setAlerts] = useState([]);

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

  return (
    <PageContainer title="Sample Page" description="This is a sample page">
      <Box mb={4}>
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
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card
                  sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    height: emptyCardHeight,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Empty Card
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card
                  sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    height: emptyCardHeight,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Alerts
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleOpen}>
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
