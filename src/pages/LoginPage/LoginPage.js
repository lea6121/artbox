import React, { useState, useEffect } from 'react'
import { ResetStyle, GlobalStyle } from '../../globalStyle'
import { useHistory } from 'react-router'

import { Loading } from '../../components/App/App'
import './login.css'
// import { getMe, login } from '../../WebAPI'
import { login, setLoginError } from '../../redux/reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const { username, password } = formData
  const updateFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const history = useHistory()
  const dispatch = useDispatch()
  const isLoadingMsg = useSelector((store) => store.users.isLoading)
  const errorMsg = useSelector((store) => store.users.loginError)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login({ username, password, history }))
  }

  useEffect(() => {
    return () => {
      dispatch(setLoginError(null))
    }
  }, [dispatch])

  return (
    <div className="login-wrapper">
      <ResetStyle />
      <GlobalStyle />
      {isLoadingMsg && <Loading>Loading...</Loading>}
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <div className="login-form">
            USERNAME
            <br />
            <input
              className="login-input"
              type="text"
              name="username"
              value={username}
              onChange={(e) => updateFormData(e)}
              required
            />
            <br />
          </div>
          <div className="login-form">
            PASSWORD
            <br />
            <input
              className="login-input"
              type="password"
              name="password"
              value={password}
              onChange={(e) => updateFormData(e)}
              required
            />
            <br />
            <span>{errorMsg}</span>
          </div>
          <div>
            <input className="login-submit" type="submit" value="SIGN IN" />
          </div>
        </form>
      </div>
    </div>
  )
}
