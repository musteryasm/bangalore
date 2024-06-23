import React, { useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';

// Import local images
import twoWheelerImage from '../../../assets/images/Two Wheelers.png';
import itAct2000Image from '../../../assets/images/IT ACT.png';
import cheatingImage from '../../../assets/images/Cheating.png';
import matkaGamblingImage from '../../../assets/images/Matka.png';
import houseTheftImage from '../../../assets/images/House Theft.png';
import criminalIntimationImage from '../../../assets/images/Criminal Intimidation.png';

const CrimeTrendChart = () => {
    const [imageFilter, setImageFilter] = useState('Two Wheeler'); // Default image filter

    const handleImageFilterChange = (event) => {
        setImageFilter(event.target.value);
    };

    // Mapping of filters to local image imports
    const imageUrls = {
        'Two Wheeler': twoWheelerImage,
        'IT Act 2000': itAct2000Image,
        'Cheating': cheatingImage,
        'Matka Gambling': matkaGamblingImage,
        'House Theft': houseTheftImage,
        'Criminal Intimation': criminalIntimationImage
    };

    return (
        <DashboardCard title="Crime Image Display" style={{ height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Select
                    labelId="image-filter-dd"
                    id="image-filter-dd"
                    value={imageFilter}
                    onChange={handleImageFilterChange}
                    size="small"
                    style={{ marginBottom: '20px' }}
                >
                    {Object.keys(imageUrls).map((filterOption) => (
                        <MenuItem key={filterOption} value={filterOption}>{filterOption}</MenuItem>
                    ))}
                </Select>
                <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={imageUrls[imageFilter]} alt={imageFilter} style={{ maxHeight: '100%', maxWidth: '100%' }} />
                </div>
            </div>
        </DashboardCard>
    );
};

export default CrimeTrendChart;
