import React, { useState } from 'react';
import { Select, MenuItem, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';

const CrimeTrendChart = () => {
    const [crimeType, setCrimeType] = useState('Theft'); // Default crime type
    const [filterDistrict, setFilterDistrict] = useState('All');
    const [displayMode, setDisplayMode] = useState('current'); // 'current' or 'future'
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    const handleChangeCrimeType = (event) => {
        setCrimeType(event.target.value);
    };

    const handleFilterDistrict = (event) => {
        setFilterDistrict(event.target.value);
    };

    const handleDisplayModeChange = (event, newDisplayMode) => {
        if (newDisplayMode !== null) {
            setDisplayMode(newDisplayMode);
        }
    };

    // Sample dynamic data based on year
    const data = {
        'current': {
            '2016': {
                'Theft': 20,
                'Assault': 22,
                'Burglary': 25,
                'Robbery': 27,
                'Vandalism': 30,
                'Drug Offenses': 32,
            },
            '2017': {
                'Theft': 25,
                'Assault': 27,
                'Burglary': 30,
                'Robbery': 32,
                'Vandalism': 35,
                'Drug Offenses': 37,
            },
            '2018': {
                'Theft': 30,
                'Assault': 32,
                'Burglary': 35,
                'Robbery': 37,
                'Vandalism': 40,
                'Drug Offenses': 42,
            },
            '2019': {
                'Theft': 35,
                'Assault': 37,
                'Burglary': 40,
                'Robbery': 42,
                'Vandalism': 45,
                'Drug Offenses': 47,
            },
            '2020': {
                'Theft': 40,
                'Assault': 42,
                'Burglary': 45,
                'Robbery': 47,
                'Vandalism': 50,
                'Drug Offenses': 52,
            },
            '2021': {
                'Theft': 45,
                'Assault': 47,
                'Burglary': 50,
                'Robbery': 52,
                'Vandalism': 55,
                'Drug Offenses': 57,
            },
            '2022': {
                'Theft': 50,
                'Assault': 52,
                'Burglary': 55,
                'Robbery': 57,
                'Vandalism': 60,
                'Drug Offenses': 62,
            },
            '2023': {
                'Theft': 55,
                'Assault': 57,
                'Burglary': 60,
                'Robbery': 62,
                'Vandalism': 65,
                'Drug Offenses': 67,
            },
        },
        'future': {
            '2024': {
                'Theft': 60,
                'Assault': 62,
                'Burglary': 65,
                'Robbery': 67,
                'Vandalism': 70,
                'Drug Offenses': 72,
            },
            '2025': {
                'Theft': 65,
                'Assault': 67,
                'Burglary': 70,
                'Robbery': 72,
                'Vandalism': 75,
                'Drug Offenses': 77,
            },
            '2026': {
                'Theft': 70,
                'Assault': 72,
                'Burglary': 75,
                'Robbery': 77,
                'Vandalism': 80,
                'Drug Offenses': 82,
            },
            '2027': {
                'Theft': 75,
                'Assault': 77,
                'Burglary': 80,
                'Robbery': 82,
                'Vandalism': 85,
                'Drug Offenses': 87,
            },
            '2028': {
                'Theft': 80,
                'Assault': 82,
                'Burglary': 85,
                'Robbery': 87,
                'Vandalism': 90,
                'Drug Offenses': 92,
            },
            '2029': {
                'Theft': 85,
                'Assault': 87,
                'Burglary': 90,
                'Robbery': 92,
                'Vandalism': 95,
                'Drug Offenses': 97,
            },
            '2030': {
                'Theft': 90,
                'Assault': 92,
                'Burglary': 95,
                'Robbery': 97,
                'Vandalism': 100,
                'Drug Offenses': 102,
            },
        }
    };

    // Determine all years from both 'current' and 'future' modes
    const years = displayMode === 'current' ?
        Object.keys(data['current']) :
        Object.keys(data['future']);

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
            categories: years,
            title: {
                text: 'Years',
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
            name: crimeType,
            data: years.map(year => data[displayMode][year][crimeType]),
        }
    ];

    return (
        <DashboardCard title="Crime Trends">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <Select
                        labelId="crime-type-dd"
                        id="crime-type-dd"
                        value={crimeType}
                        onChange={handleChangeCrimeType}
                        size="small"
                    >
                        {Object.keys(data[displayMode][years[0]]).map((crimeTypeOption) => (
                            <MenuItem key={crimeTypeOption} value={crimeTypeOption}>{crimeTypeOption}</MenuItem>
                        ))}
                    </Select>
                </div>
                <div>
                    <ToggleButtonGroup
                        value={displayMode}
                        exclusive
                        onChange={handleDisplayModeChange}
                    >
                        <ToggleButton value="current">Current</ToggleButton>
                        <ToggleButton value="future">Future</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div>
                    <Select
                        labelId="district-dd"
                        id="district-dd"
                        value={filterDistrict}
                        onChange={(event) => handleFilterDistrict(event.target.value)}
                        size="small"
                    >
                        <MenuItem value="All">All Districts</MenuItem>
                        <MenuItem value="District A">District A</MenuItem>
                        <MenuItem value="District B">District B</MenuItem>
                        {/* Add more district options as needed */}
                    </Select>
                </div>
            </div>
            <Chart
                options={options}
                series={series}
                type="line"
                height="370px"
            />
        </DashboardCard>
    );
};

export default CrimeTrendChart;
