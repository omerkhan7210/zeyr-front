import React, { createContext,useEffect,useState } from 'react'
import axios from 'axios'
import { hostLink } from '../Hostlink/hostlink';
import { Link } from 'react-router-dom';

export const CategoriesContextC = createContext();

const CategoriesContext = ({children}) => {
    
  const [categories, setCategories] = useState([]);
  const [errorStatus, setErrorStatus] = useState('');
  // Define a state variable to manage selected category IDs
const [selectedCategories, setSelectedCategories] = useState([]);
const [totalCounts,setTotalCounts] = useState([])

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${hostLink}/categories`);
      setCategories(response.data);
      setErrorStatus('');
    } catch (error) {
      setErrorStatus(error.response ? error.response.status : 'Error fetching categories');
    }
  };

  const fetchTotalCount = async (catname) => {
    try {
      const response = await axios.get(`${hostLink}/categories/${catname}`);
      setErrorStatus('');
      return response.data;
    } catch (error) {
      setErrorStatus(error.response ? error.response.status : 'Error fetching categories');
    }
  };

  
  useEffect(() => {
    
    fetchCategories();
    const fetchTotalCounts = async () => {
      const counts = await Promise.all(
        categories.map(async (category) => {
          const total = await fetchTotalCount(category.name);
          return total;
        })
      );
      setTotalCounts(counts);
    };

     fetchTotalCounts();
  }, []);

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`${hostLink}/categories/${categoryId}`);
      // Update the categories list after deletion
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };
  
    const renderCategories = ( indent = 0) => (
      
      <div className= "tableView products-area-wrapper">
      <div className="products-header">
        <div className="product-cell image">
        Added Categories
          <button className="sort-button">
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 512 512">
              <path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
          </button>
        </div>
       
       
        <div className="product-cell stock">Total Products<button className="sort-button">
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
          </button></div>
       
          <div className="product-cell price">Actions<button className="sort-button">
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
          </button></div>
         
      </div>

      {categories
      .map( (category,index) => (
      <div className="products-row" key={category.id}>
        <button className="cell-more-button">
          <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx={12} cy={12} r={1} /><circle cx={12} cy={5} r={1} /><circle cx={12} cy={19} r={1} /></svg>
        </button>
        <div className="product-cell image">
        <img src={`${hostLink}/uploads/${category.thumbnail ? category.thumbnail : "placeholder.jpg"}`} alt="" />
         <span>{category.name}</span>
      
        </div>
       
        <div className="product-cell sales"><span className="cell-label"></span>{totalCounts[index]}</div>
        
        <div className="product-cell actions" style={{display:'flex',gap:'10px'}}>
        <Link target="_blank" to={`/categories/${category.name}`}  style={{marginBottom:'10px'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </Link>
        <a href="#" onClick={(e)=>{ handleEdit(category)}}  style={{marginBottom:'10px'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>        
        </a>
        
      <a href="#" onClick={(e)=>{
            handleDelete(category._id)
          }}  style={{marginBottom:'10px'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>        
        </a>
        </div>
      </div>
      ))}
    </div>


        
      );
      const renderCategoriesCheckboxes = (categories,presentCat, indent = 0) => (
       

        <ul  style={{textAlign:'center',listStyleType:'none',padding:'0'}}>
           
          {categories.map((category) => (
            <li key={category._id} >
              <label className='d-flex align-center' style={{gap:'6px',textTransform:'uppercase'}}>
              <input
  type="checkbox"
  checked={presentCat ?
    (typeof presentCat !== 'number' && presentCat.toLowerCase() === category.name.toLowerCase()) :
    isSelected(category._id)
  }
  onChange={() => handleCheckboxChange(category._id)}
/>

                {Array(indent + 1).join('—')} {category.name}{' '}
              </label>
              {category.subcategories && category.subcategories.length > 0 && (
                renderCategoriesCheckboxes(category.subcategories, indent + 2)
              )}
            </li>
          ))}
        </ul>
      );

// Function to check if a category is selected
const isSelected = (categoryId) => selectedCategories.includes(categoryId);

// Function to handle checkbox changes
const handleCheckboxChange = (categoryId) => {
  if (isSelected(categoryId)) {
    setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
  } else {
    setSelectedCategories([...selectedCategories, categoryId]);
  }
};
// Function to get the names of selected categories and their parents
const getSelectedCategoryNames = (categoryId) => {
  const findCategoryWithId = (categories, id) => {
    for (const category of categories) {
      if (category._id === id) {
        return category;
      }
      if (category.subcategories.length > 0) {
        const found = findCategoryWithId(category.subcategories, id);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  const selectedCategory = findCategoryWithId(categories, categoryId);

  if (selectedCategory) {
    const categoryNames = [selectedCategory.name];
    let parentCategory = findCategoryWithId(categories, selectedCategory.parentId);

    while (parentCategory) {
      categoryNames.unshift(parentCategory.name);
      parentCategory = findCategoryWithId(categories, parentCategory.parentId);
    }

    return categoryNames.join(' > ');
  }

  return '';
};

// Get an array of selected category names
const selectedCategoryNames = selectedCategories.map(getSelectedCategoryNames);



  return (
    <CategoriesContextC.Provider value={{categories,errorStatus,renderCategoriesCheckboxes,selectedCategoryNames,renderCategories,setCategories}}>
        {children}
    </CategoriesContextC.Provider>
  )
}

export default CategoriesContext;
