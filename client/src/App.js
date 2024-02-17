import React, { useState, useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import Navbar from "./components/Navbar/Navbar"
import inputBox from "../input_boxes/inputBox.js"

const App = () => {
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [danger, setDanger] = useState(null);

    // Hook to get geolocation data
    const { coords } = useGeolocated();

    // Update latitude and longitude when geolocation data changes
    useEffect(() => {
        if (coords) {
            setLongitude(coords.longitude);
            setLatitude(coords.latitude);
        }
    }, [coords]);

    const handlePredict = async () => {
        try {
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    longitude: longitude,
                    latitude: latitude,
                })
            });
            const data = await response.json();
            setDanger(data.message);
        } catch (error) {
            console.error('Error predicting danger:', error);
        }
    };

    return (
        <div className="App">
            <div>
                <Navbar />
                {longitude && latitude && (
                    <div>
                        Latitude: {latitude}, Longitude: {longitude}
                    </div>
                )}
                <button onClick={handlePredict}>
                    Predict Danger
                </button>
            </div>
            {danger !== null && <div>{danger}</div>}
            <inputBox />
        </div>
    );
};

export default App;