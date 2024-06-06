import React, { useState } from 'react';
import { Grid, Box, Tab, Tabs, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography, Card, CardContent } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import SalesOverview from './components/SalesOverview';
import YearlyBreakup from './components/YearlyBreakup';
import RecentTransactions from './components/RecentTransactions';
import ProductPerformance from './components/ProductPerformance';
import Blog from './components/Blog';
import MonthlyEarnings from './components/MonthlyEarnings';

const Dashboard = () => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [firTitle, setFirTitle] = useState('');
  const [firDescription, setFirDescription] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    // Handle FIR form submission logic here
    handleClose();
  };

  return (
    <PageContainer title="Dashboard" description="Karnataka State Police Datathon">
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="dashboard tabs">
          <Tab label="Trends" />
          <Tab label="Crimes" />
          <Tab label="Reporting" />
        </Tabs>

        {value === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Blog />
            </Grid>
            <Grid item xs={12} lg={8}>
            <ProductPerformance />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <YearlyBreakup />
                </Grid>
                <Grid item xs={12}>
                  <MonthlyEarnings />
                </Grid>
              </Grid>
            </Grid>
            
          </Grid>
        )}

        {value === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Recent Crimes</Typography>
                  <Typography>List of recent crimes with dummy data...</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Heat Map</Typography>
                  <Typography>Heat map of crimes with dummy data...</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Top Districts</Typography>
                  <Typography>Table of top districts with dummy data...</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {value === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleOpen}>
                File FIR
              </Button>
            </Grid>
            {[...Array(4)].map((_, index) => (
              <Grid item xs={12} lg={6} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Empty Card {index + 1}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>File FIR</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details for the new FIR.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={firTitle}
            onChange={(e) => setFirTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={firDescription}
            onChange={(e) => setFirDescription(e.target.value)}
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

export default Dashboard;
