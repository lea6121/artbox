import { createSlice } from '@reduxjs/toolkit'

import {
  getCurrentViewCollections as getCurrentViewCollectionsAPI,
  getSpecificCollections as getSpecificCollectionsAPI,
  searchCollections as searchCollectionsAPI
  // searchArtists as searchArtistsAPI
  // getPost as getPostAPI,
  // postNewPost as postNewPostAPI,
  // editPost as editPostAPI,
  // deletePost as deletePostAPI
} from '../../WebAPI'

const initialState = {
  isLoadingCollections: false,
  collections: [],
  totalCollectionsPages: 0
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

export const collectionReducer = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setIsLoadingCollections: (state, action) => {
      state.isLoadingCollections = action.payload
    },

    setCollections: (state, action) => {
      state.collections = action.payload
    },

    setTotalCollectionsPages: (state, action) => {
      state.totalCollectionsPages = action.payload
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
  setIsLoadingCollections,
  setCollections,
  setTotalCollectionsPages
  // setArtworksImgID
  // setIsLoadingPost,
  // setPost,
  // setIsLoadingNewPost,
  // setNewPostResponse,
  // setIsLoadingEditPost,
  // setEditedPostResponse,
  // setIsLoadingDeletePost,
  // setDeletePostResponse
} = collectionReducer.actions

export const getCurrentViewCollections = () => (dispatch) => {
  dispatch(setIsLoadingCollections(true))
  getCurrentViewCollectionsAPI().then((data) => {
    console.log(data.data)
    dispatch(setIsLoadingCollections(false))
    // dispatch(setTotalArtworksPages(data.pagination.total_pages))
    dispatch(setCollections(data.data))
  })
}

export const getSpecificCollections = (department) => (dispatch) => {
  dispatch(setIsLoadingCollections(true))
  getSpecificCollectionsAPI(department).then((data) => {
    // console.log(data.data)
    dispatch(setIsLoadingCollections(false))
    // dispatch(setTotalArtworksPages(data.pagination.total_pages))
    dispatch(setCollections(data.data))
  })
}

export const searchCollections = (query) => (dispatch) => {
  dispatch(setIsLoadingCollections(true))
  searchCollectionsAPI(query).then((data) => {
    // console.log(data.data)
    dispatch(setIsLoadingCollections(false))
    // dispatch(setTotalArtworksPages(data.pagination.total_pages))
    dispatch(setCollections(data.data))
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

export default collectionReducer.reducer
