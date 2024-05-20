// src/OTPVerification.js

import React, { useState } from 'react';
import axios from 'axios';

const OTPVerification = () => {
  const [otp, setOTP] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+918320593583'); // Include the country code

  const handleSendOTP = async () => {
    try {
      // Replace 'http://localhost:3001' with your actual backend server URL
      await axios.post('http://localhost:3001/send-otp', { to: phoneNumber });
      setVerificationStatus('OTP sent successfully. Check your phone.');
    } catch (error) {
      console.error('Error sending OTP:', error);
      setVerificationStatus('Error sending OTP. Please try again.');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      // Replace 'http://localhost:3001' with your actual backend server URL
      const response = await axios.post('http://localhost:3001/verify-otp', { otp, to: phoneNumber });

      if (response.data.success) {
        setVerificationStatus('OTP verification successful.');
      } else {
        setVerificationStatus('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setVerificationStatus('Error verifying OTP. Please try again.');
    }
  };

  return (
    <div>
      <h1>OTP Verification</h1>
      <button onClick={handleSendOTP}>Send OTP</button>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
      />
      <button onClick={handleVerifyOTP}>Verify OTP</button>
      {verificationStatus && <p>{verificationStatus}</p>}
    </div>
  );
};

export default OTPVerification;
    