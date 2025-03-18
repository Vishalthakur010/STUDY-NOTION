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
        initialState,
        reducers:{
                //add to cart
                addToCart:(state,action)=>{
                        const course= action.payload
                        const index= state.cart.findIndex((item) => item._id === course._id)

                        // if the course is already in cart, do not modify the quantity
                        if(index >=0){
                                toast.error("Course already in cart")
                                return
                        }

                        // if the course is not in the cart, add it to the cart
                        state.cart.push(course)
                        //update the total quantity and price
                        state.totalItems++
                        state.total += course.price

                        //update to local storage
                        localStorage.setItem("cart", JSON.stringify(state.cart))
                        localStorage.setItem("total", JSON.stringify(state.total))
                        localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

                        //show toast
                        toast.success("Course added to cart")
                },

                //remove from cart
                removeFromCart:(state,action)=>{   //37:00

                },

                //reset cart
                resetCart:(state,action)=>{

                }
        }
})

export const { addToCart, removeFromCart, resetCart} = cartSlice.actions
export default cartSlice.reducer