import React, { useContext } from 'react'
import PriceFormatter from '../../Products/PriceFormatter'
import { Link } from 'react-router-dom'
import { hostLink } from '../../Hostlink/hostlink'
import { ProductFetchContext } from '../../Context/ProductFetch'
import { AdminContextC } from '../../Context/AdminContext'
import axios from 'axios'

export const ProductRows = ({product,totalCounts,totalRev,totalStock,index,fetchProducts,selectedProducts,setSelectedProducts}) => {
  
  const {setProductID,setActiveLink} = useContext(AdminContextC)
   // Handle deletion of a product
   const handleDelete = async (productId) => {
    try {
      await axios.delete(`${hostLink}/products/${productId}`);
      // Fetch updated product list from the server after deletion
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  // Handle duplication of a product
const handleDuplicate = async (productId) => {
  try {
    const response = await axios.post(`${hostLink}/products/${productId}/duplicate`);
    // Fetch updated product list from the server after duplication
    fetchProducts();
  } catch (error) {
    console.error(error);
  }
};

const handleDownloadClick = async () => {
  const barcodeImageSrc = `${hostLink}/productBarCodes/barcode_${product.id}.png`;

  try {
    const response = await fetch(barcodeImageSrc);
    const blob = await response.blob();

    // Create a temporary link element
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = `barcode_${product.id}.png`;

    // Trigger a click on the link to start the download
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Remove the temporary link element from the DOM
    document.body.removeChild(downloadLink);
  } catch (error) {
    console.error('Error downloading image:', error);
  }
};

const handleSelectProduct = (productId) => {
  setSelectedProducts((prevSelected) => {
    if (prevSelected.includes(productId)) {
      return prevSelected.filter((id) => id !== productId);
    } else {
      return [...prevSelected, productId];
    }
  });
};



const {selectedCurrencyLocale,selectedCurrencyCode} = useContext(ProductFetchContext);
  return (
    
    <div className="products-row" key={product.id}>
      <input
        type="checkbox"
        checked={selectedProducts.includes(product.id)}
        onChange={() => handleSelectProduct(product.id)}
      />
    

        <button className="cell-more-button">
          <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx={12} cy={12} r={1} /><circle cx={12} cy={5} r={1} /><circle cx={12} cy={19} r={1} /></svg>
        </button>
        <div className="product-cell image">
        <img src={`${hostLink}/uploads/${product.featuredImage}`} alt="" />
         <span>{product.name}</span>
        </div>
        <div className="product-cell category"><span className="cell-label">Slug:</span>{product.slug}</div>

        <div className="product-cell category"><span className="cell-label">Category:</span>{product.categories}</div>
        <div className="product-cell status-cell">
          <span className="cell-label">Status:</span>
          <span className="status active">{product.status === 'published' ? "Published" : "Draft"}</span>
        </div>
        <div className="product-cell stock"><span className="cell-label">Stock:</span>{totalStock[index] > 0 ? totalStock[index] : "Out of stock"}</div>
        <div className="product-cell price"><span className="cell-label">Price:</span>
        <PriceFormatter price={product.price} locale={selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/>
         </div>
        
        <div className="product-cell sales"><span className="cell-label">Sales:</span>{totalCounts[index] > 0 ? totalCounts[index] : "No sales"}</div>
        <div className="product-cell revenue"><span className="cell-label">Revenue:</span>{totalRev[index] > 0 ? "$" + totalRev[index] : "No revenue"}</div>
        
        <div className="product-cell barcodes" >
        <img style={{background:'white'}} src={`${hostLink}/productBarCodes/barcode_${product.id}.png`} alt="" />
        <Link onClick={handleDownloadClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </Link>
        </div>

        <div className="product-cell actions" style={{display:'flex',gap:'10px'}}>
        <Link target="_blank" to={`/products/${product.slug}`}  style={{marginBottom:'10px'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </Link>
        <a href="#" onClick={()=>{
          setProductID(product.id)
          setActiveLink('editProduct')
          }}  style={{marginBottom:'10px'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>        
        </a>
        
        <a href="#" onClick={()=>{
          handleDuplicate(product.id)
          }}  style={{marginBottom:'10px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>        </a>
          <a href="#" onClick={(e)=>{
          handleDelete(product.id)
          }}  style={{marginBottom:'10px'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>        
        </a>
        </div>
      </div>
    
  
  )
}
