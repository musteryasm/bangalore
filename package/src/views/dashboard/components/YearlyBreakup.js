import React from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';

const AreaComparison = () => {
  // Sample data for statistical insights
  const insightsData = [
    { category: 'Petty Theft', change: '-10%', analysis: 'Decrease in petty theft across all districts.' },
    { category: 'Vandalism', change: '+5%', analysis: 'Increase in vandalism incidents, particularly in urban areas.' },
    { category: 'Assault', change: '-8%', analysis: 'Significant decrease in assault cases due to increased policing.' },
    { category: 'Burglary', change: '+3%', analysis: 'Slight increase in burglaries attributed to economic downturn.' },
    { category: 'Robbery', change: '+4%', analysis: 'Rise in robbery cases reported in commercial districts.' },
    { category: 'Rape', change: '-6%', analysis: 'Reduction in rape incidents due to improved reporting and response mechanisms.' },
    { category: 'Suicide', change: '+2%', analysis: 'Slight increase in suicides, with mental health being a major concern.' },
    { category: 'Riots', change: '+7%', analysis: 'Spike in riots linked to social and political unrest.' },
  ];

  return (
    <DashboardCard title="Statistical Insights">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="Statistical Insights Table">
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Change</TableCell>
                  <TableCell>Analysis</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {insightsData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {row.category}
                    </TableCell>
                    <TableCell align="right">{row.change}</TableCell>
                    <TableCell>{row.analysis}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default AreaComparison;
