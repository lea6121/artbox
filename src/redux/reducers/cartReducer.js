import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartProduct: []
}

export const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartProduct: (state, action) => {
      state.cartProduct = action.payload
    }
  }
})

export const { setCartProduct } = cartReducer.actions

export default cartReducer.reducer
