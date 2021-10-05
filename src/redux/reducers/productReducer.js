import { createSlice } from '@reduxjs/toolkit'
import { app } from '../../firebaseConfig'
import {
  getDatabase,
  ref,
  child,
  get,
  query,
  equalTo,
  onValue,
  orderByChild
} from 'firebase/database'

const initialState = {
  isLoadingProducts: false,
  allProducts: [],
  specificProducts: [],
  product: [],
  suggestProducts: []
}

export const productReducer = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setIsLoadingProducts: (state, action) => {
      state.isLoadingProducts = action.payload
    },

    setAllProducts: (state, action) => {
      state.allProducts = action.payload
    },

    setSpecificProducts: (state, action) => {
      state.specificProducts = action.payload
    },

    setProduct: (state, action) => {
      state.product = action.payload
    },

    setSuggestProducts: (state, action) => {
      state.suggestProducts = action.payload
    }
  }
})

export const {
  setIsLoadingProducts,
  setAllProducts,
  setSpecificProducts,
  setProduct,
  setSuggestProducts
} = productReducer.actions

export const getAllProducts = () => (dispatch) => {
  const dbRef = ref(getDatabase())
  dispatch(setIsLoadingProducts(true))
  get(child(dbRef, 'products'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        dispatch(setIsLoadingProducts(false))
        dispatch(setAllProducts(snapshot.val()))
      }
    })
    .catch((error) => {})
}

export const getSpecificProducts = (category) => (dispatch) => {
  dispatch(setIsLoadingProducts(true))
  const dbRef = getDatabase()
  const product = query(ref(dbRef, `products/${category}`), orderByChild('id'))

  onValue(product, (snapshot) => {
    let arr = []
    //有用 orderByChild 時要用 for 迴圈取資料
    snapshot.forEach(function (item) {
      arr.push(item.val())
    })
    dispatch(setIsLoadingProducts(false))
    dispatch(setSpecificProducts(arr))
  })
}

export const getProduct = (id, category) => (dispatch) => {
  dispatch(setIsLoadingProducts(true))
  const dbRef = getDatabase()
  const product = query(
    ref(dbRef, `products/${category}`),
    orderByChild('id'),
    equalTo(Number(id))
  )

  onValue(product, (snapshot) => {
    let arr = []
    //有用 orderByChild 時要用 for 迴圈取資料
    snapshot.forEach(function (item) {
      arr.push(item.val())
    })
    dispatch(setIsLoadingProducts(false))
    dispatch(setProduct(arr))
  })
}

export const getSuggestProduct = (category) => (dispatch) => {
  dispatch(setIsLoadingProducts(true))
  const dbRef = getDatabase()
  const product = query(ref(dbRef, `products/${category}`), orderByChild('id'))

  onValue(product, (snapshot) => {
    const data = snapshot.val()
    let suggestionArr = []
    let numbers = []
    let min, max, range, num
    min = 1
    max = data.length - 1
    range = 4
    for (let i = 0; i < range; i++) {
      do {
        num = Math.floor(Math.random() * (max - min + 1)) + min
        if (!numbers.includes(num)) {
          numbers.push(Number(num))
        }
      } while (numbers.includes(num))
    }
    numbers.forEach((element) => suggestionArr.push(data[element]))
    dispatch(setIsLoadingProducts(false))
    dispatch(setSuggestProducts(suggestionArr))
  })
}

export default productReducer.reducer
