import React, { useState } from 'react';
import { Grid, FormControl, InputLabel, Select, Typography, Card, CardContent, Table, TableHead, TableBody, TableRow, TableCell, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import HotspotsMapCard from '../components/Hotspots';  // Assuming HotspotsMapCard is imported from a file

const CrimeStatisticsDashboard = () => {
    const theme = useTheme();
    const primary = theme.palette.primary.main;

    // Sample data for crimes
    const crimeData = [
        { id: 1, district: 'District A', crime: 'Burglary', count: 150 },
        { id: 2, district: 'District B', crime: 'Assault', count: 100 },
        { id: 3, district: 'District A', crime: 'Robbery', count: 80 },
        { id: 4, district: 'District C', crime: 'Vandalism', count: 50 },
        { id: 5, district: 'District B', crime: 'Fraud', count: 30 },
    ];

    // Districts for dropdown filter
    const districts = [...new Set(crimeData.map(crime => crime.district))];

    // State to hold selected district
    const [selectedDistrict, setSelectedDistrict] = useState('');

    // Filtered crime data based on selected district
    const filteredCrimeData = selectedDistrict ? crimeData.filter(crime => crime.district === selectedDistrict) : crimeData;

    // Options for ApexCharts pie chart
    const pieChartOptions = {
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
                return `${val.seriesIndex !== undefined ? filteredCrimeData[val.seriesIndex].crime + ': ' : ''}${val.value}`;
            },
        },
    };

    // Series data for ApexCharts pie chart
    const pieChartSeries = filteredCrimeData.map(crime => crime.count);

    return (
        <Grid container spacing={3}>
            {/* Pie Chart Card */}
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <DashboardCard title="Crime Statistics - Pie Chart">
                            <FormControl fullWidth>
                                <InputLabel id="district-filter-label">Select District</InputLabel>
                                <Select
                                    labelId="district-filter-label"
                                    id="district-filter"
                                    value={selectedDistrict}
                                    onChange={(e) => setSelectedDistrict(e.target.value)}
                                    label="Select District"
                                >
                                    <MenuItem value="">
                                        <em>All Districts</em>
                                    </MenuItem>
                                    {districts.map((district, index) => (
                                        <MenuItem key={index} value={district}>{district}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Chart options={pieChartOptions} series={pieChartSeries} type="pie" height="315px" />
                        </DashboardCard>
                    </CardContent>
                </Card>
            </Grid>

            {/* Table Card */}
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <DashboardCard title="Crime Statistics - Table">
                            <FormControl fullWidth>
                                <InputLabel id="district-filter-label-table">Select District</InputLabel>
                                <Select
                                    labelId="district-filter-label-table"
                                    id="district-filter-table"
                                    value={selectedDistrict}
                                    onChange={(e) => setSelectedDistrict(e.target.value)}
                                    label="Select District"
                                >
                                    <MenuItem value="">
                                        <em>All Districts</em>
                                    </MenuItem>
                                    {districts.map((district, index) => (
                                        <MenuItem key={index} value={district}>{district}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">District</TableCell>
                                        <TableCell align="center">Crime Type</TableCell>
                                        <TableCell align="center">Count</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredCrimeData.map((crime) => (
                                        <TableRow key={crime.id}>
                                            <TableCell align="center">{crime.district}</TableCell>
                                            <TableCell align="center">{crime.crime}</TableCell>
                                            <TableCell align="center">{crime.count}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Typography variant="body2" color="textSecondary">
                                Total crimes: {filteredCrimeData.reduce((total, crime) => total + crime.count, 0)}
                            </Typography>
                        </DashboardCard>
                    </CardContent>
                </Card>
            </Grid>

            {/* Map Card */}
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Hotspots Map
                        </Typography>
                        <HotspotsMapCard />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default CrimeStatisticsDashboard;
