import { createSlice } from '@reduxjs/toolkit'

import { getProducts as getProductsAPI } from '../../WebAPI'

const initialState = {
  isLoadingProducts: false,
  products: [],
  totalProductsPages: 0
}

export const productReducer = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setIsLoadingProducts: (state, action) => {
      state.isLoadingProducts = action.payload
    },

    setProducts: (state, action) => {
      state.products = action.payload
    },

    setTotalProductsPages: (state, action) => {
      state.totalProductsPages = action.payload
    }
  }
})

export const { setIsLoadingProducts, setProducts, setTotalProductsPages } =
  productReducer.actions

export const getProducts = () => (dispatch) => {
  dispatch(setIsLoadingProducts(true))
  getProductsAPI().then((data) => {
    // console.log(data)
    // console.log(data.pagination.total_pages)
    // console.log(data.data)
    dispatch(setTotalProductsPages(data.pagination.total_pages))
    dispatch(setIsLoadingProducts(false))
    dispatch(setProducts(data.data))
  })
}

// export const getPost = (id) => (dispatch) => {
//   dispatch(setIsLoadingPost(true))
//   getPostAPI(id).then((article) => {
//     dispatch(setPost(article))
//     dispatch(setIsLoadingPost(false))
//   })
// }

// export const postNewPost = (data) => (dispatch) => {
//   dispatch(setIsLoadingNewPost(true))
//   postNewPostAPI(data).then((res) => {
//     dispatch(setNewPostResponse(res))
//     dispatch(setIsLoadingNewPost(false))
//   })
// }

// export const editPost = (data) => (dispatch) => {
//   dispatch(setIsLoadingEditPost(true))
//   editPostAPI(data).then((res) => {
//     dispatch(setEditedPostResponse(res))
//     dispatch(setIsLoadingEditPost(false))
//   })
// }

// export const deletePost = (id) => (dispatch) => {
//   dispatch(setIsLoadingDeletePost(true))
//   deletePostAPI(id).then((res) => {
//     dispatch(setDeletePostResponse(res))
//     dispatch(setIsLoadingDeletePost(false))
//     let page = 1
//     getPostsAPI(page)
//       .then((data) => {
//         dispatch(setIsLoadingPosts(false))
//         dispatch(setTotalPosts(data.totalPosts))
//         return data.posts
//       })
//       .then((posts) => {
//         dispatch(setPosts(posts))
//       })
//   })
// }

export default productReducer.reducer
