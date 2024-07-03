import React,{useState} from 'react'
import validator from 'validator';
import DOMPurify from 'dompurify';
import { hostLink } from "../../Hostlink/hostlink";
import axios from "axios";

export const Newsletter = ({errorMessage,setErrorMessage}) => {
    const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and password inputs
    if (!validator.isEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(`${hostLink}/newsletter-form`, {
        email,
      });
      if (response.data == "User with this email already exists") {
        setErrorMessage("Someone has already subscribed with this email!");
      }
    } catch (error) {
      console.error(error.response);
      // Sanitize the error message before displaying it
      setErrorMessage(DOMPurify.sanitize(error.response.data.message));
    }
  };
  return (
    <div className="footer-block footer__newsletter">
    <p>
      be the first to access zeyr fineri launches and events. GDPR
      compliant
    </p>
    <form
      onSubmit={handleSubmit}
      id="ContactFooter"
      className="footer__newsletter newsletter-form"
    >
      {errorMessage && <p>{errorMessage}</p>}

      <div className="input-wrapper flex jcb aic">
        <input
          id="NewsletterForm--ContactFooter"
          type="email"
          className="field__input"
          aria-required="true"
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete="email"
          placeholder="Your Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="btn" id="Subscribe-footer">
          Sign Up
        </button>
      </div>
    </form>
  </div>
  )
}
