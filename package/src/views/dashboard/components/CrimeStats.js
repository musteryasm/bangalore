import React, { useState } from 'react';
import { Grid, Select, MenuItem, Typography, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import BlankCard from '../../../components/shared/BlankCard';
import Chart from 'react-apexcharts';

const crimeData = {
    'Belagavi Division': [
        { title: 'Theft', count: 3321, increase: '5%' },
        { title: 'Assault', count: 2635, increase: '8%' },
        { title: 'Burglary', count: 2018, increase: '3%' },
        { title: 'Gambling', count: 1323, increase: '2%' },
        { title: 'Robbery', count: 1006, increase: '4%' },
        { title: 'Rape', count: 813, increase: '6%' },
        { title: 'Suicide', count: 723, increase: '1%' },
        { title: 'Riots', count: 507, increase: '7%' },
    ],
    'Bengaluru Division': [
        { title: 'Theft', count: 149532, increase: '4%' },
        { title: 'Assault', count: 35421, increase: '7%' },
        { title: 'Burglary', count: 27493, increase: '5%' },
        { title: 'Gambling', count: 18257, increase: '3%' },
        { title: 'Robbery', count: 14102, increase: '6%' },
        { title: 'Rape', count: 10123, increase: '4%' },
        { title: 'Suicide', count: 9284, increase: '2%' },
        { title: 'Riots', count: 6093, increase: '8%' },
    ],
    'Kalaburagi Division': [
        { title: 'Theft', count: 27345, increase: '6%' },
        { title: 'Assault', count: 16784, increase: '9%' },
        { title: 'Burglary', count: 12291, increase: '2%' },
        { title: 'Gambling', count: 10234, increase: '1%' },
        { title: 'Robbery', count: 8189, increase: '5%' },
        { title: 'Rape', count: 6075, increase: '7%' },
        { title: 'Suicide', count: 5167, increase: '3%' },
        { title: 'Riots', count: 4022, increase: '9%' },
    ],
    'Mysuru Division': [
        { title: 'Theft', count: 15129, increase: '7%' },
        { title: 'Assault', count: 10671, increase: '8%' },
        { title: 'Burglary', count: 8236, increase: '4%' },
        { title: 'Gambling', count: 6224, increase: '2%' },
        { title: 'Robbery', count: 5123, increase: '5%' },
        { title: 'Rape', count: 3567, increase: '6%' },
        { title: 'Suicide', count: 3089, increase: '4%' },
        { title: 'Riots', count: 2546, increase: '8%' },
    ],
};


const dayOfWeekData = {
    'Belagavi Division': {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        series: [20, 15, 25, 30, 35, 40, 45]
    },
    'Bengaluru Division': {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        series: [30, 25, 35, 40, 45, 50, 55]
    },
    'Kalaburagi Division': {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        series: [25, 20, 30, 35, 40, 45, 50]
    },
    'Mysuru Division': {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        series: [35, 30, 40, 45, 50, 55, 60]
    }
};

const timeOfDayData = {
    'Belagavi Division': {
        labels: ['Morning', 'Afternoon', 'Evening', 'Night'],
        series: [15, 25, 30, 35]
    },
    'Bengaluru Division': {
        labels: ['Morning', 'Afternoon', 'Evening', 'Night'],
        series: [20, 40, 35, 50]
    },
    'Kalaburagi Division': {
        labels: ['Morning', 'Afternoon', 'Evening', 'Night'],
        series: [25, 35, 40, 45]
    },
    'Mysuru Division': {
        labels: ['Morning', 'Afternoon', 'Evening', 'Night'],
        series: [30, 40, 45, 55]
    }
};

const divisionOptions = ['Belagavi Division', 'Bengaluru Division', 'Kalaburagi Division', 'Mysuru Division'];

const CrimeStatsDashboard = () => {
    const theme = useTheme();
    const primary = theme.palette.primary.main;

    const [division, setDivision] = useState('Belagavi Division');
    const [crimeType, setCrimeType] = useState('Theft');

    const options = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 350,
        },
        colors: [primary],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            title: {
                text: 'Number of Incidents',
            },
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
        }
    };

    const seriesOptions = {
        dayOfWeek: {
            name: 'Incidents by Day of Week',
            data: dayOfWeekData[division].series,
        },
        timeOfDay: {
            name: 'Incidents by Time of Day',
            data: timeOfDayData[division].series,
        }
    };

    const handleCrimeTypeChange = (event) => {
        setCrimeType(event.target.value);
    };

    const handleDivisionChange = (event) => {
        setDivision(event.target.value);
    };

    return (
        <DashboardCard title="Crime Statistics">
            <Select
                labelId="division-dd"
                id="division-dd"
                value={division}
                onChange={handleDivisionChange}
                size="small"
                fullWidth
                style={{ marginBottom: theme.spacing(3) }}
            >
                {divisionOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
            </Select>

            <Grid container spacing={3}>
                {crimeData[division].map((crime, index) => (
                    <Grid item sm={12} md={4} lg={3} key={index}>
                        <BlankCard>
                            <CardContent sx={{ p: 3, pt: 2 }}>
                                <Typography variant="h6">{crime.title}</Typography>
                                <Typography variant="h4" mt={1}>{crime.count}</Typography>
                                <Typography color="textSecondary" mt={1}>Increase: {crime.increase}</Typography>
                            </CardContent>
                        </BlankCard>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={3} style={{ marginTop: theme.spacing(3) }}>
                <Grid item xs={12} md={6}>
                    <Select
                        labelId="crime-type-dd"
                        id="crime-type-dd"
                        value={crimeType}
                        onChange={handleCrimeTypeChange}
                        size="small"
                        fullWidth
                        style={{ marginBottom: theme.spacing(2) }}
                    >
                        {['Theft', 'Assault', 'Burglary', 'Gambling', 'Robbery', 'Rape', 'Suicide', 'Riots'].map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                    <Chart
                        options={options}
                        series={[seriesOptions.dayOfWeek]}
                        type="bar"
                        height="400px"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Select
                                                labelId="time-of-day-dd"
                        id="time-of-day-dd"
                        value="Time of Day"
                        size="small"
                        fullWidth
                        style={{ marginBottom: theme.spacing(2) }}
                        disabled
                    >
                        <MenuItem value="Time of Day">Time of Day</MenuItem>
                    </Select>
                    <Chart
                        options={options}
                        series={[seriesOptions.timeOfDay]}
                        type="bar"
                        height="400px"
                    />
                </Grid>
            </Grid>
        </DashboardCard>
    );
};

export default CrimeStatsDashboard;

