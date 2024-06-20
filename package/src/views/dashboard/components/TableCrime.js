import React from 'react';
import { Grid, Table, TableHead, TableBody, TableRow, TableCell, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';

const CrimeStatisticsTable = () => {
    const theme = useTheme();

    // Sample data for crimes
    const crimeData = [
        { id: 1, crime: 'Burglary', count: 150 },
        { id: 2, crime: 'Assault', count: 100 },
        { id: 3, crime: 'Robbery', count: 80 },
        { id: 4, crime: 'Vandalism', count: 50 },
        { id: 5, crime: 'Fraud', count: 30 },
    ];

    return (
        <DashboardCard title="Crime Statistics - Table">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Crime Type</TableCell>
                                <TableCell align="center">Count</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {crimeData.map((crime) => (
                                <TableRow key={crime.id}>
                                    <TableCell align="center">{crime.crime}</TableCell>
                                    <TableCell align="center">{crime.count}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" color="textSecondary">
                        Total crimes: {crimeData.reduce((total, crime) => total + crime.count, 0)}
                    </Typography>
                </Grid>
            </Grid>
        </DashboardCard>
    );
};

export default CrimeStatisticsTable;
