import React,{useEffect,createContext,useState,useContext} from 'react'
import axios from 'axios';
import { tokenContextC } from './TokenContext';
import { useNavigate } from 'react-router-dom';
import { hostLink as hostlink } from '../Hostlink/hostlink';

export const UserDetailsContext = createContext();

const UserDetails = ({children}) => {
    const history = useNavigate();
    const [accountDetails, setAccountDetails] = useState(null);
    const { token,isTokenExpired } = useContext(tokenContextC);
    const [redirectToCheckout, setRedirectToCheckout] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [membership,setMembership] = useState([]);

    useEffect(() => {
      if (document.body.classList.contains("hideheaderfooter")) {
        setRedirectToCheckout(true);
      }
    }, [redirectToCheckout]);

    const fetchData = async ()=>{
      try {
          let response = await axios.get(`${hostlink}/account-details`, {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the JWT token in the request headers
            },
          });
          
          setAccountDetails(response.data);
          
          //fetching address
            response = await axios.get(`${hostlink}/retrieve-address`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setAddresses(response.data.addresses);

          //fetching membershipdetails
          response = await axios.get(`${hostlink}/api/user-memberships`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
            setMembership(response.data.results);
          
          
        } catch (error) {
            setMembership([]);
        }
    
    }

    useEffect(() => {
      if(token){

        fetchData()
      }
    }, [hostlink]);


  return (
    <UserDetailsContext.Provider value={{accountDetails,history,addresses,membership}}>
        {children}
    </UserDetailsContext.Provider>
  )
}

export default UserDetails;
