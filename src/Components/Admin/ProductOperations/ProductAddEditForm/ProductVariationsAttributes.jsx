import React, { useContext, useEffect, useState } from "react";
import { AddProductAdminContext } from "../../../Context/AddProductContext";

const ProductVariationsAttributes = () => {
  const { formData, setFormData } = useContext(AddProductAdminContext);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState(""); // Assuming this is a file input for image
  const [variations, setVariations] = useState([]); // Assuming this is a file input for image
  const generateVariationId = () => {
    return Math.random().toString(36).substring(2); // Convert to base36 and remove '0.'
  };

  
  const handleAddVariation = () => {
    const variationId = generateVariationId();
    let newVariationData = {
      variationid: variationId,
      attributeValues: [],
      attributeprice: price,
      attributestock: stock,
      attributeimg: image,
      productId:formData.id
    };
    if (color.trim() !== "") {
      newVariationData.attributeValues.push({
        attributeType: 'color',
        attributeValue: color.toLowerCase(),
      });
    }
    
    if (size.trim() !== "") {
      newVariationData.attributeValues.push({
        attributeType: 'size',
        attributeValue: size.toLowerCase(),
      });
    }
    

    const updatedVariations = [...formData.variations, newVariationData];

    setFormData({
      ...formData,
      variations: updatedVariations,
    });

    setPrice(formData.price);
    setStock(0);
    setImage("");
    setColor("");
    setSize("");

    
  };

  const handleRemoveVariation = (index) => {
    setFormData({
      ...formData,
      variations: [
        ...formData.variations.slice(0, index),
        ...formData.variations.slice(index + 1),
      ],
    });
  };


useEffect(()=>{

if(formData && formData.variations){
  setVariations(formData.variations);
}
},[formData])




  return (
    <div className="d-flex   align-center g2 justify-center">
      
      
<div className="d-flex flex-c g2 align-center w100">
<h6 style={{margin:'0'}}>Attributes</h6>
<div className="d-flex align-center g2 justify-between">
     
     <p className="input-wrapper w100" style={{margin:'0'}}>
           <input
             type="text"
             defaultValue={color}
             placeholder="Enter Color(Optional)"
             onChange={(e) => setColor(e.target.value)}
             className="input-text w100"
           />
     </p>
     <p className="  input-wrapper w100">
           <input
             type="text"
             placeholder="Enter Size(Optional)"
             defaultValue={size}
             onChange={(e) => setSize(e.target.value)}
             className="input-text w100"
           />
     </p>


  
 </div>
 <div className="mb3">
 <button className="btn btn--primary" onClick={(e) => {
  e.preventDefault();
  handleAddVariation();
}}>
  Add Attributes
</button>

   </div>
</div>
   
 {variations && variations.length > 0 ? (
     <div className="d-flex flex-c g1 align-center w100 mb4">
     
       <h6 style={{margin:'0'}}>Variations</h6>
      
       {variations.map((variation, index) => (
       
         <div
           key={index}
           className="w100"
           style={{ border: "1px solid black", padding: "10px", margin: "10px" }}
         >
           <div className="d-flex justify-between align-center mb1">
            {variation.attributeValues.map((a)=>(
                      <p className="m0">
                      {a.attributeType}: {a.attributeValue || "Not Specified"}
                      </p>
            ))}
            
             <button
               className="btn btn--primary"
               onClick={() => handleRemoveVariation(index)}
             >
               x
             </button>
           </div>

           <p className="input-wrapper">
             <label htmlFor={`price-${index}`}>Enter Price: </label>
             <input
               type="number"
               id={`price-${index}`}
               defaultValue={variation.attributeprice}
               onChange={(e) =>
                 setFormData({
                   ...formData,
                   variations: [
                     ...formData.variations.slice(0, index),
                     { ...variation, price: e.target.value },
                     ...formData.variations.slice(index + 1),
                   ],
                 })
               }
             />
           </p>

           <p className="input-wrapper">
             <label htmlFor={`stock-${index}`}>Stock: </label>
             <input
               type="number"
               id={`stock-${index}`}
               defaultValue={variation.attributestock}
               onChange={(e) =>
                 setFormData({
                   ...formData,
                   variations: [
                     ...formData.variations.slice(0, index),
                     { ...variation, stock: e.target.value },
                     ...formData.variations.slice(index + 1),
                   ],
                 })
               }
             />
           </p>

           <p className="input-row">
             <div className="featured-img-container d-flex flex-c justify-center align-center">
               <input
                 id={`image-${index}`}
                 type="file"
                 name="variationImage"
                 className="d-none"
                 accept="image/*"
                 onChange={(e) =>
                   setFormData({
                     ...formData,
                     variations: [
                       ...formData.variations.slice(0, index),
                       { ...variation, image: e.target.files[0] },
                       ...formData.variations.slice(index + 1),
                     ],
                   })
                 }
               />
               {!variation.image && (
               <label htmlFor={`image-${index}`} className="btn-1">
                 Upload Variation Image
               </label>
               )}
               {variation.image && (
                 <div className="position-r">
                  <p>Variation Image</p>
                  <button
                   style={{background:'transparent',border:'none'}}
                     onClick={() => {
                       handleRemoveVariation(index);
                     }}
                   >
                     x
                   </button>
                   <img
                     src={URL.createObjectURL(variation.image)}
                     alt={`Variation ${index + 1}`}
                     className="variation-img-admin mw100"
                   />
                   
                 </div>
               )}
             </div>
           </p>

         </div>
       ))}
     </div>
   ) : null}
 </div>
    
  );
};

export default ProductVariationsAttributes;