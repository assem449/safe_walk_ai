import React from 'react';
import Navbar from '../Navbar/Navbar';
import "./styles.css";
import InputBox from '../input_boxes/inputBox';

const SmsPage = () => {
  return (
    <>
    <Navbar />
      <div className='title-container'>
        <h3 className = "title-text" >Text Me When You're Home!</h3>
      </div>

      <div className='description'>
        <p> 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel laoreet ante. 
        </p>
      </div>

      <div>
        <InputBox />
      </div>
    </>

  );
};

export default SmsPage;
