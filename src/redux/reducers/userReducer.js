import { createSlice } from '@reduxjs/toolkit'
import { app, db } from '../../firebaseConfig'
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
  favoriteProductsId: []
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
  setFavoriteProductsId
} = userReducer.actions

export const register = (data) => (dispatch) => {
  dispatch(setIsLoading(true))
  createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      dispatch(setIsLoading(false))
      const user = userCredential.user
      const token = userCredential.user.accessToken
      data.history.push('/')
    })
    .catch((error) => {
      dispatch(setIsLoading(false))
      const errorCode = error.code
      const errorMessage = error.message
      return dispatch(setRegisterError(errorMessage))
    })

  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, data.email, data.password).then(
        (userCredential) => {
          dispatch(setIsLoading(false))
          // Signed in
          const user = userCredential.user
          console.log(user.uid)
          const token = userCredential.user.accessToken
          dispatch(setRegisterError(''))
          data.history.push('/')
        }
      )
    })
    .catch((error) => {
      dispatch(setIsLoading(false))
      const errorCode = error.code
      const errorMessage = error.message
      return dispatch(setLoginError(errorMessage))
    })
}

export const loginWithEmail = (data) => (dispatch) => {
  dispatch(setIsLoading(true))
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, data.email, data.password).then(
        (userCredential) => {
          dispatch(setIsLoading(false))
          // Signed in
          const user = userCredential.user
          // const token = userCredential.user.accessToken
          // console.log('Login with email', token)
          // console.log('Login with email', user)
          dispatch(setRegisterError(''))
          data.history.push('/')
        }
      )
    })
    .catch((error) => {
      dispatch(setIsLoading(false))
      const errorCode = error.code
      const errorMessage = error.message
      // console.log(errorMessage)
      return dispatch(setLoginError(errorMessage))
    })
}

export const loginWithGoogle = (data) => (dispatch) => {
  dispatch(setIsLoading(true))
  signInWithPopup(auth, provider)
    .then((result) => {
      dispatch(setIsLoading(false))
      const credential = GoogleAuthProvider.credentialFromResult(result)
      // const token = credential.accessToken
      const user = result.user
      // console.log('Login with google', token)
      console.log('Login with google', user.uid)
      dispatch(setUserId(user.uid))
      data.history.push('/')
    })
    .catch((error) => {
      // Handle Errors here.
      dispatch(setIsLoading(false))
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.email
      const credential = GoogleAuthProvider.credentialFromError(error)
      return dispatch(setLoginError(errorMessage))
    })
}

export const logoutGoogle = (data) => (dispatch) => {
  signOut(auth)
    .then(() => {
      dispatch(setUserId(null))
      data.history.push('/')
      console.log('log out ')
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
    dispatch(setIsLoading(false))
    let arr = []
    let arrayId = []
    snapshot.forEach(function (item) {
      arr.push(item.val())
      arrayId.push(item.val().id)
    })
    dispatch(setFavoriteProducts(arr))
    dispatch(setFavoriteProductsId(arrayId))
  })
}
export default userReducer.reducer
