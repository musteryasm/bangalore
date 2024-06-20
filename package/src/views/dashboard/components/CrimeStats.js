import React, { useState } from 'react';
import { Grid, Select, MenuItem, Typography, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import BlankCard from '../../../components/shared/BlankCard';
import Chart from 'react-apexcharts';

const crimeData = {
    'District A': [
        { title: 'Theft', count: 1250, increase: '5%' },
        { title: 'Assault', count: 850, increase: '8%' },
        { title: 'Burglary', count: 650, increase: '3%' },
        { title: 'Gambling', count: 400, increase: '2%' },
        { title: 'Robbery', count: 300, increase: '4%' },
        { title: 'Rape', count: 200, increase: '6%' },
        { title: 'Suicide', count: 150, increase: '1%' },
        { title: 'Riots', count: 100, increase: '7%' },
    ],
    'District B': [
        { title: 'Theft', count: 1150, increase: '4%' },
        { title: 'Assault', count: 900, increase: '7%' },
        { title: 'Burglary', count: 700, increase: '5%' },
        { title: 'Gambling', count: 450, increase: '3%' },
        { title: 'Robbery', count: 350, increase: '6%' },
        { title: 'Rape', count: 250, increase: '4%' },
        { title: 'Suicide', count: 200, increase: '2%' },
        { title: 'Riots', count: 150, increase: '8%' },
    ],
    'District C': [
        { title: 'Theft', count: 1350, increase: '6%' },
        { title: 'Assault', count: 800, increase: '9%' },
        { title: 'Burglary', count: 600, increase: '2%' },
        { title: 'Gambling', count: 500, increase: '1%' },
        { title: 'Robbery', count: 400, increase: '5%' },
        { title: 'Rape', count: 300, increase: '7%' },
        { title: 'Suicide', count: 250, increase: '3%' },
        { title: 'Riots', count: 200, increase: '9%' },
    ],
};

const dayOfWeekData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    series: [30, 25, 35, 40, 45, 50, 55]
};

const timeOfDayData = {
    labels: ['Morning', 'Afternoon', 'Evening', 'Night'],
    series: [20, 40, 35, 50]
};

const crimeTypeOptions = ['Theft', 'Assault', 'Burglary', 'Gambling', 'Robbery', 'Rape', 'Suicide', 'Riots'];

const districtOptions = ['District A', 'District B', 'District C'];

const CrimeStatsDashboard = () => {
    const theme = useTheme();
    const primary = theme.palette.primary.main;

    const [district, setDistrict] = useState('District A');
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
            data: dayOfWeekData.series,
        },
        timeOfDay: {
            name: 'Incidents by Time of Day',
            data: timeOfDayData.series,
        }
    };

    const handleCrimeTypeChange = (event) => {
        setCrimeType(event.target.value);
    };

    const handleDistrictChange = (event) => {
        setDistrict(event.target.value);
    };

    return (
        <DashboardCard title="Crime Statistics">
            <Select
                labelId="district-dd"
                id="district-dd"
                value={district}
                onChange={handleDistrictChange}
                size="small"
                fullWidth
                style={{ marginBottom: theme.spacing(3) }}
            >
                {districtOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
            </Select>

            <Grid container spacing={3}>
                {crimeData[district].map((crime, index) => (
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
                        {crimeTypeOptions.map((option) => (
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
                        labelId="crime-type-dd-2"
                        id="crime-type-dd-2"
                        value={crimeType}
                        onChange={handleCrimeTypeChange}
                        size="small"
                        fullWidth
                        style={{ marginBottom: theme.spacing(2) }}
                    >
                        {crimeTypeOptions.map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
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
