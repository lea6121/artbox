import { createSlice } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

const initialState = {
  cartProduct: []
}

export const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartProduct: (state, action) => {
      state.collections = action.payload
    }
  }
})

export const { setCartProduct } = cartReducer.actions

export default cartReducer.reducer
