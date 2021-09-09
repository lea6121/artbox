import { createSlice } from '@reduxjs/toolkit'

import {
  getArtworks as getArtworksAPI
  // getPost as getPostAPI,
  // postNewPost as postNewPostAPI,
  // editPost as editPostAPI,
  // deletePost as deletePostAPI
} from '../../WebAPI'

const initialState = {
  isLoadingArtworks: false,
  artworks: [],
  totalArtworksPages: 0
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

export const artworkReducer = createSlice({
  name: 'artwork',
  initialState,
  reducers: {
    setIsLoadingArtworks: (state, action) => {
      state.isLoadingArtworks = action.payload
    },

    setArtworks: (state, action) => {
      state.artworks = action.payload
    },

    setTotalArtworksPages: (state, action) => {
      state.totalArtworksPages = action.payload
    }

    // setArtworksImgID: (state, action) => {
    //   state.artworksImgID = action.payload
    // }

    // setIsLoadingPost: (state, action) => {
    //   state.isLoadingPost = action.payload
    // },

    // setPost: (state, action) => {
    //   state.post = action.payload
    // },

    // setIsLoadingNewPost: (state, action) => {
    //   state.isLoadingNewPost = action.payload
    // },

    // setNewPostResponse: (state, action) => {
    //   state.newPostResponse = action.payload
    // },

    // setIsLoadingEditPost: (state, action) => {
    //   state.isLoadingEditPost = action.payload
    // },

    // setEditedPostResponse: (state, action) => {
    //   state.editedPostResponse = action.payload
    // },

    // setIsLoadingDeletePost: (state, action) => {
    //   state.isLoading = action.payload
    // },

    // setDeletePostResponse: (state, action) => {
    //   state.deletePostResponse = action.payload
    // }
  }
})

export const {
  setIsLoadingArtworks,
  setArtworks,
  setTotalArtworksPages
  // setArtworksImgID
  // setIsLoadingPost,
  // setPost,
  // setIsLoadingNewPost,
  // setNewPostResponse,
  // setIsLoadingEditPost,
  // setEditedPostResponse,
  // setIsLoadingDeletePost,
  // setDeletePostResponse
} = artworkReducer.actions

export const getArtworks = () => (dispatch) => {
  dispatch(setIsLoadingArtworks(true))
  getArtworksAPI().then((data) => {
    // let arrImgID = []
    console.log(data.data)
    // console.log(data.pagination.total_pages)
    dispatch(setIsLoadingArtworks(false))

    // dispatch(setArtworksImgID(arrImgID))
    // console.log(arrImgID)
    // console.log(data.pagination.total)
    // dispatch(setTotalArtworksPages(data.pagination.total_pages))
    dispatch(setArtworks(data.data))
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

export default artworkReducer.reducer
