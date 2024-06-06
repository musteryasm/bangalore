import React from 'react';
import { CardContent, Typography, Grid } from '@mui/material';
import BlankCard from '../../../components/shared/BlankCard';

const crimeData = [
    {
        title: 'Theft',
        count: 1250,
        increase: '5%',
    },
    {
        title: 'Assault',
        count: 850,
        increase: '8%',
    },
    {
        title: 'Burglary',
        count: 650,
        increase: '3%',
    },
    {
        title: 'Gambling',
        count: 400,
        increase: '2%',
    },
];

const Blog = () => {
    return (
        <Grid container spacing={3}>
            {crimeData.map((crime, index) => (
                <Grid item sm={12} md={4} lg={3} key={index}>
                    <BlankCard>
                        <CardContent sx={{ p: 3, pt: 2 }}>
                            <Typography variant="h6">{crime.title}</Typography>
                            <Typography variant="h4" mt={1}>{crime.count}</Typography>
                            <Typography color="textSecondary" mt={1}>Increase: {crime.increase}</Typography>
                        </CardContent>
                    </BlankCard>
                </Grid>
            ))}
        </Grid>
    );
};

export default Blog;
