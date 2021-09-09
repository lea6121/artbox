import React, { useState, useEffect } from 'react'
import { ResetStyle, GlobalStyle } from '../../globalStyle'
import { useHistory } from 'react-router'
import { Loading } from '../../components/App/App'
import './register.css'
import { register, setRegisterError } from '../../redux/reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nickname: '',
    username: '',
    password: ''
  })
  const { nickname, username, password } = formData
  const updateFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const dispatch = useDispatch()
  const history = useHistory()
  const isLoadingMsg = useSelector((store) => store.users.isLoading)
  const errorMsg = useSelector((store) => store.users.registerError)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(register({ nickname, username, password, history }))
  }

  useEffect(() => {
    return () => {
      dispatch(setRegisterError(null))
    }
  }, [dispatch])

  return (
    <div className="register-wrapper">
      <ResetStyle />
      <GlobalStyle />
      {isLoadingMsg && <Loading>Loading...</Loading>}
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <div className="register-form">
            NICKNAME
            <br />
            <input
              className="register-input"
              type="text"
              name="nickname"
              placeholder="您的暱稱"
              value={nickname}
              onChange={(e) => updateFormData(e)}
              required
            />
            <br />
          </div>
          <div className="register-form">
            USERNAME
            <br />
            <input
              className="register-input"
              type="text"
              name="username"
              placeholder="您的使用者名稱"
              value={username}
              onChange={(e) => updateFormData(e)}
              required
            />
            <br />
          </div>
          <div className="register-form">
            PASSWORD
            <br />
            <input
              className="register-input"
              type="password"
              name="password"
              placeholder="您的密碼"
              value={password}
              onChange={(e) => updateFormData(e)}
              required
            />
            <br />
            <span>{errorMsg}</span>
          </div>
          <div>
            <input className="register-submit" type="submit" value="SUBMIT" />
          </div>
        </form>
      </div>
    </div>
  )
}
