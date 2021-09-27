import { css } from '@emotion/css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { Carousel as SliderCarousel } from 'react-responsive-carousel'
import 'react-multi-carousel/lib/styles.css'
import Cart from '../../components/Cart'
import Loading from '../../components/Loading'
import { getSpecificProducts } from '../../redux/reducers/productReducer'

const shopPageContainer = css`
  width: 100vw;
  margin: 0 auto;
  font-family: Baskerville;
  height: auto;

  #btn-back-to-top {
    position: fixed;
    bottom: 10px;
    left: 10px;
  }

  .shop-banner {
    .carousel-root {
      margin: 0 auto;
    }

    img {
      width: 100%;
      height: 80vh;
      padding-bottom: 10px;
    }
  }

  .shop-container {
    margin: 0 auto 50px;
    padding: 0 10px;

    .react-multiple-carousel__arrow {
      z-index: 3;
      background: rgba(0, 0, 0, 0.8);
    }

    &__category {
      margin-top: 20px;
      padding: 40px 0;
      color: rgba(0, 0, 0, 0.7);
      border-bottom: 1px solid black;
      text-align: center;

      h1 {
        font-size: 48px;
      }

      a {
        display: inline-block;
        margin-left: 8px;
        color: unset;
        text-decoration: none;
      }

      i {
        font-size: 8px;
      }
    }

    .items {
      display: grid;
      grid-template-columns: 25% 25% 25% 25%;
      max-width: 100%;
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
      }

      div {
        padding: 3px 20px;
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

        .fa-heart {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 24px;
          color: transparent;
          transition: 200ms ease-in;
        }

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

        .add-to-cart-btn {
          position: absolute;
          display: block;
          border: none;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50px;
          color: transparent;
          background: transparent;
        }

        &:hover {
          .fa-heart {
            color: rgb(209, 0, 0);
            cursor: pointer;
          }

          .quick-view-btn {
            color: black;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(0, 0, 0, 0.1);
          }
          .add-to-cart-btn {
            color: white;
            background: rgba(0, 0, 0, 0.8);
          }
        }
      }
    }
  }
`

const bannerImages = [
  'https://cdn.shopify.com/s/files/1/2524/0922/files/1915.110_print_1728x.jpg?v=1622211081',
  'https://cdn.shopify.com/s/files/1/2524/0922/files/1950_cropped_1728x.jpg?v=1588016027',
  'https://cdn.shopify.com/s/files/1/2524/0922/files/1958.47_print_d6fd88b2-7342-4851-bcba-9d856ff2d0e3.jpg?v=1622209021'
]

function Product({ product }) {
  const [isActive, setActive] = useState('false')

  const handleToggle = () => {
    setActive(!isActive)
  }
  return (
    <div className="item">
      <img className="item__image" src={product.images[0]} />
      <div className="item__cover">
        <i
          className={isActive ? 'far fa-heart' : 'fas fa-heart'}
          onClick={handleToggle}
        ></i>
        <a href={`/#/product/${product.category}/${product.id}`}>
          <button className="quick-view-btn">QUICK VIEW</button>
        </a>
        <button className="add-to-cart-btn">ADD TO CART</button>
      </div>
      <div className="item__name">{product.title}</div>
      <div className="item__price">{product.price}</div>
    </div>
  )
}

export default function ShopPage() {
  const dispatch = useDispatch()
  const params = useParams()
  const products = useSelector((store) => store.products.specificProducts)
  const isLoadingProductsMsg = useSelector(
    (store) => store.products.isLoadingProducts
  )
  useEffect(() => {
    dispatch(getSpecificProducts(params.category))
    window.scrollTo(0, 0)
  }, [params.category, dispatch])

  return (
    <div className={shopPageContainer}>
      {isLoadingProductsMsg && <Loading></Loading>}
      <div className="shop-banner">
        <SliderCarousel
          showStatus={false}
          showArrows={false}
          autoPlay={true}
          width="100%"
          showThumbs={false}
          infiniteLoop={true}
        >
          <img src={bannerImages[0]} />
          <img src={bannerImages[1]} />
          <img src={bannerImages[2]} />
        </SliderCarousel>
      </div>

      <div className="shop-container">
        <div className="shop-container__category">
          <h1>{params.category.toUpperCase()}.</h1>
          <i className="fas fa-chevron-left"></i>
          <a href="./#/shop">Back to shop</a>
        </div>

        {products.length !== 0 && (
          <div className="items">
            {products.map((print) => (
              <Product key={print.id} product={print} />
            ))}

            {/* <div className="item">
              <img className="item__image" src={images[0]} />
              <div className="item__cover">
                <a href="#/product">
                  <button className="quick-view-btn">QUICK VIEW</button>
                </a>
                <button className="add-to-cart-btn">ADD TO CART</button>
              </div>
              <div className="item__name">I'M AN ARTWORK</div>
              <div className="item__price">TWD. 590</div>
            </div>

            <div className="item">
              <img className="item__image" src={images[1]} />

              <div className="item__cover">
                <a href="#">
                  <button className="quick-view-btn">QUICK VIEW</button>
                </a>
                <button className="add-to-cart-btn">ADD TO CART</button>
              </div>
              <div className="item__name">I'M AN ARTWORK</div>
              <div className="item__price">TWD. 590</div>
            </div>

            <div className="item">
              <img className="item__image" src={images[2]} />
              <div className="item__cover">
                <a href="#">
                  <button className="quick-view-btn">QUICK VIEW</button>
                </a>
                <button className="add-to-cart-btn">ADD TO CART</button>
              </div>
              <div className="item__name">I'M AN ARTWORK</div>
              <div className="item__price">TWD. 590</div>
            </div>

            <div className="item">
              <img className="item__image" src={images[3]} />
              <div className="item__cover">
                <a href="#">
                  <button className="quick-view-btn">QUICK VIEW</button>
                </a>
                <button className="add-to-cart-btn">ADD TO CART</button>
              </div>
              <div className="item__name">I'M AN ARTWORK</div>
              <div className="item__price">TWD. 590</div>
            </div>

            <div className="item">
              <img className="item__image" src={images[0]} />

              <div className="item__cover">
                <a href="#">
                  <button className="quick-view-btn">QUICK VIEW</button>
                </a>
                <button className="add-to-cart-btn">ADD TO CART</button>
              </div>
              <div className="item__name">I'M AN ARTWORK</div>
              <div className="item__price">TWD. 590</div>
            </div> */}
          </div>
        )}

        <button
          type="button"
          className="btn btn-dark btn-floating btn-lg"
          id="btn-back-to-top"
          onClick={() => {
            window.scrollTo(0, 0)
          }}
        >
          <i className="fas fa-angle-up"></i>
        </button>

        <Cart />
      </div>
    </div>
  )
}
