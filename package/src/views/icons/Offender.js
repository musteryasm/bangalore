import React, { useState } from 'react';
import { Grid,Box, Card, CardContent, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';

const OffenderDemographics = () => {
    const [offenderGender, setOffenderGender] = useState('Men');

    const handleOffenderGenderChange = (event) => {
        setOffenderGender(event.target.value);
    };

    const offenderBarData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: `Crimes Committed (${offenderGender})`,
                data: offenderGender === 'Men' ? [75, 69, 90, 91, 66, 65, 50] : [55, 59, 70, 81, 46, 55, 40],
                backgroundColor: 'rgba(153,102,255,0.4)',
                borderColor: 'rgba(153,102,255,1)',
                borderWidth: 1,
            },
        ],
    };

    const offenderPieData = {
        labels: ['Robbery', 'Assault', 'Theft', 'Burglary'],
        datasets: [
            {
                data: [200, 80, 120, 90],
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
                            <InputLabel id="offender-gender-select-label">Gender</InputLabel>
                            <Select
                                labelId="offender-gender-select-label"
                                id="offender-gender-select"
                                value={offenderGender}
                                label="Gender"
                                onChange={handleOffenderGenderChange}
                            >
                                <MenuItem value="Men">Men</MenuItem>
                                <MenuItem value="Women">Women</MenuItem>
                            </Select>
                        </FormControl>
                        <Bar data={offenderBarData} />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card sx={{ boxShadow: 3, height: '100%' }}>
                    <CardContent>
                        <Typography variant="h6">Pie Chart</Typography>
                        <Pie data={offenderPieData} />
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

export default OffenderDemographics;
