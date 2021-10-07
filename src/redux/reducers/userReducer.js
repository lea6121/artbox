import { createSlice } from '@reduxjs/toolkit'
import { app } from '../../firebaseConfig'
import { getDatabase, ref, remove, set, onValue } from 'firebase/database'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth'

const provider = new GoogleAuthProvider()
const auth = getAuth()

const initialState = {
  isLoading: false,
  userId: null,
  username: null,
  registerResponse: null,
  registerError: '',
  loginResponse: null,
  loginError: '',
  logoutError: '',
  favoriteProducts: [],
  favoriteProductsId: [],
  userOrders: []
}

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },

    setUserId: (state, action) => {
      state.userId = action.payload
    },

    setUsername: (state, action) => {
      state.username = action.payload
    },

    setRegisterResponse: (state, action) => {
      state.registerResponse = action.payload
    },

    setRegisterError: (state, action) => {
      state.registerError = action.payload
    },

    setLoginResponse: (state, action) => {
      state.loginResponse = action.payload
    },

    setLoginError: (state, action) => {
      state.loginError = action.payload
    },

    setLogoutError: (state, action) => {
      state.logoutError = action.payload
    },

    setFavoriteProducts: (state, action) => {
      state.favoriteProducts = action.payload
    },
    setFavoriteProductsId: (state, action) => {
      state.favoriteProductsId = action.payload
    },
    setUserOrders: (state, action) => {
      state.userOrders = action.payload
    }
  }
})

export const {
  setIsLoading,
  setUserId,
  setUsername,
  setRegisterResponse,
  setRegisterError,
  setLoginResponse,
  setLoginError,
  setLogoutError,
  setFavoriteProducts,
  setFavoriteProductsId,
  setUserOrders
} = userReducer.actions

export const register = (data) => (dispatch) => {
  dispatch(setIsLoading(true))
  createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      dispatch(setIsLoading(false))
    })
    .catch((error) => {
      dispatch(setIsLoading(false))
      const errorMessage = error.message
      return dispatch(setRegisterError(errorMessage))
    })

  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, data.email, data.password).then(
        (userCredential) => {
          dispatch(setIsLoading(false))
          dispatch(setRegisterError(''))
          data.history.push('/')
        }
      )
    })
    .catch((error) => {
      dispatch(setIsLoading(false))
      const errorCode = error.code
      return dispatch(setLoginError(errorCode))
    })
}

export const loginWithEmail = (data) => (dispatch) => {
  dispatch(setIsLoading(true))
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, data.email, data.password).then(
        (userCredential) => {
          dispatch(setIsLoading(false))
          const user = userCredential.user
          dispatch(setUserId(user.id))
          dispatch(setRegisterError(''))
          data.history.push('/')
        }
      )
    })
    .catch((error) => {
      dispatch(setIsLoading(false))
      const errorCode = error.code
      return dispatch(setLoginError(errorCode))
    })
}

export const loginWithGoogle = (data) => (dispatch) => {
  dispatch(setIsLoading(true))
  signInWithPopup(auth, provider)
    .then((result) => {
      dispatch(setIsLoading(false))
      const user = result.user
      dispatch(setUserId(user.uid))
      data.history.push('/')
    })
    .catch((error) => {
      dispatch(setIsLoading(false))
      const errorCode = error.code
      return dispatch(setLoginError(errorCode))
    })
}

export const logoutGoogle = (data) => (dispatch) => {
  signOut(auth)
    .then(() => {
      dispatch(setUserId(null))
      data.history.push('/')
    })
    .catch((error) => {
      dispatch(setLogoutError(error))
    })
}

export const setFavoriteProduct =
  (
    userId,
    productId,
    productTitle,
    productImageUrl,
    productPrice,
    productUrl
  ) =>
  () => {
    const db = getDatabase()
    set(ref(db, 'favorite-products/' + userId + '/' + productId), {
      id: productId,
      title: productTitle,
      picture: productImageUrl,
      price: productPrice,
      url: productUrl
    })
  }

export const removeFavoriteProduct = (userId, productId) => () => {
  const db = getDatabase()
  remove(ref(db, 'favorite-products/' + userId + '/' + productId))
}

export const getFavoriteProducts = (userId) => (dispatch) => {
  dispatch(setIsLoading(true))
  const dbRef = getDatabase()
  const favoriteRef = ref(dbRef, `favorite-products/${userId}/`)
  onValue(favoriteRef, (snapshot) => {
    let arr = []
    let arrayId = []
    snapshot.forEach(function (item) {
      arr.push(item.val())
      arrayId.push(item.val().id)
    })
    dispatch(setFavoriteProducts(arr))
    dispatch(setFavoriteProductsId(arrayId))
  })
  dispatch(setIsLoading(false))
}

export const setOrder = (userId, order, formData, subtotal) => () => {
  const db = getDatabase()
  let date = new Date()

  const formatDate = (currentTime) => {
    let formattedDate = `${currentTime.getFullYear()}-${
      currentTime.getMonth() + 1
    }-${currentTime.getDate()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`
    return formattedDate
  }

  set(ref(db, 'orders/' + userId + '/' + Date.now()), {
    orderId: Date.now(),
    orderDate: formatDate(date),
    orderLocalTime: date.toLocaleString(),
    order,
    subtotal,
    formData,
    shipment: 'Not yet shipped'
  })
}

export const getUserOrders = (userId) => (dispatch) => {
  const dbRef = getDatabase()
  dispatch(setIsLoading(true))
  const orderRef = ref(dbRef, `orders/${userId}/`)
  onValue(orderRef, (snapshot) => {
    let arr = []
    snapshot.forEach(function (item) {
      arr.push(item.val())
    })
    dispatch(setUserOrders(arr))
    dispatch(setIsLoading(false))
  })
}

export default userReducer.reducer
