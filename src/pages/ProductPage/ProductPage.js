import { css } from '@emotion/css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel as SliderCarousel } from 'react-responsive-carousel'
import Carousel from 'react-multi-carousel'
import Cart from '../../components/Cart'
import Loading from '../../components/Loading'
import { setCartProduct } from '../../redux/reducers/cartReducer'
import {
  getProduct,
  getSuggestProduct
} from '../../redux/reducers/productReducer'

const productPageContainer = css`
  font-family: Baskerville;
  padding: 40px 0;

  .shop-container {
    margin: 0 auto 50px;
    padding: 0 10px;

    .react-multiple-carousel__arrow {
      z-index: 3;
      background: rgba(0, 0, 0, 0.9);
    }

    .title {
      border-top: 1px solid rgba(0, 0, 0, 0.3);
      padding: 50px 0 50px;
      text-align: center;
      font-size: 22px;
      color: black;
      font-style: italic;
      font-family: Georgia;
    }

    .item {
      text-align: center;
      padding: 0 0 60px;
      margin: 20px 5px;
      color: black;
      position: relative;

      img {
        object-fit: contain;
        width: 100%;
        height: 400px;
        padding-bottom: 10px;
        ${'' /* border: 1px solid black; */}
      }

      div {
        padding: 3px 10px;
        font-size: 14px;
      }

      &__name {
        height: 50px;
      }

      &__cover {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;

        .quick-view-btn {
          position: absolute;
          display: block;
          border: none;
          bottom: 140px;
          left: 0;
          width: 100%;
          height: 50px;
          color: transparent;
          background: transparent;
          transition: 200ms ease-in;
        }

        &:hover {
          .quick-view-btn {
            color: black;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(0, 0, 0, 0.1);
          }
        }
      }
    }
  }
  .quantity {
    margin: 10px 0;
    width: 26%;

    &__count {
      width: 60%;
      height: 100%;
      text-align: center;
      border-top: 1px solid black;
      border-bottom: 1px solid black;
      margin-bottom: 0;
      font-size: 18px;
      padding: 6px 0;
    }
  }
`

const productContainer = css`
  width: 80vw;
  margin: 60px auto;
  padding: 0 10px;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 10px 10px;
  align-items: center;
  max-width: 100vw;
  overflow: hidden;

  img {
    max-height: 400px;
    object-fit: contain;
  }

  .product {
    padding: 0 20px;
    display: flex;
    flex-direction: column;

    div:nth-child(2) {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .fa-heart {
        color: rgb(209, 0, 0);
        cursor: pointer;
        margin-bottom: 12px;
        font-size: 20px;
      }
    }

    &__title {
      font-size: 32px;
      padding: 20px 0;
    }

    &__price {
      color: red;
      font-size: 28px;
      margin-bottom: 12px;
    }

    &__size {
      font-size: 20px;
    }

    &__quantity {
      font-size: 20px;
      margin-top: 20px;
    }

    &__description {
      padding: 20px 0;
    }

    &__add-to-cart {
      display: block;
      border: none;
      width: 100%;
      height: 50px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      transition: 1s ease-out;

      &:hover {
        ${'' /* transform: scale(1.1); */}
        background: rgba(0,0,0,0.6)
      }
    }
  }
`

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}

function Product({ product }) {
  return (
    <div className="item">
      <img className="item__image" src={product.images[0]} />
      <div className="item__cover">
        <a href={`/#/product/${product.category}/${product.id}`}>
          <button className="quick-view-btn">QUICK VIEW</button>
        </a>
      </div>
      <div className="item__name">{product.title}</div>
      <div className="item__price">{product.price}</div>
    </div>
  )
}

export default function ProductPage() {
  const dispatch = useDispatch()
  const params = useParams()
  const product = useSelector((store) => store.products.product)
  const suggestProducts = useSelector((store) => store.products.suggestProducts)
  const isLoadingProductsMsg = useSelector(
    (store) => store.products.isLoadingProducts
  )
  const [isActive, setActive] = useState('false')

  const handleToggle = () => {
    setActive(!isActive)
  }
  const [count, setCount] = useState(1)

  function Counter() {
    // Set the initial count state to zero, 0
    console.log(product[0].stock[0].quantity)
    // Create handleIncrement event handler
    const handleIncrement = () => {
      if (count < product[0].stock[0].quantity) {
        setCount((prevCount) => prevCount + 1)
      }
    }

    //Create handleDecrement event handler
    const handleDecrement = () => {
      if (count > 1) {
        setCount((prevCount) => prevCount - 1)
      }
    }

    return (
      <div className="btn-group quantity" role="group">
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={handleDecrement}
        >
          -
        </button>
        <p className="quantity__count">{count}</p>
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
    )
  }

  useEffect(() => {
    setCount(1)
    dispatch(getProduct(params.id, params.category))
    dispatch(getSuggestProduct(params.category))
    window.scrollTo(0, 0)
  }, [params.id, params.category, dispatch])

  return (
    <div className={productPageContainer}>
      {isLoadingProductsMsg && <Loading></Loading>}
      {product.length !== 0 && suggestProducts.length && (
        <>
          <div className={productContainer}>
            <SliderCarousel showArrows={false} showStatus={false}>
              {product[0].images.map((image) => (
                <img src={image} />
              ))}
            </SliderCarousel>

            <div className="product">
              <h1 className="product__title">{product[0].title}</h1>
              <div>
                <p className="product__price">{product[0].price}</p>
                <i
                  className={isActive ? 'far fa-heart' : 'fas fa-heart'}
                  onClick={handleToggle}
                ></i>
              </div>
              <p className="product__size">Size</p>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>{product[0].stock[0].size}</option>
              </select>
              <p className="product__quantity">Quantity</p>
              <Counter />
              <div className="product__description">
                {window.HTMLReactParser(product[0].description)}
              </div>
              <button className="product__add-to-cart">ADD TO CART</button>{' '}
            </div>
          </div>

          <div className="shop-container">
            <h1 className="title">See More...</h1>
            <Carousel responsive={responsive}>
              {suggestProducts.map((suggestion) => (
                <Product key={suggestion.id} product={suggestion} />
              ))}
            </Carousel>
          </div>
        </>
      )}
      <Cart />
    </div>
  )
}
