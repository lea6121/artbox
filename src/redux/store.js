import { configureStore } from '@reduxjs/toolkit'
import artworkReducer from './reducers/artworkReducer'
import userReducer from './reducers/userReducer'
import productReducer from './reducers/productReducer'

export default configureStore({
  reducer: {
    artworks: artworkReducer,
    products: productReducer,
    users: userReducer
  }
})
