import React from 'react';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';

const CrimePieChart = () => {
    const theme = useTheme();
    const primary = theme.palette.primary.main;

    // Sample data for crimes
    const crimeData = [
        { crime: 'Burglary', count: 150 },
        { crime: 'Assault', count: 100 },
        { crime: 'Robbery', count: 80 },
        { crime: 'Vandalism', count: 50 },
        { crime: 'Fraud', count: 30 },
    ];

    // Options for ApexCharts pie chart
    const options = {
        chart: {
            type: 'pie',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 350,
        },
        colors: [primary, '#4CAF50', '#FFC107', '#9C27B0', '#2196F3'],
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return `${val}%`;
            },
        },
        legend: {
            show: true,
            position: 'right',
            offsetY: 0,
            labels: {
                colors: theme.palette.mode === 'dark' ? '#ffffff' : '#333',
            },
        },
        tooltip: {
            enabled: true,
            fillSeriesColor: false,
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            formatter: function (val) {
                return `${val.seriesIndex !== undefined ? crimeData[val.seriesIndex].crime + ': ' : ''}${val.value}`;
            },
        },
    };

    // Series data for ApexCharts pie chart
    const series = crimeData.map((crime) => crime.count);

    return (
        <DashboardCard title="Crime Statistics - Pie Chart">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Chart options={options} series={series} type="pie" height="350px" />
                </Grid>
            </Grid>
        </DashboardCard>
    );
};

export default CrimePieChart;
