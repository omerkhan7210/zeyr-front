// src/components/Cart.js
import React,{useState,useContext} from 'react';
import {CartContextC} from '../Context/CartContext';
import CartSidebar from './CartSidebar';

const Cart = () => {

  const {sidebarVisible} = useContext(CartContextC); 

  return (
    <div>
     
{sidebarVisible && <CartSidebar/>}

    </div>
  );
};

export default Cart;
