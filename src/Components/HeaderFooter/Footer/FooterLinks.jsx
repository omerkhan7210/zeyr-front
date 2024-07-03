import {useEffect,useState } from 'react'
import { Link } from "react-router-dom";
import {AnimatePresence, motion} from 'framer-motion'

export const FooterLinks = () => {
  
    const footerSections = [
        {
          heading: "ABOUT ZEYR FINERI",
          links: [
            { text: "Retail Locations", to: "/pages/stores" },
            { text: "Stockists", to: "/pages/stockists-so" },
            { text: "Careers", to: "https://zairtaz.com/careers-at-zeyr-fineri/" },
            { text: "Community", to: "/pages/community" },
            { text: "ZEYR FINERI PRIZE", to: "#" },
          ],
        },
        {
          heading: "Client services",
          links: [
            { text: "Holiday FAQ", to: "/pages/shipping-returns" },
            { text: "Shipping & Returns", to: "/pages/shipping-returns" },
            { text: "US Returns", to: "#" },
            { text: "International Returns", to: "#" },
            { text: "Terms of Use", to: "/pages/terms-of-use" },
            { text: "Privacy Policy", to: "/pages/privacy" },
          ],
        },
        {
          heading: "Connect",
          links: [
            { text: "Contact", to: "/pages/contact" },
            { text: "Facebook", to: "https://m.facebook.com/zeyrfineri/" },
            { text: "Instagram", to: "https://www.instagram.com/" },
          ],
        },
      ];
      const [isOpenStates, setIsOpenStates] = useState(new Array(footerSections.length).fill(false));
      const [isMobile,setisMobile] = useState(false)


      const toggleDisclosure = (index) => {
        const newIsOpenStates = [...isOpenStates];
        newIsOpenStates[index] = !newIsOpenStates[index];
        setIsOpenStates(newIsOpenStates);
      };

        useEffect(() => {
          // Scroll to the top of the page when a link is clicked
          const handleLinkClick = () => {
            window.scrollTo(0, 0);
          };
          setisMobile(window.innerWidth <= 768); // Define your mobile breakpoint

          // Add click event listeners to all links
          const links = document.querySelectorAll(".menu-item.link-styled");
          links.forEach((link) => {
            link.addEventListener("click", handleLinkClick);
          });
      
          // Remove event listeners when the component unmounts
          return () => {
            links.forEach((link) => {
              link.removeEventListener("click", handleLinkClick);
            });
          };
        }, []);
    
  return (
    <div className='footer__blocks-wrapper flex jcb flex--mobile '>
   <div className="footer__blocks flex flex--mobile">
      {footerSections.map((section, index) => (
        <div className="footer-block" key={index}>
          <div className={`footer-block__disclosure mobile--only ${isOpenStates[index] ? 'details--active' : ''}`} open={isOpenStates[index]}>
            <summary
              className="flex jcb aic footer__heading"
              aria-label={`Toggle ${section.heading}`}
              role="button"
              aria-controls={`footer-block-link_list-${index + 1}`}
              aria-expanded={isOpenStates[index]}
              
              onClick={() => toggleDisclosure(index)}
            >
              {section.heading}<span className="details__icon"></span>
            </summary>
            <AnimatePresence>
            {isMobile && isOpenStates[index] ? 
            <motion.div 
            initial={{opacity:0}}
            exit={{opacity:0}}
            animate={{opacity:1,transition:{duration:0.5}}}
            id={`footer-block-link_list-${index + 1}`}>
              <ul className="footer-block__linklist list-unstyled">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.to.startsWith('http') ? (
                      <a href={link.to} className="menu-item link-styled">
                        {link.text}
                      </a>
                    ) : (
                      <Link to={link.to} className="menu-item link-styled">
                        {link.text}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
            : null}
            </AnimatePresence>
            {!isMobile && 
            <div id={`footer-block-link_list-${index + 1}`}>
            <ul className="footer-block__linklist list-unstyled">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  {link.to.startsWith('http') ? (
                    <a href={link.to} className="menu-item link-styled">
                      {link.text}
                    </a>
                  ) : (
                    <Link to={link.to} className="menu-item link-styled">
                      {link.text}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          }
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}
