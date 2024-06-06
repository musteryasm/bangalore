import React, { useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';

const SalesOverview = () => {
    const [year, setYear] = useState('2023');
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    const handleChange = (event) => {
        setYear(event.target.value);
    };

    // Sample dynamic data based on year
    const data = {
        '2023': {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            crimes: [30, 40, 35, 50, 49, 60, 70, 91, 125, 160, 200, 230]
        },
        '2024': {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            crimes: [25, 30, 45, 55, 60, 70, 75, 80, 95, 110, 130, 150]
        }
    };

    const options = {
        chart: {
            type: 'line',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: [primary, secondary],
        stroke: {
            show: true,
            width: 3,
            curve: 'smooth',
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
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
            tickAmount: 5,
            title: {
                text: 'Number of Crimes',
            },
        },
        xaxis: {
            categories: data[year].months,
            title: {
                text: 'Months',
            },
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false,
        },
    };

    const series = [
        {
            name: 'Crimes Reported',
            data: data[year].crimes,
        }
    ];

    return (
        <DashboardCard title="Crimes Reported" action={
            <Select
                labelId="year-dd"
                id="year-dd"
                value={year}
                size="small"
                onChange={handleChange}
            >
                <MenuItem value={'2023'}>2023</MenuItem>
                <MenuItem value={'2024'}>2024</MenuItem>
                {/* Add more years as needed */}
            </Select>
        }>
            <Chart
                options={options}
                series={series}
                type="line"
                height="370px"
            />
        </DashboardCard>
    );
};

export default SalesOverview;
