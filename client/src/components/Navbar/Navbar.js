import React from 'react';
import logo from '../../assets/ghost.jpeg';
import './styles.css'; 

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
