import React, { useState } from 'react';
import {
    Grid, Button, Card, CardContent, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    TextField, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper
} from '@mui/material';
import { CartesianGrid, PieChart, Pie, BarChart, Bar, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { XAxis, YAxis } from 'recharts';

const FirCard = () => {
    const [open, setOpen] = useState(false);
    const [firTitle, setFirTitle] = useState('');
    const [firDescription, setFirDescription] = useState('');
    const [recentFIRs, setRecentFIRs] = useState([]);
    const [firTypeData, setFirTypeData] = useState([
        { name: 'Heinous', value: 40026 },
        { name: 'Non-Heinous', value: 297588 },
    ]);
    const [crimeTypeData, setCrimeTypeData] = useState([]);
    const [complaintModeData, setComplaintModeData] = useState([]);
    
    // Define additional state variables for FIR form fields
    const [firDistrictName, setFirDistrictName] = useState('');
    const [firNo, setFirNo] = useState('');
    const [firYear, setFirYear] = useState('');
    const [firMonth, setFirMonth] = useState('');
    const [firDate, setFirDate] = useState('');
    const [firType, setFirType] = useState('');
    const [firStage, setFirStage] = useState('');
    const [complaintMode, setComplaintMode] = useState('');
    const [crimeGroupName, setCrimeGroupName] = useState('');
    const [crimeHeadName, setCrimeHeadName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [actSection, setActSection] = useState('');
    const [ioName, setIoName] = useState('');
    const [placeOfOffence, setPlaceOfOffence] = useState('');
    const [beatName, setBeatName] = useState('');
    const [victimCount, setVictimCount] = useState('');
    const [accusedCount, setAccusedCount] = useState('');

    const crimeStages = [
        {
            "FIR_Stage_Categorized": "Abated",
            "heinous_count": 1933,
            "nonheinous_count": 795
        },
        {
            "FIR_Stage_Categorized": "BoundOver",
            "heinous_count": 7,
            "nonheinous_count": 2862
        },
        {
            "FIR_Stage_Categorized": "Compounded",
            "heinous_count": 406,
            "nonheinous_count": 6962
        },
        {
            "FIR_Stage_Categorized": "Convicted",
            "heinous_count": 1078,
            "nonheinous_count": 57077
        },
        {
            "FIR_Stage_Categorized": "Dis/Acq",
            "heinous_count": 3893,
            "nonheinous_count": 13325
        },
        {
            "FIR_Stage_Categorized": "False Case",
            "heinous_count": 1195,
            "nonheinous_count": 16919
        },
        {
            "FIR_Stage_Categorized": "Other Disposal",
            "heinous_count": 200,
            "nonheinous_count": 2435
        },
        {
            "FIR_Stage_Categorized": "Pending Trial",
            "heinous_count": 20595,
            "nonheinous_count": 88497
        },
        {
            "FIR_Stage_Categorized": "Traced",
            "heinous_count": 26,
            "nonheinous_count": 27255
        },
        {
            "FIR_Stage_Categorized": "Transfered",
            "heinous_count": 1682,
            "nonheinous_count": 573
        },
        {
            "FIR_Stage_Categorized": "Un Traced",
            "heinous_count": 0,
            "nonheinous_count": 1359
        },
        {
            "FIR_Stage_Categorized": "Under Investigation",
            "heinous_count": 3677,
            "nonheinous_count": 45457
        },
        {
            "FIR_Stage_Categorized": "Undetected",
            "heinous_count": 5334,
            "nonheinous_count": 34072
        }
    ];

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
            districtName: firDistrictName,
            firNo: firNo,
            year: firYear,
            month: firMonth,
            firDate: firDate,
            firType: firType,
            firStage: firStage,
            complaintMode: complaintMode,
            crimeGroupName: crimeGroupName,
            crimeHeadName: crimeHeadName,
            latitude: latitude,
            longitude: longitude,
            actSection: actSection,
            ioName: ioName,
            placeOfOffence: placeOfOffence,
            beatName: beatName,
            victimCount: victimCount,
            accusedCount: accusedCount,
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
        setFirDistrictName('');
        setFirNo('');
        setFirYear('');
        setFirMonth('');
        setFirDate('');
        setFirType('');
        setFirStage('');
        setComplaintMode('');
        setCrimeGroupName('');
        setCrimeHeadName('');
        setLatitude('');
        setLongitude('');
        setActSection('');
        setIoName('');
        setPlaceOfOffence('');
        setBeatName('');
        setVictimCount('');
        setAccusedCount('');

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
                        <TextField
                            margin="dense"
                            label="District Name"
                            type="text"
                            fullWidth
                            value={firDistrictName}
                            onChange={(e) => setFirDistrictName(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="FIR No"
                            type="text"
                            fullWidth
                            value={firNo}
                            onChange={(e) => setFirNo(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Year"
                            type="number"
                            fullWidth
                            value={firYear}
                            onChange={(e) => setFirYear(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Month"
                            type="text"
                            fullWidth
                            value={firMonth}
                            onChange={(e) => setFirMonth(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="FIR Date"
                            type="date"
                            fullWidth
                            value={firDate}
                            onChange={(e) => setFirDate(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="FIR Type"
                            type="text"
                            fullWidth
                            value={firType}
                            onChange={(e) => setFirType(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="FIR Stage"
                            type="text"
                            fullWidth
                            value={firStage}
                            onChange={(e) => setFirStage(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Complaint Mode"
                            type="text"
                            fullWidth
                            value={complaintMode}
                            onChange={(e) => setComplaintMode(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Crime Group Name"
                            type="text"
                            fullWidth
                            value={crimeGroupName}
                            onChange={(e) => setCrimeGroupName(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Crime Head Name"
                            type="text"
                            fullWidth
                            value={crimeHeadName}
                            onChange={(e) => setCrimeHeadName(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Latitude"
                            type="text"
                            fullWidth
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Longitude"
                            type="text"
                            fullWidth
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Act Section"
                            type="text"
                            fullWidth
                            value={actSection}
                            onChange={(e) => setActSection(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="IO Name"
                            type="text"
                            fullWidth
                            value={ioName}
                            onChange={(e) => setIoName(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Place of Offence"
                            type="text"
                            fullWidth
                            value={placeOfOffence}
                            onChange={(e) => setPlaceOfOffence(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Beat Name"
                            type="text"
                            fullWidth
                            value={beatName}
                            onChange={(e) => setBeatName(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Victim Count"
                            type="number"
                            fullWidth
                            value={victimCount}
                            onChange={(e) => setVictimCount(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Accused Count"
                            type="number"
                            fullWidth
                            value={accusedCount}
                            onChange={(e) => setAccusedCount(e.target.value)}
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
                                            <TableCell>District Name</TableCell>
                                            <TableCell>FIR No</TableCell>
                                            <TableCell>Year</TableCell>
                                            <TableCell>Month</TableCell>
                                            <TableCell>FIR Date</TableCell>
                                            <TableCell>FIR Type</TableCell>
                                            <TableCell>FIR Stage</TableCell>
                                            <TableCell>Complaint Mode</TableCell>
                                            <TableCell>Crime Group Name</TableCell>
                                            <TableCell>Crime Head Name</TableCell>
                                            <TableCell>Latitude</TableCell>
                                            <TableCell>Longitude</TableCell>
                                            <TableCell>Act Section</TableCell>
                                            <TableCell>IO Name</TableCell>
                                            <TableCell>Place of Offence</TableCell>
                                            <TableCell>Beat Name</TableCell>
                                            <TableCell>Victim Count</TableCell>
                                            <TableCell>Accused Count</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recentFIRs.map((fir, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{fir.title}</TableCell>
                                                <TableCell>{fir.description}</TableCell>
                                                <TableCell>{fir.districtName}</TableCell>
                                                <TableCell>{fir.firNo}</TableCell>
                                                <TableCell>{fir.year}</TableCell>
                                                <TableCell>{fir.month}</TableCell>
                                                <TableCell>{fir.firDate}</TableCell>
                                                <TableCell>{fir.firType}</TableCell>
                                                <TableCell>{fir.firStage}</TableCell>
                                                <TableCell>{fir.complaintMode}</TableCell>
                                                <TableCell>{fir.crimeGroupName}</TableCell>
                                                <TableCell>{fir.crimeHeadName}</TableCell>
                                                <TableCell>{fir.latitude}</TableCell>
                                                <TableCell>{fir.longitude}</TableCell>
                                                <TableCell>{fir.actSection}</TableCell>
                                                <TableCell>{fir.ioName}</TableCell>
                                                <TableCell>{fir.placeOfOffence}</TableCell>
                                                <TableCell>{fir.beatName}</TableCell>
                                                <TableCell>{fir.victimCount}</TableCell>
                                                <TableCell>{fir.accusedCount}</TableCell>
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
            {/* Pie chart for FIR counts by crime type */}
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>FIR Counts by Crime Type</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={crimeStages.map(stage => ({
                                        name: stage.FIR_Stage_Categorized,
                                        value: stage.heinous_count + stage.nonheinous_count
                                    }))}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label
                                >
                                    {crimeStages.map((stage, index) => (
                                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#FF0000' : '#008000'} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </Grid>
            {/* Bar chart for count of FIR by crime stages */}
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>Count of FIR by Crime Stages</Typography>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={crimeStages}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="FIR_Stage_Categorized" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="heinous_count" stackId="count" fill="#FF0000" />
                                <Bar dataKey="nonheinous_count" stackId="count" fill="#008000" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default FirCard;


