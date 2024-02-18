import React, { useState, useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import Navbar from "../Navbar/Navbar";
import "./styles.css";

const Safety = () => {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [danger, setDanger] = useState(null);

  const { coords } = useGeolocated();

  useEffect(() => {
    if (coords) {
      setLongitude(coords.longitude);
      setLatitude(coords.latitude);
    }
  }, [coords]);

  const handlePredict = async () => {
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          longitude: longitude,
          latitude: latitude,
        }),
      });
      const data = await response.json();
      setDanger(data.message);
    } catch (error) {
      console.error("Error predicting danger:", error);
    }
  };

  return (
    <div>
      <Navbar /> {/* Use Navbar component here */}
      <div className="container">
        <h1>Safety</h1>
        <button onClick={handlePredict}>Predict</button>
        {danger !== null && <div>{danger}</div>}
      </div>
    </div>
  );
};

export default Safety;
