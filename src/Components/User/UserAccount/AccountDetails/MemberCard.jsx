import React, { useContext, useEffect, useState } from 'react'
import { UserDetailsContext } from '../../../Context/UserDetails';
import { hostLink } from '../../../Hostlink/hostlink';
import { useReactToPrint } from 'react-to-print';

 const MemberCard = () => {

  const { accountDetails } = useContext(UserDetailsContext);
  const [formattedDate,setFormattedDate] = useState('')
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: true,
  });

  useEffect(()=>{
if(accountDetails){
  const dateObject = new Date(accountDetails.regdate);
  const options = { day: "numeric", month: "long", year: "numeric" };
  setFormattedDate(dateObject.toLocaleDateString("en-US", options))
}
   
  },[])


  return (
    
    <div className='card-main-container'>
      {accountDetails && (
  <div className="box">
  <div className="front">
    <div className="center">
     
      <h1>Prestige</h1>
      <img src="/cdn/shop/files/ZEYR-FINERI-LOGO-W-1.png" />
    </div>
    <div className="center bottom">
     
     <h1>{accountDetails.fname + " " + accountDetails.lname}</h1>
     <p id="name">{accountDetails.email}</p>
     
     <p><span>Registration Date</span>: {formattedDate}</p>
   </div>
  </div>
  <div className="back">
    <div className="row">
    <img src="/cdn/shop/files/ZEYR-FINERI-LOGO-W-1.png" />
    <h1>Prestige Member</h1>
    </div>

    <div className="row bottom">
      <img src={`${hostLink}/qrCodes/qr_${accountDetails.id}.png`} alt="" className='card-qrcode'/>
      
    </div>
   
  </div>
  
</div>
    )}
    
 <button onClick={handlePrint} className='btn btn-primary ' style={{marginTop:'2rem'}}>Print Card</button>
    </div>

  )
}
export default MemberCard;
