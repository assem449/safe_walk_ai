import React from "react";
import { useGeolocated } from "react-geolocated";

const LongitudeComponent = () => {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: true,
            },
            watchPosition: true,
            userDecisionTimeout: 5000,
        });

    return !isGeolocationAvailable ? (
        null
    ) : !isGeolocationEnabled ? (
        null
    ) : coords ? (
        <>
            {coords.longitude}
        </>
    ) : (
        null
    );
};

export default LongitudeComponent;
