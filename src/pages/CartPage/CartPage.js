import { css } from '@emotion/css'
import { useState, useEffect } from 'react'
import { setCartProduct } from '../../redux/reducers/cartReducer'

const container = css`
  max-width: 1180px;
  margin: 20px auto;
  font-family: Serif;

  .checkout-step-block {
    font-size: 18px;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px 10px;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.6);

    div {
      background: rgba(0, 0, 0, 0.1);
      padding: 14px;
    }
  }
`
const cartPageContainer = css`
  margin: 20px auto;
  padding: 0 30px;
  display: grid;
  grid-gap: 10px 50px;
  grid-template-columns: 65% 30%;

  h2 {
    padding: 30px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding: 30px 0;
    font-size: 24px;
  }

  .cart__product {
    margin: 30px 0;
    padding: 30px 0;
    display: grid;
    grid-template-columns: 30% 60% 10%;
    align-items: center;
    grid-gap: 0 20px;
    font-size: 14px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

    img {
      width: 100%;
      max-height: 200px;
      object-fit: contain;
    }

    .form-select {
      display: inline-block;
      width: 40%;
      font-size: 12px;
    }

    &__title {
      font-size: 18px;
      padding: 5px 0;
    }

    &__price {
      font-size: 16px;
    }

    &__size {
      display: inline-block;
      margin-right: 10px;
    }

    &__quantity {
      p:nth-child(1) {
        display: inline-block;
        margin-right: 10px;
      }
    }

    .quantity {
      margin: 10px 0;
      width: 30%;
      height: 28px;
      align-items: center;

      &__count {
        width: 60%;
        text-align: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        margin-bottom: 0;
        padding: 6px 0;
      }

      button {
        ${'' /* font-size: 18px; */}
        border: none;
        background: none;
        padding: 10px;
      }
    }

    i {
      cursor: pointer;
      &:hover {
        color: rgb(201, 36, 36);
      }
    }
  }
  .cart__subtotal {
    h2 {
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }

    div {
      display: flex;
      justify-content: space-between;
      align-items: baseline;

      h1 {
        font-size: 22px;
        padding: 20px 10px;
      }
    }

    a {
      text-decoration: none;
    }

    .checkout-btn {
      display: block;
      width: 100%;
      margin: 20px auto 10px;
      padding: 10px;
      font-family: Baskerville;
      font-size: 16px;
      border: none;
      color: white;
      background: rgba(194, 23, 14);
      transition: all 0.2s ease-out;
    }
  }
`

const checkoutPageContainer = css`
  margin: 20px auto;
  font-family: Baskerville;
  padding: 0 40px;
  display: grid;
  max-width: 1180px;
  ${'' /* grid-template-columns: 40% 60%; */}
  grid-gap: 10px 80px;
  ${'' /* border: 1px solid black; */}

  h2 {
    padding: 30px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding: 30px 0;
    font-size: 28px;
  }

  .checkout-container {
    margin: 10px 30px;

    .checkout {
      padding: 20px 0;

      &__step {
        > p {
          font-size: 20px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          display: inline-block;
          width: 90%;
          padding: 10px 0;
        }

        span {
          display: inline-block;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 10px;
          margin-right: 10px;
          font-family: Arial;
        }

        form {
          margin: 0 50px;
        }
      }

      &__type {
        margin: 10px 0;

        p {
          margin: 0;
        }
        max-width: 300px;
        display: grid;
        grid-gap: 5px 30px;
        grid-template-columns: 10% 90%;
        ${'' /* justify-content: baseline; */}
        align-items: center;
      }
    }
    .form-check {
      margin: 0 50px;
      ${'' /* background: grey; */}
    }
  }

  .checkout-btns {
    text-align: right;

    button {
      ${'' /* display: block; */}
      width: 20%;
      ${'' /* margin: 20px auto 10px; */}
      padding: 10px;
      ${'' /* font-family: Baskerville; */}
      font-size: 20px;
    }

    .previous-btn {
      border: none;
      color: white;
      background: rgba(0, 0, 0, 0.3);
      margin: 10px;
      text-align: left;

      i {
        margin: 0 30px 0 30px;
        font-size: 16px;
      }
    }

    .next-btn {
      border: none;
      background: #ffde03;
      margin: 10px;
      ${'' /* text-align: right; */}

      i {
        margin: 0 0 0 30px;
        font-size: 16px;
      }
    }
  }
`

const images = [
  'https://cdn.shopify.com/s/files/1/0475/3663/6059/products/286166_2_640x992.jpg?v=1628003773',
  'https://cdn.shopify.com/s/files/1/0475/3663/6059/products/285927_2_768x576.jpg?v=1631141173',
  'https://cdn.shopify.com/s/files/1/0475/3663/6059/products/285928_2_932c9418-9f9f-49c2-bdf2-f03cedd90194_640x640.jpg?v=1631141188',
  'https://cdn.shopify.com/s/files/1/0475/3663/6059/products/286167_2_1384cb5b-2b9c-404a-b5bf-ebd51f1a4bdb_768x576.jpg?v=1631141203',
  'https://cdn.shopify.com/s/files/1/0475/3663/6059/products/284047_2_640x928.jpg?v=1629146779',
  'https://cdn.shopify.com/s/files/1/0475/3663/6059/products/65050_2_640x864.jpg?v=1620738968',
  'https://cdn.shopify.com/s/files/1/0475/3663/6059/products/285929_1_1280x576.jpg?v=1612930379',
  'https://cdn.shopify.com/s/files/1/0475/3663/6059/products/284909_2_640x736.jpg?v=1619794059'
]

function Counter() {
  // Set the initial count state to zero, 0
  const [count, setCount] = useState(1)

  // Create handleIncrement event handler
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1)
  }

  //Create handleDecrement event handler
  const handleDecrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1)
    }
  }
  return (
    <div className="btn-group quantity" role="group">
      <button type="button" onClick={handleDecrement}>
        -
      </button>
      {/* {count} */}
      <p className="quantity__count">{count}</p>
      <button type="button" onClick={handleIncrement}>
        +
      </button>
    </div>
  )
}

export default function CartPage() {
  const [showCartContent, setShowCartContent] = useState(false)
  const [showInfoContent, setShowInfoContent] = useState(false)

  const [showFinalContent, setShowFinalContent] = useState(false)

  const showInfoContentBtn = () =>
    showInfoContent
      ? setShowInfoContent(false) &&
        setShowCartContent(true) &&
        setShowFinalContent(false)
      : setShowInfoContent(true) &&
        setShowCartContent(false) &&
        setShowInfoContent(false)

  // const showFinalContentBtn = () =>
  //   showFinalContent
  //     ? setShowFinalContent(false) && setShowInfoContent(false)
  //     : setShowFinalContent(true) &&
  //       setShowInfoContent(false) &&
  //       setCartProduct(false)

  const CartContent = () => (
    <div className={cartPageContainer}>
      <div className="cartContainer">
        <h2>Shopping Cart</h2>
        <div className="cart__product">
          <img src={images[0]} />
          <div>
            <h1 className="cart__product__title">
              Kinetic Light Blue Green Earrings
            </h1>
            <p className="cart__product__price">$ 27.99</p>

            <p className="cart__product__size">Size: </p>
            {/* <span>100*100 cm</span> */}
            <select className="form-select" aria-label="Default select example">
              {/* <option selected>Size</option> */}
              <option value="1">15*15 cm</option>
              <option value="2">30*30 cm</option>
              <option value="3">100*100 cm</option>
            </select>
            <div className="cart__product__quantity">
              <p>Quantity: </p>
              <Counter />
            </div>
          </div>
          <i className="fa fa-trash"></i>
        </div>

        <div className="cart__product">
          <img src={images[2]} />
          <div>
            <h1 className="cart__product__title">
              Kinetic Light Blue Green Earrings
            </h1>
            <p className="cart__product__price">$ 27.99</p>

            <p className="cart__product__size">Size: </p>
            {/* <span>100*100 cm</span> */}
            <select className="form-select" aria-label="Default select example">
              {/* <option selected>Size</option> */}
              <option value="1">15*15 cm</option>
              <option value="2">30*30 cm</option>
              <option value="3">100*100 cm</option>
            </select>
            <div className="cart__product__quantity">
              <p>Quantity: </p>
              <Counter />
            </div>
          </div>
          <i className="fa fa-trash"></i>
        </div>
      </div>
      <div className="cart__subtotal">
        <h2>Order Summary</h2>
        <div>
          <h1>Subtotal</h1>
          <h1>$ 475.00</h1>
        </div>
        {/* <a href="./#/checkout"> */}
        <button className="checkout-btn" onClick={showInfoContentBtn}>
          CHECKOUT
        </button>
        {/* </a> */}
      </div>
    </div>
  )

  const CheckoutContent = () => (
    <div className={checkoutPageContainer}>
      <div className="checkout-container">
        {/* <h2>Checkout</h2> */}
        <div className="checkout">
          <div className="checkout__step">
            <span>01.</span>
            <p> Shipping</p>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label className="form-check-label" for="flexRadioDefault1">
              Home delivery
            </label>
          </div>
        </div>

        <div className="checkout">
          <div className="checkout__step">
            <span>02.</span>
            <p>Payment</p>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="paymentRadio"
                id="paymentRadio"
              />
              <label class="form-check-label" for="paymentRadio1">
                Collect on delivery
              </label>
            </div>
          </div>
        </div>
        <div className="checkout">
          <div className="checkout__step">
            <span>03.</span>
            <p>Recipient's information</p>
            <form
            // onSubmit={handleSubmit}
            >
              <div className="checkout__type">
                <p>Name:</p>
                <input
                  className="checkout-input"
                  type="text"
                  name="name"
                  // value={email}
                  // onChange={(e) => updateFormData(e)}
                />
                <br />
              </div>
              <div className="checkout__type">
                <p>Email:</p>
                <input
                  className="checkout-input"
                  type="email"
                  name="email"
                  // value={email}
                  // onChange={(e) => updateFormData(e)}
                />
                <br />
              </div>
              <div className="checkout__type">
                <p>Phone:</p>
                <input
                  className="checkout-input"
                  type="phone"
                  name="phone"
                  // value={email}
                  // onChange={(e) => updateFormData(e)}
                />
                <br />
              </div>
              <div className="checkout__type">
                <p>Address:</p>
                <input
                  className="checkout-input"
                  type="text"
                  name="address"
                  // value={email}
                  // onChange={(e) => updateFormData(e)}
                />
                <br />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="checkout-btns">
        <button className="previous-btn" onClick={showInfoContentBtn}>
          <i class="fas fa-chevron-left"></i>
          Previous
        </button>

        <button
          className="next-btn"
          // onClick={showFinalContentBtn}
        >
          Next <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  )

  const FinalContent = () => <></>

  return (
    <div className={container}>
      <div className="checkout-step-block">
        <div>Step 1. Confirm your cart</div>
        <div>Step 2. Fill in your information</div>
        <div>Step 3. Final Confirmation</div>
      </div>
      {showInfoContent ? <CheckoutContent /> : <CartContent />}
      {/* {showFinalContent ? <FinalContent /> : <CheckoutContent />} */}
    </div>
  )
}
