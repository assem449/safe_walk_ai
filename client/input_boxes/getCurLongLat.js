import React from 'react';
import { useGeolocated } from 'react-geolocated';

const getLocation = () => {
    const { coords } = useGeolocated();

    // Check if coordinates are available
    if (coords) {
        // Destructure latitude and longitude from coords
        const { latitude, longitude } = coords;
        // Return latitude and longitude as an array
        return [latitude, longitude];
    } else {
        // Return null if coordinates are not available
        return null;
    }
};

export default getLocation;