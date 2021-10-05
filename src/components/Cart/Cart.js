import { css } from '@emotion/css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import { setCartProduct } from '../../redux/reducers/cartReducer'

const cartContainer = css`
  .mask {
    position: fixed;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.3);
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }
`
const easeSlow = css`
  transition: all 460ms ease-in-out;
`

const menuBtn = css`
  position: fixed;
  z-index: 4;
  bottom: 10px;
  right: 10px;
  cursor: pointer;

  i {
    font-size: 24px;
    background: linear-gradient(#000000, rgb(172, 170, 170));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    ${easeSlow};
  }

  p {
    font-family: 'Gill Sans';
    position: absolute;
    top: -14px;
    right: -6px;
    background: red;
    color: white;
    padding: 0 6px;
    font-size: 14px;
    border-radius: 50%;
    ${easeSlow};
  }

  &.closer {
    i,
    p {
      transform: translateX(-350px);
      @media only screen and (max-width: 579px) {
        transform: translateX(-210px);
      }
    }
  }
`
const menuOverlay = css`
  z-index: 3;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: white;
  height: 100vh;
  width: 400px;
  transform: translateX(100%);
  transition: all 450ms ease-in-out;

  &.show {
    transform: translateX(0%);
  }

  @media only screen and (max-width: 579px) {
    width: 250px;
  }

  nav {
    display: block;

    h1 {
      height: 120px;
      margin: 0 0;
      font-family: serif;
      text-align: center;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 30px 0;
      font-size: 48px;
    }

    a {
      display: block;
      text-decoration: none;
      color: #3e3e3e;
      cursor: pointer;
      transition: all 150ms ease-in-out;
      &:hover {
        color: #eb4c54;
      }
    }

    .cart {
      padding: 20px;
      font-family: 'Gill Sans';
      font-weight: 300;
      font-size: 14px;
      height: 65vh;
      overflow-y: auto;

      i {
        cursor: pointer;
        font-size: 20px;
        &:hover {
          color: rgb(201, 36, 36);
        }
      }

      p {
        margin: 0;
      }

      &__reminder {
        font-size: 22px;
        text-align: center;
        font-family: Arial;
      }

      &__item {
        margin: 0 auto 15px;
        display: grid;
        grid-template-columns: 32% 58% 10%;
        grid-gap: 10px;
        justify-content: center;
        align-items: center;
        max-height: 150px;
      }

      &__pic {
        width: 100%;
        max-height: 100%;
      }

      &__details {
        padding: 0 3px;

        div {
          padding: 3px 0;
        }

        @media only screen and (max-width: 579px) {
          font-size: 10px;
        }
      }

      &__quantity {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }

    .btn-line {
      position: fixed;
      bottom: 70px;
      width: 100%;
      border: 1px solid solid;
    }

    button {
      position: fixed;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 0%);
      display: block;
      width: 70%;
      margin: 20px auto 10px;
      padding: 18px;
      font-size: 16px;

      a {
        color: unset;
        &:hover {
          color: unset;
        }
      }
    }

    .checkout-btn {
      border: none;
      color: white;
      background: rgba(12, 130, 1);
      transition: all 0.2s ease-out;

      &:hover {
        background: rgba(194, 23, 14);
      }
    }
  }
`

export default function Cart() {
  const dispatch = useDispatch()
  const history = useHistory()
  const userId = useSelector((store) => store.users.userId)
  const cartItem = useSelector((store) => store.carts.cartProduct)
  const data = JSON.parse(localStorage.getItem('cartData'))
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const handleLogin = () => {
    history.push('/login')
  }

  function CheckoutBtn() {
    const [show, setShow] = useState(false)
    const handleClose = () => {
      if (!cartItem || cartItem.length === 0) {
        history.push('/shop')
        setShow(false)
      }
      setShow(false)
    }

    const handleShow = () => {
      if (!userId) {
        setShow(true)
      } else if (cartItem.length === 0) {
        setShow(true)
      } else {
        history.push('/checkout')
      }
    }
    return (
      <>
        <hr className="btn-line" />
        <button className="checkout-btn" variant="primary" onClick={handleShow}>
          CHECKOUT
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            {cartItem.length === 0 ? (
              <>
                Your cart is empty. Add something first
                <i
                  className="far fa-grin-squint"
                  style={{ marginLeft: '5px' }}
                ></i>
              </>
            ) : (
              <>
                Please log in first
                <i
                  className="far fa-grin-squint"
                  style={{ marginLeft: '5px' }}
                ></i>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {cartItem.length > 0 && (
              <Button variant="primary" onClick={handleLogin}>
                Confirm
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </>
    )
  }

  function CartItem({ cartItem }) {
    function deleteItem() {
      for (let i = 0; i < data.length; i++) {
        if (cartItem.id === data[i].id) {
          data.splice(i, 1)
          localStorage.setItem('cartData', JSON.stringify(data))
        }
      }
      dispatch(setCartProduct(data))
    }

    return (
      <div className="cart__item">
        <a href={`/#/product/${cartItem.category}/${cartItem.id}`}>
          <img className="cart__pic" src={cartItem.image} alt="want to buy" />
        </a>
        <div className="cart__details">
          <div>
            <a href={`/#/product/${cartItem.category}/${cartItem.id}`}>
              {cartItem.title}
            </a>
          </div>
          <div>
            <p>{cartItem.size}</p>
          </div>
          <div className="cart__quantity">
            <p>
              {cartItem.quantity} * $ {cartItem.price}
            </p>
          </div>
        </div>
        <i
          className="fa fa-trash"
          onClick={() => {
            deleteItem()
          }}
        ></i>
      </div>
    )
  }

  useEffect(() => {
    if (data && data.length !== 0) {
      dispatch(setCartProduct(data))
    }
  }, [])

  return (
    <div className={cartContainer}>
      {isMenuOpen && <div className="mask"></div>}
      <div
        className={`${menuBtn} ${isMenuOpen ? 'closer' : null}`}
        onClick={
          isMenuOpen ? () => setIsMenuOpen(false) : () => setIsMenuOpen(true)
        }
      >
        <i className="fas fa-shopping-cart"></i>
        <p>{cartItem.length}</p>
      </div>
      <div className={`${menuOverlay} ${isMenuOpen ? 'show' : null}`}>
        <nav>
          <h1>Cart</h1>

          <div className="cart">
            {(!cartItem || cartItem.length === 0) && (
              <p className="cart__reminder">Cart is empty ʕ•ᴥ•ʔ</p>
            )}
            {cartItem &&
              cartItem.length > 0 &&
              data.map((item) => <CartItem key={item.id} cartItem={item} />)}
          </div>
          <CheckoutBtn />
        </nav>
      </div>
    </div>
  )
}
