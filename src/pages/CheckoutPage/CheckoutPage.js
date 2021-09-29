import { css } from '@emotion/css'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCartProduct,
  setCartTotal
  // calculateCartTotal
} from '../../redux/reducers/cartReducer'

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

  .reminder {
    font-size: 18px;
    font-family: Arial;
    padding-top: 10px;
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
  grid-gap: 10px 80px;

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

      &__error {
        color: red;
        display: inline-block;
      }

      &__step {
        > p {
          font-size: 20px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          display: inline-block;
          width: 90%;
          padding: 10px 0;
        }

        &__number {
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
        max-width: 800px;
        display: grid;
        grid-gap: 5px 30px;
        grid-template-columns: 5% 35% 60%;
        align-items: center;

        input {
          outline: none;
          padding: 0 5px;
        }

        p {
          margin: 0;
        }

        span {
          color: red;
        }
      }
    }
    .form-check {
      margin: 0 50px;

      .form-check-label {
        margin-right: 10px;
      }
    }
  }

  .checkout-btns {
    font-family: 'Gill Sans';
    display: flex;
    justify-content: space-between;
    margin: 0 30px 0;

    button {
      width: 20%;
      padding: 10px;
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

      &:hover {
        background: rgba(0, 0, 0, 0.6);
      }
    }

    .next-btn {
      border: none;
      background: rgba(255, 222, 3, 0.7);
      margin: 10px;

      i {
        margin: 0 0 0 30px;
        font-size: 16px;
      }

      &:hover {
        background: rgba(255, 222, 3, 1);
      }
    }
  }
`

const finalPageContainer = css`
  margin: 60px;
  font-family: 'Gill Sans';
  font-weight: 100;
  font-size: 16px;

  .product {
    display: grid;
    grid-template-columns: 25% 23% 16% 16% 16%;
    margin: 20px;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    align-items: center;

    :nth-child(1) {
      font-size: 22px;
      font-weight: 500;
    }

    &__image {
      margin: 0 auto 1rem;
      max-width: 200px;
      max-height: 180px;
      object-fit: contain;
    }
  }

  .total {
    display: flex;
    justify-content: end;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin: 0 20px;

    p {
      font-size: 22px;
      padding: 10px;
    }
  }

  .info {
    display: grid;
    grid-template-columns: 20% 40%;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin: 0 20px;

    p {
      font-size: 17px;
      margin: 0;
      padding: 20px;

      &:nth-child(2) {
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }

  .confirm-btns {
    display: flex;
    justify-content: space-between;
    margin: 20px 10px 0;

    button {
      width: 20%;
      padding: 10px;
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

      &:hover {
        background: rgba(0, 0, 0, 0.6);
      }
    }

    .next-btn {
      border: none;
      background: rgba(255, 222, 3, 0.7);
      margin: 10px;
      ${'' /* text-align: right; */}

      i {
        margin: 0 0 0 20px;
        font-size: 16px;
      }

      &:hover {
        background: rgba(255, 222, 3, 1);
      }
    }
  }
`

const orderDoneContent = css`
  font-family: 'sans-serif';
  margin: 80px auto;
  padding-bottom: 20px;
  text-align: center;
  box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.3);
  max-width: 90%;

  h1 {
    font-weight: 300;
    font-size: 22px;
    padding: 18px 0;

    &:nth-child(1) {
      background: rgba(0, 0, 0, 0.8);
      font-size: 50px;
      color: white;
      padding: 30px 20px;

      i {
        margin-right: 20px;
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

export default function CheckoutPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const cartItem = useSelector((store) => store.carts.cartProduct)
  const subTotal = useSelector((store) => store.carts.cartTotal)

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    shippingType: '',
    paymentType: ''
  })
  const [errors, setErrors] = useState('')
  const updateFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const { name, email, mobile, address, shippingType, paymentType } = formData
  const {
    nameMsg,
    emailMsg,
    mobileMsg,
    addressMsg,
    shippingTypeMsg,
    paymentTypeMsg
  } = errors

  function formValidation() {
    let errors = {}
    let formIsValid = true

    // 名稱驗證
    if (name.trim() === '') {
      formIsValid = false
      errors['nameMsg'] = 'Please enter your name.'
    }

    // 信箱驗證
    const isEmail = /^([\w]+)(.[\w]+)*@([\w]+)(.[\w]{2,3}){1,2}$/

    if (!isEmail.test(email)) {
      formIsValid = false
      errors['emailMsg'] =
        'Please enter your email address in format "yourname@example.com".'
    }

    // 手機驗證
    const isMobile = /^09[0-9]{8}$/

    if (!isMobile.test(mobile)) {
      formIsValid = false
      errors['mobileMsg'] =
        'Please enter your mobile number in format "09xxxxxxxx".'
    }

    if (address.trim() === '') {
      formIsValid = false
      errors['addressMsg'] = 'Please enter your address for delivery.'
    }

    // radio 驗證
    if (shippingType === '') {
      formIsValid = false
      errors['shippingTypeMsg'] = 'Please choose the shipping type.'
    }

    if (paymentType === '') {
      formIsValid = false
      errors['paymentTypeMsg'] = 'Please choose the payment method.'
    }

    setErrors(errors)
    return formIsValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    const result = `
    The information:
    - Name：${name}
    - Email：${email}
    - Mobile：${mobile}
    - Address：${address}
    - shipping：${shippingType}
    - payment：${paymentType}`

    if (formValidation()) {
      alert(result)
    }
  }

  // 下一步按鈕
  const handleStepIncrement = () => {
    if (step === 1 && cartItem.length !== 0) {
      setStep((prevStep) => prevStep + 1)
    } else if (step === 1 && cartItem.length === 0) {
      history.push('/shop')
    } else if (step === 2 && formValidation()) {
      setStep((prevStep) => prevStep + 1)
    } else if (step === 3) {
      setStep((prevStep) => prevStep + 1)
    }
  }

  // 上一步按鈕
  const handleStepDecrement = () => {
    setErrors('')
    setStep((prevStep) => prevStep - 1)
  }

  const data = JSON.parse(localStorage.getItem('cartData'))

  useEffect(() => {
    if (!data || data.length === 0) {
      history.push('/shop')
    } else if (data && data.length !== 0) {
      dispatch(setCartProduct(data))
    }
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    let total = 0
    for (let i = 0; i < data.length; i++) {
      let price = Number(data[i].price) * Number(data[i].quantity)
      total += price
    }
    dispatch(setCartTotal(total))
  }, [data])

  function CartItem({ cartItem }) {
    const [count, setCount] = useState(cartItem.quantity)
    //Create handleDecrement event handler
    let data = JSON.parse(localStorage.getItem('cartData'))
    let duplicateData
    const itemExists = data.some((data) => {
      if (data.id === cartItem.id) {
        duplicateData = data
      }
      return duplicateData
    })

    function handleAddQuantity() {
      let maximum = 10
      if (count < maximum) {
        setCount((prevCount) => prevCount + 1)
      } else {
        return false
      }

      if (itemExists) {
        let items = JSON.parse(localStorage.cartData)
        for (let i = 0; i < items.length; i++) {
          if (duplicateData.id === items[i].id) {
            items[i].quantity += 1
            break
          }
        }
        // Create handleIncrement event handler
        localStorage.setItem('cartData', JSON.stringify(items))
        dispatch(setCartProduct(items))
      }
    }

    function handleMinusQuantity() {
      if (count > 1) {
        setCount((prevCount) => prevCount - 1)
      } else {
        return false
      }

      if (itemExists) {
        let items = JSON.parse(localStorage.cartData)
        for (let i = 0; i < items.length; i++) {
          if (duplicateData.id === items[i].id) {
            items[i].quantity -= 1
            break
          }
        }
        localStorage.setItem('cartData', JSON.stringify(items))
        dispatch(setCartProduct(items))
      }
    }

    function deleteItem() {
      const data = JSON.parse(localStorage.getItem('cartData'))
      for (let i = 0; i < data.length; i++) {
        if (cartItem.id === data[i].id) {
          data.splice(i, 1)
          localStorage.setItem('cartData', JSON.stringify(data))
        }
      }
      dispatch(setCartProduct(data))
    }

    return (
      <div className="cart__product">
        <a href={`/#/product/${cartItem.category}/${cartItem.id}`}>
          <img src={cartItem.image} />
        </a>
        <div>
          <h1 className="cart__product__title">{cartItem.title}</h1>

          <p className="cart__product__price">$ {cartItem.price}</p>
          <p className="cart__product__size">Size: </p>
          <select className="form-select" aria-label="Default select example">
            <option selected>{cartItem.size}</option>
          </select>
          <div className="cart__product__quantity">
            <p>Quantity: </p>
            <div className="btn-group quantity" role="group">
              <button type="button" onClick={handleMinusQuantity}>
                -
              </button>
              <p className="quantity__count">{count}</p>
              <button type="button" onClick={handleAddQuantity}>
                +
              </button>
            </div>
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

  const CartContent = () => {
    return (
      <div className={cartPageContainer}>
        <div className="cartContainer">
          <h2>Shopping Cart</h2>
          {cartItem &&
            cartItem.length > 0 &&
            cartItem.map((item) => <CartItem key={item.id} cartItem={item} />)}
          {!cartItem ||
            (cartItem.length === 0 && (
              <p className="reminder">Cart is empty ʕ•ᴥ•ʔ</p>
            ))}
        </div>

        <div className="cart__subtotal">
          <h2>Order Summary</h2>
          <div>
            <h1>Subtotal</h1>
            <h1>$ {subTotal}</h1>
          </div>
          <button className="checkout-btn" onClick={handleStepIncrement}>
            CHECKOUT
          </button>
        </div>
      </div>
    )
  }

  const FinalContent = () => (
    <div className={finalPageContainer}>
      <div className="product">
        <p className="product__image">Product Image</p>
        <p className="product__title">Product Name</p>
        <p className="product__size">Size</p>
        <p className="product__quantity">Quantity</p>
        <p className="product__price">Price</p>
      </div>
      <div className="product">
        <img className="product__image" src={images[0]} />
        <p className="product__title">Kinetic Light Blue Green Earrings</p>
        <p className="product__size">100*100 cm</p>
        <p className="product__quantity">1</p>
        <p className="product__price">$ 27.99</p>
      </div>

      <div className="total">
        <p>Subtotal</p>
        <p>$ 27.99</p>
      </div>

      <div className="info">
        <p>Email</p>
        <p>{formData.email}</p>
      </div>
      <div className="info">
        <p>Name</p>
        <p>{formData.name}</p>
      </div>
      <div className="info">
        <p>Mobile</p>
        <p>{formData.mobile}</p>
      </div>
      <div className="info">
        <p>Address</p>
        <p>{formData.address}</p>
      </div>
      <div className="info">
        <p>Payment Method</p>
        <p>{formData.paymentType}</p>
      </div>
      <div className="info">
        <p>Shipping Type</p>
        <p>{formData.shippingType}</p>
      </div>
      <div className="info">
        <p>Payment Condition</p>
        <p>Not done</p>
      </div>

      <div className="confirm-btns">
        <button className="previous-btn" onClick={handleStepDecrement}>
          <i className="fas fa-chevron-left"></i>
          Previous
        </button>

        <button
          type="submit"
          className="next-btn"
          onClick={handleStepIncrement}
        >
          Submit orders<i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  )

  return (
    <div className={container}>
      {step === 1 && (
        <>
          <div className="checkout-step-block">
            <div style={{ background: 'rgba(0, 0, 0, 0.8)', color: 'white' }}>
              Step 1. Check your cart
            </div>
            <div>Step 2. Fill in your information</div>
            <div>Step 3. Final Confirmation</div>
          </div>
          <CartContent />
        </>
      )}
      {step === 2 && (
        <>
          <div className="checkout-step-block">
            <div>Step 1. Check your cart</div>
            <div style={{ background: 'rgba(0, 0, 0, 0.8)', color: 'white' }}>
              Step 2. Fill in your information
            </div>
            <div>Step 3. Final Confirmation</div>
          </div>
          <div className={checkoutPageContainer}>
            <form onSubmit={handleSubmit}>
              <div className="checkout-container">
                <div className="checkout">
                  <div className="checkout__step">
                    <span className="checkout__step__number">01.</span>
                    <p>Shipping</p>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="shippingType"
                      value="Home delivery"
                      onChange={(e) => updateFormData(e)}
                      id="flexRadioDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Home delivery
                    </label>
                    <span className="checkout__error">{shippingTypeMsg}</span>
                  </div>
                </div>

                <div className="checkout">
                  <div className="checkout__step">
                    <span className="checkout__step__number">02.</span>
                    <p>Payment</p>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentType"
                        value="Collect on delivery"
                        onChange={(e) => updateFormData(e)}
                        id="paymentRadio1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="paymentRadio1"
                      >
                        Collect on delivery
                      </label>
                      <span className="checkout__error">{paymentTypeMsg}</span>
                    </div>
                  </div>
                </div>
                <div className="checkout">
                  <div className="checkout__step">
                    <span className="checkout__step__number">03.</span>
                    <p>Recipient's information</p>
                    <form onSubmit={handleSubmit}>
                      <div className="checkout__type">
                        <p>Name:</p>
                        <input
                          className="checkout-input"
                          type="text"
                          name="name"
                          value={name}
                          onChange={(e) => updateFormData(e)}
                        />
                        <span className="checkout__error">{nameMsg}</span>
                        <br />
                      </div>
                      <div className="checkout__type">
                        <p>Email:</p>
                        <input
                          className="checkout-input"
                          autoFocus="autoFocus"
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => updateFormData(e)}
                        />
                        <span className="checkout__error">{emailMsg}</span>
                        <br />
                      </div>
                      <div className="checkout__type">
                        <p>Mobile:</p>
                        <input
                          className="checkout-input"
                          autoFocus="autoFocus"
                          type="tel"
                          name="mobile"
                          value={mobile}
                          onChange={(e) => updateFormData(e)}
                        />
                        <span className="checkout__error">{mobileMsg}</span>
                        <br />
                      </div>
                      <div className="checkout__type">
                        <p>Address:</p>
                        <input
                          className="checkout-input"
                          autoFocus="autoFocus"
                          type="text"
                          name="address"
                          value={address}
                          onChange={(e) => updateFormData(e)}
                        />
                        <span className="checkout__error">{addressMsg}</span>
                        <br />
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="checkout-btns">
                <button className="previous-btn" onClick={handleStepDecrement}>
                  <i className="fas fa-chevron-left"></i>
                  Previous
                </button>

                <button
                  type="submit"
                  className="next-btn"
                  onClick={handleStepIncrement}
                >
                  Next <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <div className="checkout-step-block">
            <div>Step 1. Check your cart</div>
            <div>Step 2. Fill in your information</div>
            <div style={{ background: 'rgba(0, 0, 0, 0.8)', color: 'white' }}>
              Step 3. Final Confirmation
            </div>
          </div>

          <FinalContent />
        </>
      )}
      {step === 4 && (
        <div className={orderDoneContent}>
          {/* <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/thank-you-for-your-order-design-template-d56ea122db50ee6c2fe9cef22da510a2_screen.jpg?ts=1608779634" /> */}
          {/* <img src="https://brandlokstore.com/store/wp-content/uploads/2021/01/dffs.png" /> */}
          <h1>
            <i className="fas fa-check-circle"></i>
            {/* <img
              src="https://i.pinimg.com/originals/70/a5/52/70a552e8e955049c8587b2d7606cd6a6.gif"
              loop="false"
            /> */}
            Thank you for your order!
          </h1>
          <h1>Your order has been placed.</h1>
          <h1>
            You will receive an email with tracking information once your goods
            have shipped.
          </h1>
        </div>
      )}
    </div>
  )
}
