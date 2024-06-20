import React, { useState } from 'react';
import { Grid, Button, Card, CardContent, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { CartesianGrid, PieChart, Pie, BarChart, Bar, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {  XAxis, YAxis } from 'recharts';


const FirCard = () => {
    const [open, setOpen] = useState(false);
    const [firTitle, setFirTitle] = useState('');
    const [firDescription, setFirDescription] = useState('');
    const [recentFIRs, setRecentFIRs] = useState([]);
    const [firTypeData, setFirTypeData] = useState([
        { name: 'Heinous', value: 10 },
        { name: 'Non-Heinous', value: 23 },
    ]);
    const [crimeTypeData, setCrimeTypeData] = useState([]);
    const [complaintModeData, setComplaintModeData] = useState([]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        // Save FIR logic
        const newFIR = {
            title: firTitle,
            description: firDescription,
            // Add more fields as needed
        };

        // Update recent FIRs
        setRecentFIRs([newFIR, ...recentFIRs]);

        // Update FIR counts by type
        if (firTypeData) {
            if (newFIR.type === 'Heinous') {
                setFirTypeData([
                    { name: 'Heinous', value: firTypeData[0].value + 1 },
                    { name: 'Non-Heinous', value: firTypeData[1].value },
                ]);
            } else {
                setFirTypeData([
                    { name: 'Heinous', value: firTypeData[0].value },
                    { name: 'Non-Heinous', value: firTypeData[1].value + 1 },
                ]);
            }
        }

        // Reset form fields
        setFirTitle('');
        setFirDescription('');

        // Close dialog
        setOpen(false);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Button variant="contained" color="primary" onClick={handleOpen}>
                            File FIR
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>File FIR</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill in the details for the new FIR.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Title"
                            type="text"
                            fullWidth
                            value={firTitle}
                            onChange={(e) => setFirTitle(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Description"
                            type="text"
                            fullWidth
                            value={firDescription}
                            onChange={(e) => setFirDescription(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
            {/* Display form data in a card below */}
            {recentFIRs.length > 0 && (
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>Recent FIRs/Reports</Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Description</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recentFIRs.map((fir, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{fir.title}</TableCell>
                                                <TableCell>{fir.description}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>
            )}
            {/* Pie chart for FIR counts by type */}
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>FIR Counts by Type</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={firTypeData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label
                                >
                                    {firTypeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#FF0000' : '#008000'} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </Grid>
            {/* Pie chart for FIR counts by crime type (mock data) */}
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>FIR Counts by Crime Type</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: 'Theft', value: 20 },
                                        { name: 'Assault', value: 15 },
                                        { name: 'Fraud', value: 10 },
                                        { name: 'Others', value: 5 },
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label
                                >
                                    {[
                                        { name: 'Theft', fill: '#FF0000' },
                                        { name: 'Assault', fill: '#008000' },
                                        { name: 'Fraud', fill: '#FFA500' },
                                        { name: 'Others', fill: '#0000FF' },
                                    ].map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </Grid>
            {/* Bar chart for count of FIR by complaint modes (mock data) */}
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>Count of FIR by Complaint Modes</Typography>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={[
                                { mode: 'Written', count: 30 },
                                { mode: 'Oral', count: 25 },
                                { mode: 'Online', count: 20 },
                                { mode: 'Others', count: 15 },
                            ]}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="mode" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default FirCard;
