// input_box.js
import React, { useState } from 'react';
import sendFutureText from './textFriendNow'; // Assuming textFriendNow.js is in the same directory

const InputBox = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('00:00:01');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Use the state variables (name, contact, location, time) as needed
    sendFutureText(name, contact, location, time);

    console.log('Name:', name);
    console.log('Emergency Contact:', contact);
    console.log('Location:', location);
    console.log('Time:', time);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div id="formfield">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text"
            size="50"
            placeholder="Enter Your Name"
            required
          />
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="text"
            size="50"
            placeholder="Emergency Contact (e.x. +1234567900)"
            required
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter Your Destination"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <input type="Submit" value="Submit" />
      </form>
    </div>
  );
};

export default InputBox;
