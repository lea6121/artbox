import { css } from '@emotion/css'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import 'react-multi-carousel/lib/styles.css'
import Cart from '../../components/Cart'
import Loading from '../../components/Loading'
import { getUserOrders, setIsLoading } from '../../redux/reducers/userReducer'

const orderlistPageContainer = css`
  width: 100vw;
  height: auto;
  font-family: 'Gill Sans';
  font-weight: 300;
  border: 1px solid transparent;
  border-bottom: 1px solid white;

  .orderlist {
    position: relative;
    margin: 50px auto;
    width: 1120px;
    background: white;
    padding: 0 50px 50px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    box-shadow: 7px 7px 1px 0px rgba(0, 0, 0, 0.7);

    ${
      '' /* &__right-dot {
      position: absolute;
      width: 24px;
      height: 24px;
      background: rgba(0, 0, 0, 0.7);
      top: 12px;
      right: 12px;
      border-radius: 50%;
      box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);
    }

    &__left-dot {
      position: absolute;
      width: 24px;
      height: 24px;
      background: rgba(0, 0, 0, 0.7);
      top: 12px;
      left: 12px;
      border-radius: 50%;
      box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
    } */
    }

    .reminder {
      font-size: 22px;
      padding: 40px 0 20px;
      font-family: 'Arial';
      letter-spacing: 0.05rem;
      text-align: center;
      color: rgba(0, 0, 0, 0.8);
    }

    &__title {
      padding: 50px 0 30px;
      color: rgba(0, 0, 0, 0.7);
      border-bottom: 1px solid black;
      text-align: center;

      h1 {
        font-size: 38px;
        text-align: left;
        padding: 0 10px;
      }

      a {
        display: inline-block;
        margin-left: 8px;
        color: unset;
        text-decoration: none;
      }
    }

    .order {
      display: grid;
      grid-template-columns: 20% 20% 20% 20% 20%;
      margin: 20px 0;
      text-align: center;
      align-items: center;
      font-size: 18px;

      i {
        cursor: pointer;
      }

      &__image {
        margin: 0 auto 1rem;
        max-width: 200px;
        max-height: 200px;
        object-fit: contain;
      }
    }

    .order:nth-child(2) {
      border-bottom: 1px solid black;
      font-weight: 500;
      font-size: 20px;
    }

    .order-products {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 30px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      transition: all 2s ease-in-out;

      p {
        margin: 0;
        font-size: 18px;
      }

      i {
        cursor: pointer;
      }
    }

    .products {
      padding: 0 20px;
      position: relative;
      box-shadow: inset 0px -2px rgba(0, 0, 0, 0.7);
      transition: all 2s ease-in-out;

      .product {
        position: relative;
        display: grid;
        grid-template-columns: 30% 30% 20% 20%;
        margin: 0 0;
        padding: 20px 0 10px;
        text-align: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        align-items: center;
        font-size: 18px;

        i {
          cursor: pointer;
        }

        &__image {
          margin: 0 auto 1rem;
          max-width: 120px;
          max-height: 120px;
          object-fit: contain;
        }
      }
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
`

function Product({ product }) {
  const totalPrice = product.price * product.quantity
  return (
    <div className="product">
      <img className="product__image" src={product.image} />
      <p className="product__title">{product.title}</p>
      <p className="product__price">{product.quantity}</p>
      <p className="product__price">$ {totalPrice}</p>
    </div>
  )
}

function Order({ order }) {
  const [showOrderProducts, setShowOrderProducts] = useState(false)
  const showOrderProductsBtn = () =>
    showOrderProducts ? setShowOrderProducts(false) : setShowOrderProducts(true)

  return (
    <>
      <div className="order">
        <p className="order__date">{order.orderDate}</p>
        <p className="order__id">{order.orderId}</p>
        <p className="order__payment-type">{order.formData.paymentType}</p>
        <p className="order__order-condition">{order.shipment}</p>
        <p className="order__total">$ {order.subtotal}</p>
      </div>
      <div className="order-products" onClick={showOrderProductsBtn}>
        <p>ORDER DETAILS</p>
        <i
          className={
            showOrderProducts ? 'fas fa-angle-up' : 'fas fa-angle-down'
          }
        ></i>
      </div>

      {showOrderProducts ? (
        <div className="products animate__animated animate__fadeIn">
          <div className="product">
            <p className="product__image">Image</p>
            <p className="product__title">Name</p>
            <p className="product__quantity">Quantity</p>
            <p className="product__price">Price</p>
          </div>

          {order.order.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      ) : null}
    </>
  )
}

export default function WishlistPage() {
  const history = useHistory()
  const dispatch = useDispatch()
  const userOrders = useSelector((store) => store.users.userOrders)
  const userId = useSelector((store) => store.users.userId)
  const isLoadingMsg = useSelector((store) => store.users.isLoading)
  console.log(isLoadingMsg)
  useEffect(() => {
    if (userId) {
      dispatch(getUserOrders(userId))
    } else {
      alert('Please log in first!')
      history.push('/login')
    }
  }, [userId])

  if (userOrders) {
    console.log(userOrders)
  }

  return (
    <div className={orderlistPageContainer}>
      {isLoadingMsg && <Loading />}
      <div className="orderlist">
        {/* <div className="wishlist__left-dot"></div>
        <div className="wishlist__right-dot"></div> */}
        <div className="orderlist__title">
          <h1>MY ORDERS.</h1>
        </div>

        <div className="order">
          <p className="order__date">Order Date</p>
          <p className="order__id">Order Id</p>
          <p className="order__payment-type">Payment Type</p>
          <p className="order__order-condition">Shipment</p>
          <p className="order__total">Subtotal</p>
        </div>

        {userOrders.length === 0 && (
          <p className="reminder">
            Orderlist is empty ʕ•ᴥ•ʔ Buy something new ?
          </p>
        )}

        {userOrders.map((order) => (
          <Order key={order.id} order={order} />
        ))}

        <Cart />
      </div>
    </div>
  )
}
