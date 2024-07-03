import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { hostLink, hostLink as hostlink } from '../../Hostlink/hostlink';
import { ProductFetchContext } from '../../Context/ProductFetch';
import PriceFormatter from '../../Products/PriceFormatter';


const AddShippingDetails = () => {
  const [shippingMethods, setShippingMethods] = useState([]);
  const [nshippingMethods, setNShippingMethods] = useState();
  const [buttonText,setButtonText] = useState('Add Shipping')
  const [id,setID] = useState()
  const [newShipping, setNewShipping] = useState({
    id:'',
    name: '',
    description: '',
    price: '',
    country: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

const clearEverything = async ()=>{
    
  setNewShipping({ name: '', description: '', price: '', country: '' });
  setButtonText('Add Shipping');

}
  
  useEffect(() => {
    const { name, description, price } = newShipping;
    if (name === '' && description === '' && price === '') {
       setNewShipping(prevState => ({ ...prevState, id: '' }));
        setButtonText('Add Shipping');
    }
}, [newShipping.name,newShipping.price,newShipping.description,newShipping.country]); // Remove newMemberships from the dependency array


  const handleSignup = async (e) => {
    e.preventDefault();
    try {
       // Validate and add the new shipping method to the list
    if (newShipping.name && newShipping.description && newShipping.price && newShipping.country) {
      setNShippingMethods({ ...newShipping });
      setErrorMessage('')
    
        const response = await axios.post(`${hostlink}/add-shipping-methods`, { nshippingMethods });
       
        if(response.status === 200){
          await fetchShippings()
          setNewShipping({ name: '', description: '', price: '', country: '' });
          setNShippingMethods([]);
        }
        setErrorMessage(response.data.message);
  
        setErrorMessage('');
    }
      else {
        setErrorMessage('Please fill in all fields for the new shipping method.');
      }
     
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const handleEdit = async (id,e) => {
    e.preventDefault();
    setID(id)
    setButtonText('Edit Shipping')
    
    const filteredsm = shippingMethods.filter((sm)=> sm.id === id)
    setNewShipping(filteredsm[0])
  };

  const EditConfirm = async (e)=>{
    e.preventDefault();
    try {
      const response = await axios.put(`${hostlink}/edit-shipping-methods/${id}`, { nshippingMethods : newShipping });
     
      if(response.status === 200){
        await fetchShippings()
        setNewShipping({ name: '', description: '', price: '', country: '' });
        setNShippingMethods([]);
        setButtonText('Add Shipping')
      }
      setErrorMessage(response.data.message);
   
  } catch (error) {
    setErrorMessage(error.response.data.message);
  }
  }

  const handleDelete = async (id,e) => {
    e.preventDefault();
    try {
        const response = await axios.delete(`${hostlink}/delete-shipping-methods/${id}`);
       
        if(response.status === 200){
          await fetchShippings()
          setNewShipping({ name: '', description: '', price: '', country: '' });
          setNShippingMethods([]);
        }
        setErrorMessage(response.data.message);
     
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const {selectedCurrencyLocale,selectedCurrencyCode} = useContext(ProductFetchContext);

  const fetchShippings = async ()=>{
     // Fetch shipping methods from the backend API
     axios
     .get(`${hostLink}/retrieve-shipping`)
     .then((response) => {
       setShippingMethods(response.data);
     })
     .catch((error) => {
       console.error("Error fetching shipping methods:", error);
     });
  }
  useEffect(() => {
    fetchShippings()
  }, []);

  const countries = [
    "Australia",
    "Bahrain",
    "Kuwait",
    "Malaysia",
    "New Zealand",
    "Oman",
    "Pakistan",
    "Qatar",
    "Saudi Arabia",
    "Singapore",
    "Turkey",
    "UAE",
    "Pakistan"
  ];
  return (
    <main
    id="MainContent"
    className="content-for-layout"
    role="main"
    tabIndex="-1"
    style={ {width: "100%"}  }
  >
    
      <div
        id="shopify-section-template--14940997288001__main"
        class="shopify-section shippingadmin light"
      >
        <link
          href="/cdn/shop/t/300/assets/customer.css?v=134172538491655289751689270880"
          rel="stylesheet"
          type="text/css"
          media="all"
        />
        <style data-shopify="">
          {`
        #shopify-section-template--14940997288001__main .section-padding {
         padding-top: 18px;
         padding-bottom: 18px;
         }
         @media screen and (min-width: 769px) {        
         #shopify-section-template--14940997288001__main .section-padding {
         padding-top: 36px;
         padding-bottom: 36px;
         }
         }
         `}
        </style>
        {/* left section */}
        <div className="section section--shipping-method leftsectionshipping light">
      <div className="section__header">
        <h2 className="section-heading">
          Shipping method
        </h2>
      </div>

      <div className="tableView products-area-wrapper">
      <div className="products-header">
       
        <div className="product-cell category">Name</div>
        <div className="product-cell category">Description</div>
        <div className="product-cell price">Price</div>
        <div className="product-cell country">Country</div>
          <div className="product-cell price">Actions</div>
         
      </div>

    {shippingMethods && shippingMethods.length > 0 && 
      shippingMethods.map((product,index) => (
        
    <div className="products-row" key={product.id}>
   
      <button className="cell-more-button">
        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx={12} cy={12} r={1} /><circle cx={12} cy={5} r={1} /><circle cx={12} cy={19} r={1} /></svg>
      </button>
     
      <div className="product-cell category"><span className="cell-label">Name:</span>{product.name}</div>

      <div className="product-cell category"><span className="cell-label">Description:</span>{product.description}</div>
      
      <div className="product-cell price"><span className="cell-label">Price:</span>
      {product.price === 0 ? "Free" :
      <PriceFormatter price={product.price} locale={selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/>
      }
       </div>

      <div className="product-cell category"><span className="cell-label">Country:</span>{product.country}</div>
      
      <div className="product-cell actions" style={{display:'flex',gap:'10px'}}>
     
      <a href="#" onClick={(e)=>{
        handleEdit(product.id,e)
        }}  style={{marginBottom:'10px'}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        </a>
        <a href="#" onClick={(e)=>{
        handleDelete(product.id,e)
        }}  style={{marginBottom:'10px'}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>        
      </a>
      </div>
    </div>
  
      ))}

      </div>
        </div>
        {/* right section */}
        <div
          class="customer customer--register section-padding page-width text-center rightsectionshipping"
          style={{ pageWidth: "100%" }}
        >
          <svg style={{ display: "none" }}>
            <symbol id="icon-error" viewBox="0 0 13 13">
              <circle
                cx="6.5"
                cy="6.50049"
                r="5.5"
                stroke="white"
                stroke-width="2"
              ></circle>
              <circle
                cx="6.5"
                cy="6.5"
                r="5.5"
                fill="#EB001B"
                stroke="#EB001B"
                stroke-width="0.7"
              ></circle>
              <path
                d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z"
                fill="white"
              ></path>
              <path
                d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z"
                fill="white"
                stroke="#EB001B"
                stroke-width="0.7"
              ></path>
            </symbol>
          </svg>
          <h2 class="section-heading">
            Create shipping method
            
            </h2>
          <form
            id="create_customer"
            onSubmit={buttonText === 'Add Shipping' ? handleSignup : EditConfirm}
            accept-charset="UTF-8"
            novalidate="novalidate"
          >
            {errorMessage && <p>{errorMessage}</p>}
          
            <div class="input-wrapper">
        <label for="shipping-name" class="visually-hidden">
          Shipping Name
        </label>
        <input
          type="text"
          id="shipping-name"
          value={newShipping.name}
          onChange={(e) => setNewShipping({ ...newShipping, name: e.target.value })}
          aria-required="true"
          placeholder="Enter Shipping Name"
          required
        />
      </div>
      <div class="input-wrapper">
        <label for="shipping-description" class="visually-hidden">
          Shipping Description
        </label>
        <input
          type="text"
          id="shipping-description"
          value={newShipping.description}
          onChange={(e) => setNewShipping({ ...newShipping, description: e.target.value })}
          aria-required="true"
          placeholder="Enter Shipping Description"
          required
        />
      </div>
      <div class="input-wrapper">
        <label for="shipping-price" class="visually-hidden">
          Shipping Price
        </label>
        <input
          type="number"
          id="shipping-price"
          value={newShipping.price}
          onChange={(e) => setNewShipping({ ...newShipping, price: e.target.value })}
          aria-required="true"
          placeholder="Enter Shipping Price"
          required
        />
      </div>
      <div class="input-wrapper" style={{borderBottom:'none'}}>
        <label for="shipping-countries" class="visually-hidden">
          Shipping Countries
        </label>
        <select
          style={{width:'100%'}}
          id="shipping-countries"
          value={newShipping.country}
          onChange={(e) => setNewShipping({ ...newShipping, country:  e.target.value })}
          aria-required="true"
          required
        >
          {newShipping.country === '' && 
           <option value="">Select country</option>
          }
          {countries.map((i)=>(

            <option value={i}>{i}</option>
          ))}
        </select>
      </div>
      <button type="submit" className='btn btn--primary'>
        {buttonText}
      </button>

      {buttonText === 'Edit Shipping' && <button style={{marginLeft:'1rem'}} type="button" className='btn btn--primary' onClick={clearEverything}>
        Clear
      </button>}
    

          </form>

        </div>


      </div>
    </main>
  );
};

export default AddShippingDetails;
