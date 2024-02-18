import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SmsPage from "./components/SmsPage/SmsPage";
import Safety from "./components/Safety/Safety";
import logo from "./assets/photo.JPG";

import "./App.css";

const App = () => {
  
  const [showApp, setShowApp] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowApp(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Router>
      <Routes>
            <Route path="/" element={<>
                <div>
        {!showApp && (
          <div className="welcome-container">
             <img src={logo} alt="Logo" className="logo1"/>
            <h1 className="welcome-text">Welcome!</h1>
            <p className="additional-text">Stay safe on the go with Safe Walk AI!</p>
          </div>
        )}
        <div className={`App ${showApp ? "show" : ""}`}>
          {showApp && (
            <>
              <Navbar />
              <div className="description">
                <p>
                  Safe Walk AI! Predict potential dangers or text for personalized safety tips with just a tap.
                </p>
              </div>
              <Link to="/sms" className="text-button">
                SMS
              </Link>
              <Link to="/safety"className="safety-button">
                Safety
              </Link>
            
            </>
          )}
        </div>
            
        </div>
            </>} />
            <Route path="/sms" element={<SmsPage />} />
            <Route path="/safety" element={<Safety />} />
        </Routes>
    </Router>
  );
};

export default App;
