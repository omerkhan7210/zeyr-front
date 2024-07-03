
import React, { createContext, useState,useContext } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import DOMPurify from 'dompurify';
import { CategoriesContextC } from "./CategoriesContext";
import { hostLink } from '../Hostlink/hostlink';

export const AddProductAdminContext = createContext();

 const AddProductContext = ({children}) => {
 
const [formData, setFormData] = useState({
        name: '',
        price: '',
        salePrice:'',
        categories: '',
        sku: '',
        isOnSale: false,
        isFeatured: false,
        featuredImage: null,
        thumbnailImages: [],
        videos: '',
        shortDescription: '',
        longDescription: '',
         status: "draft", // Status can be either "draft" or "published"
          variations: [], // An array to hold different variations based on the selected attributes
});

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const history = useNavigate();
  const {selectedCategoryNames} = useContext(CategoriesContextC) ;

const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show the loading icon
        setSuccessMessage('');
        setErrorMessage('');
      
        try {
        
          const parsedCategories = selectedCategoryNames.map(category => {
            if (category.includes(" > ")) {
              const [parentCategory, subcategory] = category.split(" > ");
              return { category: parentCategory, subcategory };
            } else {
              return { category, subcategory: null };
            }
          });
      
          const uniqueCategories = [...new Set(parsedCategories.map(parsedCategory => parsedCategory.category))];
          const uniqueSubcategories = parsedCategories.map(parsedCategory => parsedCategory.subcategory);
      
          // Remove NULL from subcategories array
          const filteredSubcategories = uniqueSubcategories.filter(subcategory => subcategory !== null);
      
          // Create the final formData object to send to the server
          const formDataToSend = {
            ...formData,
            categories: uniqueCategories.join(', '), // Convert to comma-separated string
            subcategories: filteredSubcategories.join(', '), // Convert to comma-separated string
          };
      
          // Convert the thumbnail images array to a FormData object to handle file upload
          const formDataWithFiles = new FormData();
          for (const key in formDataToSend) {
            if (key === 'thumbnailImages') {
              for (const thumbnailImage of formDataToSend.thumbnailImages) {
                formDataWithFiles.append('thumbnailImages', thumbnailImage);
              }
            } else if (key === 'featuredImage' && formDataToSend.featuredImage) {
              formDataWithFiles.append('featuredImage', formDataToSend.featuredImage);
            } 
            else if (key === 'variations') {
              // Handle variation images
              const variationsArray = formDataToSend.variations;
              for (const variation of variationsArray) {
               
                if (variation.image) {
                
                  formDataWithFiles.append(`variationImages`, variation.image);
                  
                }
              }
            } 
          }
      
          const response = await axios.post(`${hostLink}/products`, formDataToSend, {
            headers: {
              'Content-Type': 'application/json', // Set the correct content type for JSON data
            },
          });
          
          const productId = response.data.productId;
          if(response.data.message === "Success"){
            const response2 = await axios.post(`${hostLink}/upload-images/${productId}`, formDataWithFiles);
            // Redirect to the home page after a short delay (e.g., 1 second)
            setSuccessMessage(response2.data.message)
            setTimeout(() => {
              window.location.href = "/dashboard"
            }, 1000);
          }
          
        
        }catch (error) {
          console.log(error)
          setErrorMessage(DOMPurify.sanitize(error.message));
        } finally {
          setLoading(false); // Hide the loading icon
        }
        
}
      
const handleSubmitEdit = async (e,productId) => {
        e.preventDefault();
        setLoading(true); // Show the loading icon
        setSuccessMessage('');
        
        const parsedCategories = selectedCategoryNames.map(category => {
          if (category.includes(" > ")) {
            const [parentCategory, subcategory] = category.split(" > ");
            return { category: parentCategory, subcategory };
          } else {
            return { category, subcategory: null };
          }
        });
    
        const uniqueCategories = [...new Set(parsedCategories.map(parsedCategory => parsedCategory.category))];
        const uniqueSubcategories = parsedCategories.map(parsedCategory => parsedCategory.subcategory);
    
        // Remove NULL from subcategories array
        const filteredSubcategories = uniqueSubcategories.filter(subcategory => subcategory !== null);
    
        // Create the final formData object to send to the server
        const formDataToSend = {
          ...formData,
          categories: uniqueCategories.join(', '), // Convert to comma-separated string
          subcategories: filteredSubcategories.join(', '), // Convert to comma-separated string
        };
    
        // Convert the thumbnail images array to a FormData object to handle file upload
        const formDataWithFiles = new FormData();
        for (const key in formDataToSend) {
          if (key === 'thumbnailImages') {
            for (const thumbnailImage of formDataToSend.thumbnailImages) {
              formDataWithFiles.append('thumbnailImages', thumbnailImage);
            }
          } else if (key === 'featuredImage' && formDataToSend.featuredImage) {
            formDataWithFiles.append('featuredImage', formDataToSend.featuredImage);
          } 
          else if (key === 'variations') {
            // Handle variation images
            const variationsArray = formDataToSend.variations;
            for (const variation of variationsArray) {
             
              if (variation.image) {
              
                formDataWithFiles.append(`variationImages`, variation.image);
                
              }
            }
          } 
        }

        try {
          const response = await axios.put(`${hostLink}/products/${productId}`, formDataToSend);
          // Redirect or perform any other action after updating the product
          setSuccessMessage(response.data.message);
          setLoading(false)
         
          if(response.data.message === "success"){
            const response2 = await axios.post(`${hostLink}/upload-images/${productId}`, formDataWithFiles);
            // Redirect to the home page after a short delay (e.g., 1 second)
            setSuccessMessage("Product Edited Successfully")
            setTimeout(() => {
              window.location.reload()
            }, 1000);
          }
        } catch (error) {
          console.log(error)
          setErrorMessage(DOMPurify.sanitize(error.response));
        } finally {
          setLoading(false); // Hide the loading icon
        }
};
          
const handleFileChange = (e) => {
        const files = e.target.files;
        if (e.target.name === 'featuredImage') {
          setFormData((prevFormData) => ({ ...prevFormData, featuredImage: files[0] }));
        } else if (e.target.name === 'thumbnailImages') {
          setFormData((prevFormData) => ({ ...prevFormData, thumbnailImages: [...files] }));
        }
};
      
          // Function to handle image removal
const handleFeaturedImageRemove = () => {
    setFormData({ ...formData, featuredImage: null });
  };

      const handleImageRemove = (index) => {
        const newThumbnailImages = formData.thumbnailImages.filter((_, i) => i !== index);
        setFormData({ ...formData, thumbnailImages: newThumbnailImages });
      };
      

  return (
    <AddProductAdminContext.Provider
    value={{formData,handleFileChange,handleImageRemove,handleSubmit,handleSubmitEdit,setFormData,loading,successMessage,errorMessage,handleFeaturedImageRemove}}>
        {children}
    </AddProductAdminContext.Provider>
  )
}

export default AddProductContext;
