import React from "react";

export const RetailLocations = () => {
  return (
    <main id="MainContent" className="content-for-layout" role="main" tabIndex={-1}>
      <section id="shopify-section-template--15167015747649__main" className="shopify-section store-locator"><style type="text/css" dangerouslySetInnerHTML={{ __html: "\n  .store-locator {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    grid-gap: 1.5rem .75rem;\n    padding: 0 .75rem;\n    margin-top: 1.5rem; \n    text-transform: uppercase;\n  }\n\n  .store-locator h2 {\n    margin: .75rem 0;\n  }\n\n  .store-locator p {\n    margin-bottom: 0;\n  }\n  \n  @media screen and (min-width: 1025px) {\n    .store-locator {  \n      grid-template-columns: repeat(4, 1fr);      \n    }\n  }\n" }} />
      {Array.from({ length: 8 }).map((_, index) => (
         <div>
         <a href="https://www.google.com/maps/place/19501+Biscayne+Blvd+SPACE+K-1971,+Miami,+FL+33180/data=!4m2!3m1!1s0x88d9acf6423fffff:0xd5801607ba6b9106?sa=X&ved=2ahUKEwiHzNLq_s6DAxVBM1kFHUPXCx0Q8gF6BAgiEAA" target="_blank" rel="noreferrer noopener" className="link-styled">
          
         <img loading="lazy" src="//amiri.com/cdn/shop/files/AMIRI_AVENTURA.jpg?v=1704823468&width=540" alt width={540} height={360.0} style={{'--imageFocal': 'middle'}} />
      
      <h2 className="h6">
           AMIRI-AVENTURA (POP-UP) 
           <svg width={10} className="icon icon-map-pin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 18.29">
             <title>Map Pin</title>
             <path d="M5.5,0A5.61,5.61,0,0,0,0,5.72,5.81,5.81,0,0,0,.77,8.63L5.5,18.29l4.73-9.66A5.81,5.81,0,0,0,11,5.72,5.61,5.61,0,0,0,5.5,0Zm0,7.71A2.47,2.47,0,1,1,8,5.24,2.47,2.47,0,0,1,5.5,7.71Z" />
           </svg></h2>
           </a>
           <div className="store-info"><p><strong>Address:</strong> 19501 Biscayne Blvd. Space # K-1971 Aventura, FL 33180<br />
           <strong>Hours: </strong>Mon-Sat: 11am-9pm<br />Sun: 12pm-7pm</p><p><strong>Phone:</strong> 786-898-7127</p>
           <p>
             <strong>Email:</strong> aventura@amiri.com
             </p>
             </div>
       </div>
        
      ))}
      </section>
    </main>

  );
};
