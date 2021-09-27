import { createSlice } from '@reduxjs/toolkit'
import { app, db } from '../../firebaseConfig'
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
  user: null,
  registerResponse: null,
  registerError: '',
  loginResponse: null,
  loginError: ''
}

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },

    setUser: (state, action) => {
      state.user = action.payload
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
    }
  }
})

export const {
  setIsLoading,
  setUser,
  setRegisterResponse,
  setRegisterError,
  setLoginResponse,
  setLoginError
} = userReducer.actions

export const register = (data) => (dispatch) => {
  dispatch(setIsLoading(true))
  createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      dispatch(setIsLoading(false))
      const user = userCredential.user
      const token = userCredential.user.accessToken
      console.log(user)
      alert('Register successful.')
      data.history.push('/')
    })
    .catch((error) => {
      dispatch(setIsLoading(false))
      const errorCode = error.code
      console.log(errorCode)
      const errorMessage = error.message
      // setAuthToken(null)
      return dispatch(setRegisterError(errorMessage))
      // ..
    })
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, data.email, data.password).then(
        (userCredential) => {
          dispatch(setIsLoading(false))
          // Signed in
          const user = userCredential.user
          console.log(user)
          const token = userCredential.user.accessToken
          dispatch(setRegisterError(''))
          alert('Log in successful.')
          data.history.push('/')
        }
      )
    })
    .catch((error) => {
      dispatch(setIsLoading(false))
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorMessage)
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
          console.log(user)
          const token = userCredential.user.accessToken
          dispatch(setRegisterError(''))
          alert('Log in successful.')
          data.history.push('/')
        }
      )
    })
    .catch((error) => {
      dispatch(setIsLoading(false))
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorMessage)
      return dispatch(setLoginError(errorMessage))
    })
}

export const loginWithGoogle = (data) => (dispatch) => {
  dispatch(setIsLoading(true))
  signInWithPopup(auth, provider)
    .then((result) => {
      dispatch(setIsLoading(false))
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      const user = result.user
      console.log(token)
      console.log(user)
      // dispatch(setUser(user.uid))
      dispatch(setLoginError(''))
      alert('Log in successful.')
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
      dispatch(setUser(null))
      alert('Log out successful.')
      data.history.push('/')
    })
    .catch((error) => {
      // An error happened.
    })
}

// export const getMe = () => (dispatch) => {
//   getMeAPI().then((res) => {
//     if (res.ok) {
//       dispatch(setUser(res.data))
//     }
//   })

export default userReducer.reducer
