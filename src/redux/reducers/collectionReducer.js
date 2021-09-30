import { createSlice } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import {
  getCollections as getCollectionsAPI,
  getSpecificCollections as getSpecificCollectionsAPI,
  searchCollections as searchCollectionsAPI,
  getArtwork as getArtworkAPI
} from '../../WebAPI'

const initialState = {
  isLoadingCollections: false,
  collections: [],
  currentSearch: '',
  currentCategory: '',
  totalCollections: 0,
  artwork: []
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

    setTotalCollections: (state, action) => {
      state.totalCollections = action.payload
    },

    setArtwork: (state, action) => {
      state.artwork = action.payload
    }
  }
})

export const {
  setIsLoadingCollections,
  setCollections,
  setCurrentCategory,
  setCurrentSearch,
  setTotalCollections,
  setArtwork
} = collectionReducer.actions

export const getCollections = (skip, collections) => (dispatch) => {
  dispatch(setIsLoadingCollections(true))
  getCollectionsAPI(skip).then((data) => {
    dispatch(setTotalCollections(data.info.total))
    dispatch(setCurrentSearch(''))
    dispatch(setCurrentCategory(''))
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
    dispatch(setCollections(data.data))
  })
}

export const getArtwork = (id) => (dispatch) => {
  dispatch(setIsLoadingCollections(true))
  getArtworkAPI(id).then((data) => {
    dispatch(setArtwork([]))
    dispatch(setIsLoadingCollections(false))
    dispatch(setArtwork(data.data))
  })
}

export default collectionReducer.reducer
