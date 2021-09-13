import { configureStore } from '@reduxjs/toolkit'
import collectionReducer from './reducers/collectionReducer'
import userReducer from './reducers/userReducer'
import productReducer from './reducers/productReducer'

export default configureStore({
  reducer: {
    collections: collectionReducer,
    products: productReducer,
    users: userReducer
  }
})
