import { createSlice } from '@reduxjs/toolkit'
import { setAuthToken } from '../../utils'
// import {
//   getMe as getMeAPI,
//   register as registerAPI,
//   login as loginAPI
// } from '../../WebAPI'

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
  registerAPI(data).then((res) => {
    dispatch(setIsLoading(false))
    if (res.code) {
      return dispatch(setRegisterError(res.message))
    }
    if (res.ok === 1) {
      setAuthToken(res.token)
    }

    getMeAPI(res.token, data.history).then((res) => {
      if (res.ok !== 1) {
        setAuthToken(null)
        return dispatch(setRegisterError(res.toString()))
      }
      alert('註冊成功！')
      dispatch(setUser(res.data))
      data.history.push('/')
    })
  })
}

export const login = (data) => (dispatch) => {
  dispatch(setIsLoading(true))
  loginAPI(data).then((res) => {
    dispatch(setIsLoading(false))
    if (res.ok === 0) {
      return dispatch(setLoginError(res.message))
    }
    setAuthToken(res.token)

    getMeAPI(res.token, data.history).then((res) => {
      if (res.ok !== 1) {
        setAuthToken(null)
        return dispatch(setLoginError(res.toString()))
      }
      alert('登入成功！')
      dispatch(setUser(res.data))
      data.history.push('/')
    })
  })
}

export const getMe = () => (dispatch) => {
  getMeAPI().then((res) => {
    if (res.ok) {
      dispatch(setUser(res.data))
    }
  })
}

export default userReducer.reducer
