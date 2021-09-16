import { css } from '@emotion/css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const mask = css`
  position: absolute;
  z-index: 3;
  background: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: -webkit-fill-available;
  top: 0;
  left: 0;
`
const easeSlow = css`
  transition: all 500ms ease-in-out;
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
  }
  ${easeSlow};
  &.closer {
    i {
      color: transparent;
      background: transparent;
    }
  }
`
const menuBtnLine = css`
  position: absolute;
  top: 50px;
  right: 30px;
`

const btnLine = css`
  position: fixed;
  z-index: 2;
  width: 23px;
  height: 3px;
  margin: 0 0 5px 0;
  ${easeSlow};
  &.closer {
    z-index: 4;
    cursor: pointer;
    background-color: white;

    &:nth-child(1) {
      transform: rotate(-45deg) translate(-240px, -230px);
    }
    &:nth-child(2) {
      transform: translateX(-338px);
    }
    &:nth-child(3) {
      transform: rotate(45deg) translate(-240px, 230px);
    }
  }
`
const menuOverlay = css`
  z-index: 3;
  position: fixed;
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

  nav {
    display: block;

    h1 {
      height: 120px;
      margin: 0 0;
      font-family: Baskerville;
      text-align: center;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 40px 0 28px;
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
      font-family: Arial;
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      height: 63vh;
      overflow-y: auto;
      font-size: 14px;

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

      &__pic {
        max-width: 100px;
        max-height: 100px;
      }

      &__item {
        margin: 0 auto 8px;
        display: grid;
        grid-template-columns: 32% 58% 10%;
        justify-content: center;
        align-items: center;
        height: 100px;
      }

      &__details {
        padding: 0 3px;
        div {
          padding: 3px 0;
        }
      }

      &__quantity {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }

    button {
      display: block;
      width: 70%;
      margin: 20px auto 10px;
      padding: 18px;
      font-family: Baskerville;
      font-size: 16px;
    }

    .view-cart-btn {
      border: 1px solid black;
      color: black;
      background: rgba(255, 255, 255, 0);
      transition: all 0.5s ease-out;

      &:hover {
        color: white;
        background: black;
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
  const cartItemCounter = useSelector((store) => store.collections.collections)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {isMenuOpen && <div className={`${mask}`}></div>}
      <div
        className={`${menuBtn} ${isMenuOpen ? 'closer' : null}`}
        onClick={
          isMenuOpen ? () => setIsMenuOpen(false) : () => setIsMenuOpen(true)
        }
      >
        <i class="fas fa-shopping-cart"></i>
      </div>
      <div
        className={`${menuBtnLine} ${isMenuOpen ? 'closer' : null}`}
        onClick={
          isMenuOpen ? () => setIsMenuOpen(false) : () => setIsMenuOpen(true)
        }
      >
        <div className={`${btnLine} ${isMenuOpen ? 'closer' : null}`} />
        <div className={`${btnLine} ${isMenuOpen ? 'closer' : null}`} />
        <div className={`${btnLine} ${isMenuOpen ? 'closer' : null}`} />
      </div>
      <div className={`${menuOverlay} ${isMenuOpen ? 'show' : null}`}>
        <nav>
          <h1>Cart</h1>

          <div className="cart">
            <div className="cart__item">
              <a href="#">
                <img
                  className="cart__pic"
                  src="https://artwork.wallartprints.com/media/catalog/product/cache/98550ffb3d2e4312eec927763b7e3a7e/2/7/275049723_original.jpg"
                  alt="want to buy"
                />
              </a>
              <div className="cart__details">
                <div>
                  <a href="#">Alone in the snow</a>
                </div>
                <div>
                  <p>45cm x 30cm (18" x 12")</p>
                </div>
                <div className="cart__quantity">
                  <p>1 * $44.99 </p>
                </div>
              </div>
              <i className="fa fa-trash"></i>
            </div>

            <div className="cart__item">
              <a href="#">
                <img
                  className="cart__pic"
                  src="https://artwork.wallartprints.com/media/catalog/product/cache/2b69841aa3d261a0927b12ac5c995383/1/1/116547795_stretchedcanvas.jpg"
                  alt="want to buy"
                />
              </a>
              <div className="cart__details">
                <div>
                  <a href="#">Alone in the snow</a>
                </div>
                <div>
                  <p>45cm x 30cm (18" x 12")</p>
                </div>
                <div className="cart__quantity">
                  <p>1 * $44.99 </p>
                </div>
              </div>
              <i className="fa fa-trash"></i>
            </div>

            <div className="cart__item">
              <a href="#">
                <img
                  className="cart__pic"
                  src="https://static.wixstatic.com/media/27af89_cad6213a03394f3c974df2d47583cdcd~mv2.jpg/v1/fill/w_96,h_96,q_85,usm_0.66_1.00_0.01/27af89_cad6213a03394f3c974df2d47583cdcd~mv2.webp"
                  alt="want to buy"
                />
              </a>
              <div className="cart__details">
                <div>
                  <a href="#">I am a artwork</a>
                </div>
                <div>
                  <p>45cm x 30cm (18" x 12")</p>
                </div>
                <div className="cart__quantity">
                  <p>1 * $44.99 </p>
                </div>
              </div>
              <i className="fa fa-trash"></i>
            </div>

            <div className="cart__item">
              <a href="#">
                <img
                  className="cart__pic"
                  src="https://static.wixstatic.com/media/27af89_cad6213a03394f3c974df2d47583cdcd~mv2.jpg/v1/fill/w_96,h_96,q_85,usm_0.66_1.00_0.01/27af89_cad6213a03394f3c974df2d47583cdcd~mv2.webp"
                  alt="want to buy"
                />
              </a>
              <div className="cart__details">
                <div>
                  <a href="#">I am a artwork</a>
                </div>
                <div>
                  <p>45cm x 30cm (18" x 12")</p>
                </div>
                <div className="cart__quantity">
                  <p>1 * $44.99 </p>
                </div>
              </div>
              <i className="fa fa-trash"></i>
            </div>

            <div className="cart__item">
              <a href="#">
                <img
                  className="cart__pic"
                  src="https://static.wixstatic.com/media/27af89_cad6213a03394f3c974df2d47583cdcd~mv2.jpg/v1/fill/w_96,h_96,q_85,usm_0.66_1.00_0.01/27af89_cad6213a03394f3c974df2d47583cdcd~mv2.webp"
                  alt="want to buy"
                />
              </a>
              <div className="cart__details">
                <div>
                  <a href="#">I am a artwork</a>
                </div>
                <div>
                  <p>45cm x 30cm (18" x 12")</p>
                </div>
                <div className="cart__quantity">
                  <p>1 * $44.99 </p>
                </div>
              </div>
              <i className="fa fa-trash"></i>
            </div>
          </div>
          <button className="view-cart-btn">VIEW CART</button>
          <button className="checkout-btn">CHECKOUT</button>
        </nav>
      </div>
    </>
  )
}
