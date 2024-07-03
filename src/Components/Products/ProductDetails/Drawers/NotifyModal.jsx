import axios from 'axios';
import React, { useState } from 'react'
import { hostLink } from '../../../Hostlink/hostlink';

export const NotifyModal = () => {
  
    const [showOtpPopup, setShowOtpPopup] = useState(false);
    const [otpMessage, setOTPMessage] = useState('');
    const [email,setEmail] = useState('')
    const handleClose = () => {
        setShowOtpPopup(false);
      };

      const handleVerifyOtp = async () => {
        try {
          const response = await axios.post(`${hostLink}/verify-otp`, { });
          
          setShowOtpPopup(false);
           
          
        } catch (error) {
          setOTPMessage(error.response.data.message);
        }
      };

    return (
        <div className="otp-popup-overlay">
          <div className="otp-popup-container">
            <button className="otp-popup-close-btn" onClick={handleClose}>
              &times;
            </button>
            <p></p>
            <h4 style={{margin:'10px 0'}}>{"Product name"}</h4>
            <p>Know when this product is back in stock</p>

            <p className="input-wrapper" style={{borderBottom:'none'}}>
            <select name="" id="" style={{width:'100%'}}>
                <option value="">Product 1</option>
            </select>
            </p>
            <p className="input-wrapper">
        <input
          type="text"
          className="otp-input"
          value={email}
          placeholder="Enter the OTP code sent to your email.."
          defaultValue=""
          onChange={()=> setEmail(e.target.value)}
          required
          style={{margin:'0'}}
        />
        </p>
           
            <button className="btn btn--primary" style={{width:'100%'}} onClick={handleVerifyOtp}>
              Get Notified
            </button>
          </div>
        </div>
      );
}
