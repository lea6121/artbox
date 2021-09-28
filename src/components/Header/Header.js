import { css } from '@emotion/css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../redux/reducers/userReducer'
import { setAuthToken } from '../../utils'
import { logoutGoogle } from '../../redux/reducers/userReducer'

const header = css`
  box-sizing: border-box;

  .header-top {
    background: white;
    position: relative;
    z-index: 3;
    border-bottom: 1px solid rgba(0, 0, 0, 1);
    width: 100vw;
    display: flex;
    height: auto;
    justify-content: space-between;
    align-items: center;
    padding: 3px 20px;

    .tags {
      display: flex;
      align-items: center;
      width: 31%;

      #site-logo {
        width: 60px;
        border-radius: 50%;
      }

      .site-name {
        text-decoration: none;
        color: black;
        font-size: 50px;
        padding: 0px 20px 0px 20px;
        display: flex;
        font-weight: 500;
        font-family: Serif;
        &:hover {
          text-decoration: none;
          color: black;
        }
      }
    }

    .icons {
      display: flex;
      align-items: center;
      letter-spacing: 0.05rem;

      a {
        display: inline-block;
        margin: 0 8px;
        color: rgba(0, 0, 0, 0.9);
        text-decoration: none;
        font-size: 18px;
        text-align: center;
        font-family: Serif;
        transition: all 0.6s ease-in-out;

        &:hover {
          color: rgba(0, 0, 0, 0.6);
        }
      }

      .icon {
        display: block;
        margin: 0 auto;
      }

      .fas {
        font-size: 26px;
      }
    }

    .drop {
      &:hover {
        .dropbox {
          display: block;
        }
      }

      .dropbox {
        width: 130px;
        display: none;
        background-color: white;
        position: absolute;
        right: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

        a {
          text-align: left;
          padding: 10px;
          font-size: 16px;
          display: block;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          margin: 0;
        }

        .logout-btn {
          padding: 10px;
          margin: 0;
          font-size: 16px;
          cursor: pointer;

          &:hover {
            color: rgba(0, 0, 0, 0.6);
          }
        }
      }
    }

    button {
      cursor: unset;
      display: block;
      background: inherit;
      border: none;
      padding: 0;
      margin: 0 8px;
      color: rgba(0, 0, 0, 0.9);
      font-size: 18px;
      text-align: center;
      font-family: Serif;
      transition: all 0.6s ease-in-out;

      &:hover {
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
`

export default function Header() {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((store) => store.users.user)

  const handleLogout = () => {
    dispatch(logoutGoogle({ history }))
    setAuthToken('')
    dispatch(setUser(null))
    history.push('/')
  }

  function LogoutBtn() {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    return (
      <>
        <button className="logout-btn" variant="primary" onClick={handleShow}>
          LOGOUT
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you really want to log out?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleLogout}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

  return (
    <div className={header}>
      <div className="header-top">
        <div className="tags">
          <a href="./#">
            <img
              id="site-logo"
              src="https://64.media.tumblr.com/add0f153b2b9d647ddd2773b8612fe3d/tumblr_ozqqsgf3Bl1u0ccv7o1_1280.gifv"
              alt="site-logo"
            />
          </a>
          <a href="./#" className="site-name">
            ArtBox
          </a>
        </div>
        <nav className="icons">
          <a href="./#/collections">
            <i className="fas fa-images"></i>
            <div>Collections</div>
          </a>
          {/* <a href="./#/shop?type=tickets">
            <img
              className="icon icon__ticket"
              src="https://www.vippng.com/png/detail/414-4142418_png-file-ticket-vector-icon.png"
              alt="icon"
            />
            <div>buy ticket</div>
          </a> */}
          <a href="./#/shop">
            <i className="fas fa-store"></i>
            <div>Shop</div>
          </a>
          {!user && (
            <a href="./#/login">
              <div className="drop">
                <i className="fas fa-user"></i>
                <button>Log In</button>
              </div>
            </a>
          )}
          {user && (
            <button>
              <div className="drop">
                <i className="fas fa-user"></i>
                <button>User</button>
                <div className="dropbox">
                  <a href="./#/user?">WISHLIST</a>
                  <a href="./#/user?">訂單查詢</a>
                  <LogoutBtn />
                </div>
              </div>
            </button>
          )}
        </nav>
      </div>
    </div>
  )
}
