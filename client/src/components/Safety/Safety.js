import React, { useState, useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import "./styles.css";
import dog from './dog.gif'

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
    <div className="container">
      <div className="heading">How safe is it to walk in my area?</div>
      <img src={dog} alt="doggif" height="100vh" className="dog" /> 
      <div className="description">Our safety prediction tool is built off of an AI model trained using thousands of data points on violent crime in the Toronto area.</div>
        <button onClick={handlePredict}>Check now</button>
        {danger !== null && <div className="danger-message">{danger}</div>}
    </div>
  );
} 

export default Safety;
