import { css } from '@emotion/css'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel as SliderCarousel } from 'react-responsive-carousel'
import Carousel from 'react-multi-carousel'
import Cart from '../../components/Cart'
import Loading from '../../components/Loading'
import { setCartProduct } from '../../redux/reducers/cartReducer'
import { getProduct } from '../../redux/reducers/productReducer'

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
    }

    .item {
      text-align: center;
      padding: 0 0 60px;
      margin: 20px 0;
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
        padding: 3px 20px;
        font-size: 16px;
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
          bottom: 130px;
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

    &__title {
      font-size: 32px;
      padding: 20px 0;
      ${'' /* margin: 20px; */}
    }

    &__price {
      color: red;
      font-size: 28px;
    }

    &__size {
      font-size: 20px;
    }

    &__quantity {
      font-size: 20px;
      margin-top: 20px;
    }

    &__description {
      padding: 30px 0;
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
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={handleDecrement}
      >
        -
      </button>
      {/* {count} */}
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

export default function ProductPage() {
  const dispatch = useDispatch()
  const product = useSelector((store) => store.products.product)
  const params = useParams()
  const isLoadingProductsMsg = useSelector(
    (store) => store.products.isLoadingProducts
  )

  useEffect(() => {
    dispatch(getProduct(params.id, params.category))
    window.scrollTo(0, 0)
  }, [params.id, params.category, dispatch])

  if (product) {
    console.log(product['3'])
  }

  return (
    <div className={productPageContainer}>
      {isLoadingProductsMsg && <Loading></Loading>}
      {product.length !== 0 && (
        <div className={productContainer}>
          <SliderCarousel showArrows={false} showStatus={false}>
            {/* {product.images.map((images) => (
              <img src={images} />
            ))} */}
            {/* <img src="https://cdn.shopify.com/s/files/1/0475/3663/6059/products/286167_2_1384cb5b-2b9c-404a-b5bf-ebd51f1a4bdb_768x576.jpg?v=1631141203" />
          <img src="https://cdn.shopify.com/s/files/1/0475/3663/6059/products/284047_2_640x928.jpg?v=1629146779" />
          <img src="https://cdn.shopify.com/s/files/1/0475/3663/6059/products/286167_2_1384cb5b-2b9c-404a-b5bf-ebd51f1a4bdb_768x576.jpg?v=1631141203" />
          <img src="https://cdn.shopify.com/s/files/1/0475/3663/6059/products/286167_2_1384cb5b-2b9c-404a-b5bf-ebd51f1a4bdb_768x576.jpg?v=1631141203" /> */}
          </SliderCarousel>

          <div className="product">
            <h1 className="product__title">{product[0].title}</h1>
            <p className="product__price">{product[0].price}</p>

            <p className="product__size">Size</p>
            <select className="form-select" aria-label="Default select example">
              {/* <option selected>Size</option> */}
              <option value="1">15*15 cm</option>
              <option value="2">30*30 cm</option>
              <option value="3">100*100 cm</option>
            </select>
            <p className="product__quantity">Quantity</p>
            <Counter />

            {/* <div className="input-group mb-3">
            <span className="input-group-text">-</span>
            <input
              type="text"
              className="form-control"
              aria-label="Amount (to the nearest dollar)"
            />
            <span className="input-group-text">+</span>
          </div> */}

            <div className="product__description">{product[0].description}</div>
            <button className="product__add-to-cart">ADD TO CART</button>
          </div>
        </div>
      )}

      <div className="shop-container">
        <h1 className="title">See More...</h1>

        <Carousel responsive={responsive}>
          <div className="item">
            <img className="item__image" src={images[4]} />
            <div className="item__cover">
              <a href="#/product">
                <button className="quick-view-btn">QUICK VIEW</button>
              </a>
            </div>
            <div className="item__name">I'M AN ARTWORK</div>
            <div className="item__price">TWD. 590</div>
          </div>

          <div className="item">
            <img className="item__image" src={images[5]} />

            <div className="item__cover">
              <a href="#">
                <button className="quick-view-btn">QUICK VIEW</button>
              </a>
            </div>
            <div className="item__name">I'M AN ARTWORK</div>
            <div className="item__price">TWD. 590</div>
          </div>

          <div className="item">
            <img className="item__image" src={images[6]} />
            <div className="item__cover">
              <a href="#">
                <button className="quick-view-btn">QUICK VIEW</button>
              </a>
            </div>
            <div className="item__name">I'M AN ARTWORK</div>
            <div className="item__price">TWD. 590</div>
          </div>

          <div className="item">
            <img className="item__image" src={images[7]} />
            <div className="item__cover">
              <a href="#">
                <button className="quick-view-btn">QUICK VIEW</button>
              </a>
            </div>
            <div className="item__name">I'M AN ARTWORK</div>
            <div className="item__price">TWD. 590</div>
          </div>

          <div className="item">
            <img className="item__image" src={images[4]} />

            <div className="item__cover">
              <a href="#">
                <button className="quick-view-btn">QUICK VIEW</button>
              </a>
            </div>
            <div className="item__name">I'M AN ARTWORK</div>
            <div className="item__price">TWD. 590</div>
          </div>
        </Carousel>
      </div>
      <Cart />
    </div>
  )
}
