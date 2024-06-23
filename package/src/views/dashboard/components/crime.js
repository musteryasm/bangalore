import React, { useState } from 'react';
import { Grid, FormControl, InputLabel, Select, Typography, Card, CardContent, Table, TableHead, TableBody, TableRow, TableCell, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import CrimeReportForm from '../components/Hotspots';
import HotspotsMapCard from '../components/Hotspots';

const CrimeStatisticsDashboard = () => {
    const theme = useTheme();
    const primary = theme.palette.primary.main;

    // Updated crime data with new district names
    const crimeData = [
        { id: 1, district: 'Bengaluru City', crime: 'Of Automobiles - Of Two Wheelers', count: 16416 },
        { id: 2, district: 'Bengaluru City', crime: 'Other Roads', count: 11021 },
        { id: 3, district: 'Bengaluru City', crime: 'Information Technology Act 2000, 2009', count: 10630 },
        { id: 4, district: 'Bengaluru City', crime: 'Public Safety', count: 9025 },
        { id: 5, district: 'Bengaluru City', crime: 'CHEATING', count: 8920 },
        { id: 6, district: 'Bengaluru City', crime: 'Simple Hurt', count: 8663 },
        { id: 7, district: 'Bengaluru City', crime: 'Women', count: 8654 },
        { id: 8, district: 'Bengaluru City', crime: 'Man', count: 5962 },
        { id: 9, district: 'Bengaluru Dist', crime: 'National Highways', count: 4594 },
        { id: 10, district: 'Bengaluru Dist', crime: 'Of Automobiles - Of Two Wheelers', count: 3254 },
        { id: 11, district: 'Bengaluru Dist', crime: 'Other Roads', count: 3229 },
        { id: 12, district: 'Bengaluru Dist', crime: 'Women', count: 2933 },
        { id: 13, district: 'Bengaluru Dist', crime: 'Simple Hurt', count: 2017 },
        { id: 14, district: 'Bengaluru Dist', crime: 'State Highways', count: 1612 },
        { id: 15, district: 'Bengaluru Dist', crime: 'CHEATING', count: 1553 },
        { id: 16, district: 'Bengaluru Dist', crime: 'Man', count: 1417 },
        { id: 17, district: 'Belagavi Dist', crime: 'State Highways', count: 4458 },
        { id: 18, district: 'Belagavi Dist', crime: 'Other Roads', count: 2465 },
        { id: 19, district: 'Belagavi Dist', crime: 'Gambling - Matka (78 Class C)', count: 1811 },
        { id: 20, district: 'Belagavi Dist', crime: 'Karnataka Excise Act 1965', count: 1358 },
        { id: 21, district: 'Belagavi Dist', crime: 'Simple Hurt', count: 1312 },
        { id: 22, district: 'Belagavi Dist', crime: 'Street Gambling (87)', count: 1295 },
        { id: 23, district: 'Belagavi Dist', crime: 'Women', count: 1294 },
        { id: 24, district: 'Belagavi Dist', crime: 'Others', count: 1165 },
        { id: 25, district: 'Davanagere', crime: 'State Highways', count: 1305 },
        { id: 26, district: 'Davanagere', crime: 'Other Roads', count: 1067 },
        { id: 27, district: 'Davanagere', crime: 'Women', count: 943 },
        { id: 28, district: 'Davanagere', crime: 'Gambling - Matka (78 Class C)', count: 766 },
        { id: 29, district: 'Davanagere', crime: 'Simple Hurt', count: 711 },
        { id: 30, district: 'Davanagere', crime: 'Street Gambling (87)', count: 701 },
        { id: 31, district: 'Davanagere', crime: 'Of Automobiles - Of Two Wheelers', count: 578 },
        { id: 32, district: 'Davanagere', crime: 'National Highways', count: 530 },
        { id: 33, district: 'Chikkamagaluru', crime: 'Simple Hurt', count: 1405 },
        { id: 34, district: 'Chikkamagaluru', crime: 'Karnataka Excise Act 1965', count: 1077 },
        { id: 35, district: 'Chikkamagaluru', crime: 'Other Roads', count: 1022 },
        { id: 36, district: 'Chikkamagaluru', crime: 'National Highways', count: 990 },
        { id: 37, district: 'Chikkamagaluru', crime: 'State Highways', count: 889 },
        { id: 38, district: 'Chikkamagaluru', crime: 'Women', count: 635 },
        { id: 39, district: 'Chikkamagaluru', crime: 'Man', count: 358 },
        { id: 40, district: 'Chikkamagaluru', crime: 'Others', count: 336 },
        { id: 41, district: 'Hubballi Dharwad City', crime: 'Information Technology Act 2000, 2009', count: 985 },
        { id: 42, district: 'Hubballi Dharwad City', crime: 'State Highways', count: 674 },
        { id: 43, district: 'Hubballi Dharwad City', crime: 'Simple Hurt', count: 630 },
        { id: 44, district: 'Hubballi Dharwad City', crime: 'Of Automobiles - Of Two Wheelers', count: 614 },
        { id: 45, district: 'Hubballi Dharwad City', crime: 'Other Roads', count: 573 },
        { id: 46, district: 'Hubballi Dharwad City', crime: 'Women', count: 561 },
        { id: 47, district: 'Hubballi Dharwad City', crime: 'Gambling - Matka (78 Class C)', count: 504 },
        { id: 48, district: 'Hubballi Dharwad City', crime: 'National Highways', count: 476 },
        { id: 49, district: 'Bidar', crime: 'Simple Hurt', count: 1412 },
        { id: 50, district: 'Bidar', crime: 'Other Roads', count: 1411 },
        { id: 51, district: 'Bidar', crime: 'National Highways', count: 930 },
        { id: 52, district: 'Bidar', crime: 'State Highways', count: 683 },
        { id: 53, district: 'Bidar', crime: 'Gambling - Matka (78 Class C)', count: 576 },
        { id: 54, district: 'Bidar', crime: 'Karnataka Excise Act 1965', count: 512 },
        { id: 55, district: 'Bidar', crime: 'Others', count: 415 },
        { id: 56, district: 'Bidar', crime: 'Of Automobiles - Of Two Wheelers', count: 403 },
        { id: 57, district: 'Bagalkot', crime: 'State Highways', count: 1225 },
        { id: 58, district: 'Bagalkot', crime: 'Other Roads', count: 908 },
        { id: 59, district: 'Bagalkot', crime: 'Street Gambling (87)', count: 677 },
        { id: 60, district: 'Bagalkot', crime: 'Gambling - Matka (78 Class C)', count: 669 },
        { id: 61, district: 'Bagalkot', crime: 'National Highways', count: 463 },
        { id: 62, district: 'Bagalkot', crime: 'Women', count: 445 },
        { id: 63, district: 'Bagalkot', crime: 'Karnataka Excise Act 1965', count: 431 },
        { id: 64, district: 'Bagalkot', crime: 'Of Automobiles - Of Two Wheelers', count: 388 },
        { id: 65, district: 'Hassan', crime: 'National Highways', count: 1157 },
        { id: 66, district: 'Hassan', crime: 'Simple Hurt', count: 1143 },
        { id: 67, district: 'Hassan', crime: 'Other Roads', count: 1133 },
        { id: 68, district: 'Hassan', crime: 'State Highways', count: 1110 },
        { id: 69, district: 'Hassan', crime: 'Karnataka Excise Act 1965', count: 416 },
        { id: 70, district: 'Hassan', crime: 'Women', count: 318 },
        { id: 71, district: 'Hassan', crime: 'Of Automobiles - Of Two Wheelers', count: 236 },
        { id: 72, district: 'Hassan', crime: 'Other Places', count: 220 },
        { id: 73, district: 'Belagavi City', crime: 'Other Roads', count: 1105 },
        { id: 74, district: 'Belagavi City', crime: 'Of Automobiles - Of Two Wheelers', count: 636 },
        { id: 75, district: 'Belagavi City', crime: 'National Highways', count: 568 },
        { id: 76, district: 'Belagavi City', crime: 'Simple Hurt', count: 470 },
        { id: 77, district: 'Belagavi City', crime: 'Women', count: 437 },
        { id: 78, district: 'Belagavi City', crime: 'At Residential Premises', count: 436 },
        { id: 79, district: 'Belagavi City', crime: 'State Highways', count: 434 },
        { id: 80, district: 'Belagavi City', crime: 'Gambling - Matka (78 Class C)', count: 396 },
        // Additional data for other districts should follow the same pattern
    ];

    // Top 10 districts data
    const top10Districts = [
        { District_Name: "Bengaluru City", count: 147436 },
        { District_Name: "Bengaluru Dist", count: 35080 },
        { District_Name: "Belagavi Dist", count: 26742 },
        { District_Name: "Davanagere", count: 12481 },
        { District_Name: "Chikkamagaluru", count: 12295 },
        { District_Name: "Hubballi Dharwad City", count: 10997 },
        { District_Name: "Bidar", count: 10548 },
        { District_Name: "Bagalkot", count: 9814 },
        { District_Name: "Hassan", count: 8873 },
        { District_Name: "Belagavi City", count: 8627 }
    ];

    // Crime stages data
    const crimeStages = [
        { FIR_Stage_Categorized: "Abated", heinous_count: 1933, nonheinous_count: 795 },
        { FIR_Stage_Categorized: "BoundOver", heinous_count: 7, nonheinous_count: 2862 },
        { FIR_Stage_Categorized: "Compounded", heinous_count: 406, nonheinous_count: 6962 },
        { FIR_Stage_Categorized: "Convicted", heinous_count: 1078, nonheinous_count: 57077 },
        { FIR_Stage_Categorized: "Dis/Acq", heinous_count: 3893, nonheinous_count: 13325 },
        { FIR_Stage_Categorized: "False Case", heinous_count: 1195, nonheinous_count: 16919 },
        { FIR_Stage_Categorized: "Other Disposal", heinous_count: 200, nonheinous_count: 2435 },
        { FIR_Stage_Categorized: "Pending Trial", heinous_count: 20595, nonheinous_count: 88497 },
        { FIR_Stage_Categorized: "Traced", heinous_count: 26, nonheinous_count: 27255 },
        { FIR_Stage_Categorized: "Transfered", heinous_count: 1682, nonheinous_count: 573 },
        { FIR_Stage_Categorized: "Un Traced", heinous_count: 0, nonheinous_count: 1359 },
        { FIR_Stage_Categorized: "Under Investigation", heinous_count: 3677, nonheinous_count: 45457 },
        { FIR_Stage_Categorized: "Undetected", heinous_count: 5334, nonheinous_count: 34072 }
    ];

    // FIR type counts
    const firTypeCounts = [
        { FIR_Type: "Non Heinous", count: 297588 },
        { FIR_Type: "Heinous", count: 40026 }
    ];

    const [selectedDistrict, setSelectedDistrict] = useState('');

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
    };

    const filteredCrimeData = selectedDistrict
        ? crimeData.filter((data) => data.district === selectedDistrict)
        : crimeData;

    return (
        <div>
            
            <Grid container spacing={3} style={{ marginTop: '16px' }}>
                <Grid item xs={12} md={6}>
                    <DashboardCard title="Top 10 Districts">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>District</TableCell>
                                    <TableCell align="right">Crime Count</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {top10Districts.map((district) => (
                                    <TableRow key={district.District_Name}>
                                        <TableCell>{district.District_Name}</TableCell>
                                        <TableCell align="right">{district.count}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </DashboardCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <DashboardCard title="FIR Type Counts">
                        <Chart
                            options={{
                                labels: firTypeCounts.map((data) => data.FIR_Type),
                                theme: { mode: theme.palette.mode }
                            }}
                            series={firTypeCounts.map((data) => data.count)}
                            type="pie"
                            height="300"
                        />
                    </DashboardCard>
                </Grid>
                <Grid item xs={12} md={12}>
                    <DashboardCard title="Crime Stages">
                        <Chart
                            options={{
                                chart: { type: 'bar', height: 350 },
                                plotOptions: { bar: { horizontal: true } },
                                dataLabels: { enabled: false },
                                xaxis: {
                                    categories: crimeStages.map((stage) => stage.FIR_Stage_Categorized)
                                },
                                theme: { mode: theme.palette.mode }
                            }}
                            series={[
                                {
                                    name: 'Heinous',
                                    data: crimeStages.map((stage) => stage.heinous_count)
                                },
                                {
                                    name: 'Non Heinous',
                                    data: crimeStages.map((stage) => stage.nonheinous_count)
                                }
                            ]}
                            type="bar"
                            height="350"
                        />
                    </DashboardCard>
                </Grid>
                <FormControl variant="outlined" fullWidth>
                <InputLabel>Select District</InputLabel>
                <Select value={selectedDistrict} onChange={handleDistrictChange} label="Select District">
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {crimeData
                        .map((data) => data.district)
                        .filter((value, index, self) => self.indexOf(value) === index)
                        .map((district) => (
                            <MenuItem key={district} value={district}>
                                {district}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
                <Grid item xs={12} md={12}>
                    <DashboardCard title={`Crime Data for ${selectedDistrict || 'All Districts'}`}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Crime Head</TableCell>
                                    <TableCell align="right">Count</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredCrimeData.map((data) => (
                                    <TableRow key={data.id}>
                                        <TableCell>{data.crime}</TableCell>
                                        <TableCell align="right">{data.count}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </DashboardCard>
                </Grid>
            </Grid>
        </div>
    );
};

export default CrimeStatisticsDashboard;

