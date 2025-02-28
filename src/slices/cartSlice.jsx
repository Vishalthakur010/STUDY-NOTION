import { createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-hot-toast'

const initialState = {
        cart : localStorage.getItem('cart') 
        ? JSON.parse( localStorage.getItem('cart')) 
        : [],

        total : localStorage.getItem('total') 
        ? JSON.parse( localStorage.getItem('total')) 
        : 0,

        totalItems : localStorage.getItem('totalItems') 
        ? JSON.parse( localStorage.getItem('totalItems')) 
        : 0
}

const cartSlice = createSlice({
        name:"cart",
        initialState:initialState,
        reducers:{
                //add to cart
                addToCart:(state,action)=>{

                },

                //remove from cart
                removeFromCart:(state,action)=>{

                },

                //reset cart
                resetCart:(state,action)=>{

                }
        }
})

export const { addToCart, removeFromCart, resetCart} = cartSlice.actions
export default cartSlice.reducer