import React from 'react'

const OtpPopup = ({ show, handleClose, handleVerifyOtp, handleChange,otpMessage }) => {
  if (!show) return null;

  return (
    <div className="otp-popup-overlay">
      <div className="otp-popup-container">
        <button className="otp-popup-close-btn" onClick={handleClose}>
          &times;
        </button>
        {otpMessage && <p>{otpMessage}</p>}
        <h4 style={{margin:'10px 0'}}>Enter OTP</h4>
        <p className="input-wrapper">
        <input
          type="text"
          className="otp-input"
          placeholder="Enter the OTP code sent to your email.."
          defaultValue=""
          onChange={handleChange}
          required
        />
        </p>
       
        <button className="btn btn--primary" onClick={handleVerifyOtp}>
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OtpPopup;

