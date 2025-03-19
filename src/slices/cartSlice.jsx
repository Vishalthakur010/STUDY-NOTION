import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast'

const initialState = {
        cart: localStorage.getItem('cart')
                ? JSON.parse(localStorage.getItem('cart'))
                : [],

        total: localStorage.getItem('total')
                ? JSON.parse(localStorage.getItem('total'))
                : 0,

        totalItems: localStorage.getItem('totalItems')
                ? JSON.parse(localStorage.getItem('totalItems'))
                : 0
}

const updateLocalStorage = (state) => {
        localStorage.setItem("cart", JSON.stringify(state.cart))
        localStorage.setItem("total", JSON.stringify(state.total))
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
}

const cartSlice = createSlice({
        name: "cart",
        initialState,
        reducers: {
                //add to cart
                addToCart: (state, action) => {
                        const course = action.payload
                        const index = state.cart.findIndex((item) => item._id === course._id)

                        // if the course is already in cart, do not modify the quantity
                        if (index >= 0) {
                                toast.error("Course already in cart")
                                return
                        }

                        // if the course is not in the cart, add it to the cart
                        state.cart.push(course)
                        //update the total quantity and price
                        state.totalItems++
                        state.total += course.price

                        //update to local storage
                        updateLocalStorage(state)

                        //show toast
                        toast.success("Course added to cart")
                },

                //remove from cart
                removeFromCart: (state, action) => {   //37:00
                        const courseId = action.payload
                        const index = state.cart.findIndex((item) => item._id === courseId)

                        //if the course is already in cart, remove it from the cart
                        if (index >= 0) {

                                // update the quantity and price
                                state.totalItems = Math.max(0, state.totalItems - 1)
                                state.total = Math.max(0, state.total - state.cart[index].price)

                                // remove the course from the cart
                                state.cart.splice(index, 1)

                                //update to local storage
                                updateLocalStorage(state)

                                //show toast
                                toast.success("Course removed from cart")
                        }
                },

                //reset cart
                resetCart: (state) => {
                        state.cart = []
                        state.total = 0
                        state.totalItems = 0

                        //clear localstorage
                        localStorage.removeItem("cart")
                        localStorage.removeItem("total")
                        localStorage.removeItem("totalItems")

                        // show toast
                        toast.success("Cart has been reset")

                }
        }
})

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions
export default cartSlice.reducer