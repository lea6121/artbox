import { css } from '@emotion/css'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import Loading from '../../components/Loading'
import {
  loginWithGoogle,
  loginWithEmail,
  setLoginError
} from '../../redux/reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

const loginPageContainer = css`
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
  text-align: center;
  font-family: serif;

  .login-wrapper {
    margin: 40px auto;
    max-width: 460px;
    padding: 20px 50px 20px 50px;

    h1 {
      font-weight: 500;
      margin: 30px 0 30px;
      font-size: 48px;
      font-family: 'Gill Sans';
    }

    p {
      margin-bottom: 30px;
      font-size: 20px;
    }

    a {
      color: rgb(26, 79, 3);
      text-decoration: none;
    }

    button {
      width: 100%;
      height: 50px;
    }

    .login-with-google {
      background: rgb(66 133 244);
      border: 1px solid white;
      color: white;
      font-size: 16px;
      align-items: center;
      font-family: Arial;

      img {
        width: 20px;
        margin-right: 20px;
      }
    }

    .login-with-email {
      border: 1px solid rgba(0, 0, 0, 0.3);
      background: white;
      font-size: 18px;

      &:hover {
        border: 1px solid rgba(0, 0, 0, 0.9);
      }
    }

    .strike {
      display: block;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;

      > span {
        position: relative;
        display: inline-block;
        padding: 20px 0;

        &:before,
        &:after {
          content: '';
          position: absolute;
          top: 50%;
          width: 9999px;
          height: 1px;
          background: rgba(0, 0, 0, 0.6);
        }

        &:before {
          right: 100%;
          margin-right: 15px;
        }

        &:after {
          left: 100%;
          margin-left: 15px;
        }
      }
    }

    .login-container {
      margin: 0 auto;
      max-width: 330px;

      img {
        width: 40px;
      }

      button {
        border: none;
        background: transparent;
      }

      .login-form {
        font-size: 18px;
        padding: 10px 0px;
        text-align: left;
      }

      .login-input {
        font-size: 18px;
        margin: 20px 0 20px 0;
        width: 100%;
        height: 20px;
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
        padding: 15px 5px;
        outline: none;
      }

      .login-form > span {
        font-size: 16px;
        color: red;
      }

      .login-submit {
        margin-top: 10px;
        width: 100%;
        height: 50px;
        border: 1px solid rgba(0, 0, 0, 0.3);
        background: white;
        font-size: 18px;
        cursor: pointer;

        &:hover {
          border: 1px solid rgba(0, 0, 0, 0.9);
        }
      }
    }
  }
`

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { email, password } = formData
  const [errors, setErrors] = useState('')
  const { emailMsg, passwordMsg } = errors
  const history = useHistory()
  const dispatch = useDispatch()
  const isLoadingMsg = useSelector((store) => store.users.isLoading)
  const errorMsg = useSelector((store) => store.users.loginError)
  const userId = useSelector((state) => state.users.userId)
  const updateFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (formValidation()) {
      dispatch(loginWithEmail({ email, password, history }))
    }
  }

  const handleGoogle = () => {
    dispatch(loginWithGoogle({ history }))
  }

  const [showLoginForm, setShowLoginForm] = useState(false)

  const onclickShowLoginFormBtn = () =>
    showLoginForm ? setShowLoginForm(false) : setShowLoginForm(true)

  if (userId !== null) {
    history.push('/')
  }

  function formValidation() {
    let errors = {}
    let formIsValid = true
    // 信箱驗證
    const isEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if (!isEmail.test(email)) {
      formIsValid = false
      errors['emailMsg'] = 'Please enter your email.'
    }

    if (password.trim() === '' || password.length < 8) {
      formIsValid = false
      errors['passwordMsg'] =
        'Please enter your password. Passwords suppose to be at least 8 characters long.'
    }

    setErrors(errors)
    return formIsValid
  }

  useEffect(() => {
    dispatch(setLoginError(''))
    window.scrollTo(0, 0)
  }, [dispatch])

  return (
    <div className={loginPageContainer}>
      {isLoadingMsg && <Loading></Loading>}
      <div className="login-wrapper">
        <h1>Log In</h1>
        <p>
          New to this site? <a href="./#/register">Sign Up</a>
        </p>

        {showLoginForm ? (
          <div className="login-container">
            <form onSubmit={handleSubmit}>
              <div className="login-form">
                Email
                <br />
                <input
                  className="login-input"
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => updateFormData(e)}
                />
                <br />
                <span>{emailMsg}</span>
              </div>
              <div className="login-form">
                Password
                <br />
                <input
                  className="login-input"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => updateFormData(e)}
                />
                <br />
                <span>{passwordMsg}</span>
                <span>{errorMsg}</span>
              </div>
              <div>
                <input
                  className="login-submit"
                  type="submit"
                  value="Log In"
                  onClick={handleSubmit}
                />
              </div>
              <div class="strike">
                <span>or log in with</span>
              </div>
              <button onClick={handleGoogle}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkfNMnsU2cUDDcDoi_Uz9Y1v-3_WviVMLM1TrroFFHJtaqiqS2yXFHNNqWHXE_yWUvP6E&usqp=CAU" />
              </button>
            </form>
          </div>
        ) : (
          <>
            <button className="login-with-google" onClick={handleGoogle}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkfNMnsU2cUDDcDoi_Uz9Y1v-3_WviVMLM1TrroFFHJtaqiqS2yXFHNNqWHXE_yWUvP6E&usqp=CAU" />
              Log in with Google
            </button>
            <div class="strike">
              <span>or</span>
            </div>
            <button
              className="login-with-email"
              onClick={onclickShowLoginFormBtn}
            >
              Log in with email
            </button>
          </>
        )}
      </div>
    </div>
  )
}
