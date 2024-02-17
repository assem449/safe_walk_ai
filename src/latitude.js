import React from "react";
import { useGeolocated } from "react-geolocated";

const LatitudeComponent = () => {
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
            {coords.latitude}
        </>
    ) : (
        null
    );
};

export default LatitudeComponent;
