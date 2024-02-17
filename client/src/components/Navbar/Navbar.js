import React from 'react';
import logo from '../../assets/favicon.png';
import './styles.css'; // Import your CSS file for styling

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="logo-container">
                <img src={logo} alt="SafeWalkAI" height="25px" className="logo" />
                <span className="brand-name">SafeWalkAI</span>
            </div>
        </div>
    );
}

export default Navbar;
