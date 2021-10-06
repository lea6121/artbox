import { css } from '@emotion/css'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import {
  register,
  loginWithGoogle,
  setRegisterError
} from '../../redux/reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

const registerPageContainer = css`
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
  text-align: center;
  font-family: serif;

  .register-wrapper {
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

    .register-with-google {
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

    .register-with-email {
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

    .register-container {
      margin: 0 auto;
      max-width: 330px;

      img {
        width: 40px;
      }

      button {
        border: none;
        background: transparent;
      }
      .register-form {
        font-size: 18px;
        padding: 10px 0px;
        text-align: left;
      }

      .register-input {
        font-size: 18px;
        margin: 20px 0 20px 0;
        width: 100%;
        height: 20px;
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
        padding: 15px 5px;
        outline: none;
      }

      .register-form > span {
        font-size: 16px;
        color: red;
      }

      .register-submit {
        margin-top: 10px;
        border: 1px solid rgba(0, 0, 0, 0.3);
        background: white;
        width: 100%;
        height: 50px;
        font-size: 18px;
        cursor: pointer;

        &:hover {
          border: 1px solid rgba(0, 0, 0, 0.9);
        }
      }
    }
  }
`

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { email, password } = formData
  const [errors, setErrors] = useState('')
  const { emailMsg, passwordMsg } = errors
  const history = useHistory()
  const dispatch = useDispatch()
  const errorMsg = useSelector((store) => store.users.registerError)
  const userId = useSelector((state) => state.users.userId)
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const showRegisterFormBtn = () =>
    showRegisterForm ? setShowRegisterForm(false) : setShowRegisterForm(true)
  const handleGoogle = () => {
    dispatch(loginWithGoogle({ history }))
  }
  const updateFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (formValidation()) {
      dispatch(register({ email, password, history }))
    }
  }

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
      errors['emailMsg'] =
        'Please enter your email address in format "yourname@example.com".'
    }

    if (password.trim() === '' || password.length < 8) {
      formIsValid = false
      errors['passwordMsg'] = 'Passwords must be at least 8 characters long.'
    }

    setErrors(errors)
    return formIsValid
  }

  useEffect(() => {
    dispatch(setRegisterError(''))
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={registerPageContainer}>
      <div className="register-wrapper">
        <h1>Sign Up</h1>
        <p>
          Already a member? <a href="./#/login">Log In</a>
        </p>

        {showRegisterForm ? (
          <div className="register-container">
            <form onSubmit={handleSubmit}>
              <div className="register-form">
                Email
                <br />
                <input
                  className="register-input"
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => updateFormData(e)}
                />
                <br />
                <span>{emailMsg}</span>
              </div>
              <div className="register-form">
                Password
                <br />
                <input
                  className="register-input"
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
                  className="register-submit"
                  type="submit"
                  value="Sign Up"
                  onClick={handleSubmit}
                />
              </div>
              <div class="strike">
                <span>or sign up with</span>
              </div>
              <button onClick={handleGoogle}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkfNMnsU2cUDDcDoi_Uz9Y1v-3_WviVMLM1TrroFFHJtaqiqS2yXFHNNqWHXE_yWUvP6E&usqp=CAU" />
              </button>
            </form>
          </div>
        ) : (
          <>
            <button className="register-with-google" onClick={handleGoogle}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkfNMnsU2cUDDcDoi_Uz9Y1v-3_WviVMLM1TrroFFHJtaqiqS2yXFHNNqWHXE_yWUvP6E&usqp=CAU" />
              Sign up with Google
            </button>
            <div class="strike">
              <span>or</span>
            </div>
            <button
              className="register-with-email"
              onClick={showRegisterFormBtn}
            >
              Sign up with email
            </button>
          </>
        )}
      </div>
    </div>
  )
}
