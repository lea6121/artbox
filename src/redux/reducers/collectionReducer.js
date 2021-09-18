import { createSlice } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import {
  getCollections as getCollectionsAPI,
  getSpecificCollections as getSpecificCollectionsAPI,
  searchCollections as searchCollectionsAPI,
  getArtwork as getArtworkAPI
  // searchArtists as searchArtistsAPI
  // getPost as getPostAPI,
  // postNewPost as postNewPostAPI,
  // editPost as editPostAPI,
  // deletePost as deletePostAPI
} from '../../WebAPI'

const initialState = {
  isLoadingCollections: false,
  collections: [],
  currentSearch: '',
  currentCategory: '',
  currentPage: 0,
  totalCollections: 0,
  artwork: []
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

    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload
    },

    setCurrentSearch: (state, action) => {
      state.currentSearch = action.payload
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },

    setTotalCollections: (state, action) => {
      state.totalCollections = action.payload
    },

    setArtwork: (state, action) => {
      state.artwork = action.payload
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
  setCurrentCategory,
  setCurrentSearch,
  setCurrentPage,
  setTotalCollections,
  setArtwork
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

export const getCollections = (skip, collections) => (dispatch) => {
  dispatch(setIsLoadingCollections(true))
  getCollectionsAPI(skip).then((data) => {
    // console.log(data)
    dispatch(setTotalCollections(data.info.total))
    dispatch(setCurrentSearch(''))
    dispatch(setCurrentCategory(''))
    dispatch(setCurrentPage(1))
    dispatch(setIsLoadingCollections(false))
    dispatch(setCollections(data.data))
  })
}

export const getSpecificCollections = (department, skip) => (dispatch) => {
  dispatch(setIsLoadingCollections(true))
  getSpecificCollectionsAPI(department, skip).then((data) => {
    console.log(data.info.total)
    dispatch(setCurrentCategory(department))
    dispatch(setCurrentSearch(''))
    dispatch(setTotalCollections(data.info.total))
    dispatch(setIsLoadingCollections(false))
    // dispatch(setTotalArtworksPages(data.pagination.total_pages))
    dispatch(setCollections(data.data))
  })
}

export const searchCollections = (query, skip) => (dispatch) => {
  dispatch(setIsLoadingCollections(true))
  searchCollectionsAPI(query, skip).then((data) => {
    console.log(data.info.total)
    dispatch(setTotalCollections(data.info.total))
    dispatch(setCurrentSearch(query))
    dispatch(setCurrentCategory(''))
    dispatch(setIsLoadingCollections(false))
    // dispatch(setTotalArtworksPages(data.pagination.total_pages))
    dispatch(setCollections(data.data))
  })
}

export const getArtwork = (id) => (dispatch) => {
  dispatch(setIsLoadingCollections(true))
  getArtworkAPI(id).then((data) => {
    // console.log(data)
    dispatch(setArtwork([]))
    dispatch(setIsLoadingCollections(false))
    dispatch(setArtwork(data.data))
  })
}

export const setCurrentPageNum = (num) => (dispatch) => {
  dispatch(setCurrentPage(num))
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
