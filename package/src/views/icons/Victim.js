import React, { useState } from 'react';
import { Grid,Box, Card, CardContent, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';

const VictimDemographics = () => {
    const [gender, setGender] = useState('Men');

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const victimBarData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: `Crimes Reported (${gender})`,
                data: gender === 'Men' ? [65, 59, 80, 81, 56, 55, 40] : [45, 49, 60, 71, 36, 45, 30],
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const victimPieData = {
        labels: ['Robbery', 'Assault', 'Theft', 'Burglary'],
        datasets: [
            {
                data: [300, 50, 100, 60],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
        ],
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Card sx={{ boxShadow: 3, height: '100%' }}>
                    <CardContent>
                        <FormControl fullWidth>
                            <InputLabel id="gender-select-label">Gender</InputLabel>
                            <Select
                                labelId="gender-select-label"
                                id="gender-select"
                                value={gender}
                                label="Gender"
                                onChange={handleGenderChange}
                            >
                                <MenuItem value="Men">Men</MenuItem>
                                <MenuItem value="Women">Women</MenuItem>
                            </Select>
                        </FormControl>
                        <Bar data={victimBarData} />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card sx={{ boxShadow: 3, height: '100%' }}>
                    <CardContent>
                        <Typography variant="h6">Pie Chart</Typography>
                        <Pie data={victimPieData} />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card sx={{ boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h6">Choropleth Map</Typography>
                        <Box sx={{ height: 300, backgroundColor: '#e0e0e0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="body1">Choropleth Map Placeholder</Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default VictimDemographics;
