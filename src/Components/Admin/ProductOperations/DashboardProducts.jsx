import React,{ useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { hostLink, hostLink as hostlink } from '../../Hostlink/hostlink';
import { ProductsFilter } from './ProductsFilter';
import ToggleSwitchButton from '../ToggleSwitchButton';
import { AdminContextC } from '../../Context/AdminContext';
import {ProductRows} from './ProductRows'
import { CategoriesContextC } from '../../Context/CategoriesContext';



export const DashboardProducts = () => {

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCatQuery, setSearchCatQuery] = useState('');
  const [layout, setLayout] = useState(true);
  const [layout2, setLayout2] = useState(false);
const [totalCounts,setTotalCounts] = useState([])
const [totalStock,setTotalStock] = useState([])
const [totalRev,setTotalRev] = useState([])
const [selectedProducts, setSelectedProducts] = useState([]);
  const [bulkEditCategories, setBulkEditCategories] = useState('');
  const [bulkEditStatus, setBulkEditStatus] = useState('');
  const [openBulkEditForm,setOpenBulkEditForm] = useState(false)
  const {categories} = useContext(CategoriesContextC)

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch all products from the server
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${hostlink}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

 
const handleSearchChange = (event) => {
  setSearchQuery(event.target.value);
};

const handleFilterCategoryChange = (event) => {
  setSearchCatQuery(event.target.value);
};

const fetchTotalCounts = async () => {
  try {
    const results = await Promise.all(
      products.map(async (product) => {
        const response = await axios.get(`${hostlink}/products-sales/${product.id}`);
        return { totalcount: response.data.totalcount, totalamount: response.data.totalamount };
      })
    );

    const counts = results.map((result) => result.totalcount);
    const rev = results.map((result) => result.totalamount);

    setTotalCounts(counts);
    setTotalRev(rev);

     // Process your data to fit the chart structure
    
  } catch (error) {
    // Handle errors appropriately
    console.error('Error fetching total counts and amounts:', error);
    // Set an error state or log the error as needed
  }
};
const fetchTotalStock = async () => {
  try {
    const results = await Promise.all(
      products.map(async (product) => {
        const response = await axios.get(`${hostlink}/products-stock/${product.id}`);
        return response.data;
      })
    );


    setTotalStock(results);
  } catch (error) {
    // Handle errors appropriately
    console.error('Error fetching total counts and amounts:', error);
    // Set an error state or log the error as needed
  }
};
useEffect(() => {
  fetchTotalCounts();
  fetchTotalStock();
   
   
}, [products]);


const handleBulkEdit = async (selectedProducts) => {
  try {
    if(bulkEditCategories){
      await axios.post(`${hostLink}/bulkEdit`, {
        productIds: selectedProducts,
        newCategories: bulkEditCategories,
      });
    }
    
    if(bulkEditStatus){
      await axios.post(`${hostLink}/bulkEditStatus`, {
        productIds: selectedProducts,
        newStatus: bulkEditStatus,
      });
    }
    
    fetchProducts();
    } catch (error) {
      console.error(error);
    }
};



  return (
    <div className="app-content ">
    <div className="app-content-header">
      <h1 className="app-content-headerText">Products</h1>
     
     <ToggleSwitchButton/>
       
     </div>
   <ProductsFilter handleSearchChange={handleSearchChange} 
   searchQuery={searchQuery} 
   layout={layout} 
   layout2={layout2} 
   setLayout2={setLayout2}
   setLayout={setLayout}
   handleFilterCategoryChange={handleFilterCategoryChange}
   fetchProducts={fetchProducts}
   />
   {selectedProducts && selectedProducts.length > 0 &&
  <div className='d-flex'>
  <button className='btn btn--primary w25 m1' onClick={() => setOpenBulkEditForm(true)}>Bulk Edit</button>

{openBulkEditForm && (
 <div className='bulkeditcat d-flex g1 w100 align-center'>
  
  <button className='closeicon' onClick={() => setOpenBulkEditForm(false)}>X</button>
 

 {categories && categories.length > 0 && (
   <div className='bulkcat'>
    <p style={{margin:0}}> Edit Categories</p>
     {categories.map((category, index) => (
       <label key={index}>
        <input
  type="radio"
  name="bulkEditCategory"
  value={category.name} // Use a specific property of the category object
  checked={bulkEditCategories === category.name}
  onChange={(e) => setBulkEditCategories(e.target.value)}
/>
         {category.name}
       </label>
     ))}
   </div>
 )}

 <div className="bulkstatus">
 <p style={{margin:0}}> Edit Status</p>
 <label>
        <input
  type="radio"
  name="bulkEditStatus"
  value="published"
  onChange={(e) => setBulkEditStatus(e.target.value)}
/>
Published
       </label>
       <label>
        <input
  type="radio"
  name="bulkEditStatus"
  value="draft"
  onChange={(e) => setBulkEditStatus(e.target.value)}
/>
Draft
       </label>
 </div>
 <button className='btn btn--primary' onClick={() => handleBulkEdit(selectedProducts)}>
   Apply Changes
 </button>
</div>
)}
  </div>
}
 
    <div className={`${layout ? "tableView" : "gridView"} products-area-wrapper `}>
      <div className="products-header">
        <div className="product-cell image">
          Products
          <button className="sort-button">
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 512 512">
              <path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
          </button>
        </div>
        <div className="product-cell category">Slug<button className="sort-button">
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
          </button></div>
        <div className="product-cell category">Category<button className="sort-button">
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
          </button></div>
        <div className="product-cell status-cell">Status<button className="sort-button">
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
          </button></div>
          <div className="product-cell stock">Stock<button className="sort-button">
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
          </button></div>
        <div className="product-cell price">Price<button className="sort-button">
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
          </button></div>
        <div className="product-cell sales">Sales<button className="sort-button">
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
          </button></div>     
          <div className="product-cell sales">Revenue<button className="sort-button">
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
          </button></div>
          <div className="product-cell sales">Barcodes<button className="sort-button">
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
          </button></div>
        
          <div className="product-cell price">Actions<button className="sort-button">
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
          </button></div>
         
      </div>

      {products
      .filter((product) => {
        // Perform filtering based on searchQuery
        const productName = product.name.toLowerCase();
        const searchLower = searchQuery.toLowerCase();
        return productName.includes(searchLower) && product.categories.includes(searchCatQuery);
      })
      .map((product,index) => (
        <ProductRows 
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        fetchProducts={fetchProducts}
        product={product} 
        totalCounts={totalCounts} 
        totalRev={totalRev} 
        totalStock={totalStock} 
        index={index}/>
      ))}
    </div>
    
    
  </div>
  )
}
