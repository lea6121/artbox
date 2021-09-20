import { createSlice } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

const initialState = {
  cartProduct: []
  // artworksImgID: []
  // isLoadingPost: false,
  // post: null,
  // isLoadingNewPost: false,
  // newPostResponse: null,
  // isLoadingEditPost: false,
  // editedPostResponse: null,
  // isLoadingDeletePost: false,
  // deletePostResponse: null
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
