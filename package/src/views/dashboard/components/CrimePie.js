import React from 'react';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';

const CrimePieChart = () => {
    const theme = useTheme();
    const primary = theme.palette.primary.main;

    // Updated crime data according to JSON provided
    const crimeData = [
        { crime: 'Of Automobiles - Of Two Wheelers', count: 16416 },
        { crime: 'Other Roads', count: 11021 },
        { crime: 'Information Technology Act 2000, 2009', count: 10630 },
        { crime: 'Public Safety', count: 9025 },
        { crime: 'CHEATING', count: 8920 },
        { crime: 'Simple Hurt', count: 8663 },
        { crime: 'Women', count: 8654 },
        { crime: 'Man', count: 5962 }
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
        colors: [primary, '#4CAF50', '#FFC107', '#9C27B0', '#2196F3', '#FF5722', '#795548', '#607D8B'],
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return `${val.toFixed(2)}%`;
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
            y: {
                formatter: function (val) {
                    return val;
                },
                title: {
                    formatter: function (seriesName) {
                        return seriesName;
                    }
                }
            }
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
