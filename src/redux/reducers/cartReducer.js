import { createSlice } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

const initialState = {
  isLoadingCartProducts: false,
  cartProduct: [],
  cartTotal: 0
}

export const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setIsLoadingCartProducts: (state, action) => {
      state.isLoadingCartProducts = action.payload
    },
    setCartProduct: (state, action) => {
      state.cartProduct = action.payload
    },
    setCartTotal: (state, action) => {
      state.cartTotal = action.payload
    }
  }
})

export const { setIsLoadingCartProducts, setCartProduct, setCartTotal } =
  cartReducer.actions

export default cartReducer.reducer
