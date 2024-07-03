import React, { useState } from 'react';
import axios from 'axios';

const ResetPasswordPopup = ({email,messagePopup,handleSubmit,setNewPassword,setOtpCode,handleClose}) => {
  

  return (
    
    <div className="otp-popup-overlay">
      <div className="otp-popup-container">
        <button className="otp-popup-close-btn" onClick={handleClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit} className='w100 products-form products-form-login login'>
        {messagePopup && <p>{messagePopup}</p>}
        <h6 className="heading w100" style={{fontSize:'16px'}}>
            Your Email: {email}
          
          </h6>
          <p className="input-wrapper w100">
            
            <input type="number" onChange={(e) => setOtpCode(e.target.value)} required placeholder='Enter OTP Code' className='input-text w100'/>
          </p>
          <p className="input-wrapper">
            
            <input
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className='input-text w100'
              placeholder='Enter your New Password'
            />
          </p>
          <p className="form-row w100 d-flex justify-center">
            <button type="submit" className='btn btn--primary'>Reset Password</button>
          </p>
        </form>
      </div>
    </div>
      
  );
};

export default ResetPasswordPopup;
