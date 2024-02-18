import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/photo.JPG';
import './styles.css'; 

const Navbar = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Go back one step in history
    };

    return (
        <div className="navbar">
            <div className="go-back" onClick={goBack}>
                &larr; 
            </div>
            <div className="brand-logo-container">
                <span className="brand-name">SafeWalkAI</span>
                <img src={logo} alt="SafeWalkAI" height="25px" className="logo" />
            </div>
        </div>
    );
}

export default Navbar;
