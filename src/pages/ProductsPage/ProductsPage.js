import { css } from '@emotion/css'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector, useStore } from 'react-redux'
import Carousel from 'react-multi-carousel'
import { Carousel as SliderCarousel } from 'react-responsive-carousel'
import 'react-multi-carousel/lib/styles.css'
import Cart from '../../components/Cart'
// import {
//   getCurrentViewCollections,
//   getSpecificCollections,
//   searchCollections
// } from '../../redux/reducers/collectionReducer'
// import { loading } from '../../components/App/App'

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
  ${
    '' /* .carousels {
    margin-bottom: 50px;
    max-height: 600px;
    position: relative;

    .slider {
      height: 500px;
      overflow: hidden;
    }

    .slides {
      margin: 0 auto;
      width: 800%;
      height: 600px;
      display: flex;
      background: rgba(0, 0, 0, 0.3);

      input {
        display: none;
      }

      .slide {
        width: 20%;
        transition: 3s;
        height: 600px;
        overflow: hidden;
        img {
          width: 100vw;
          object-fit: contain;
        }
      }
    }

    .navigation-manual {
      position: absolute;
      width: 100vw;
      margin-top: 60px;
      display: flex;
      justify-content: center;
    }

    .manual-btn {
      border: 1px solid rgb(255, 255, 255);
      padding: 4px;
      border-radius: 10px;
      cursor: pointer;
      transition: 3s;
    }

    .manual-btn:not(:last-child) {
      margin-right: 40px;
    }

    .manual-btn:hover {
      background: rgba(255, 255, 255);
    }

    #radio1:checked ~ .first {
      margin-left: 0;
    }

    #radio2:checked ~ .first {
      margin-left: -20%;
    }

    #radio3:checked ~ .first {
      margin-left: -40%;
    }

    .navigation-auto {
      position: absolute;
      display: flex;
      width: 100vw;
      justify-content: center;
      margin-top: 460px;
    }

    .navigation-auto div {
      border: 1px solid rgb(255, 255, 255);
      padding: 4px;
      border-radius: 10px;
      transition: 3s;
    }

    .navigation-auto div:not(:last-child) {
      margin-right: 40px;
    }

    #radio1:checked ~ .navigation-auto .auto-btn1 {
      background: rgba(255, 255, 255);
    }

    #radio2:checked ~ .navigation-auto .auto-btn2 {
      background: rgba(255, 255, 255);
    }

    #radio3:checked ~ .navigation-auto .auto-btn3 {
      background: rgba(255, 255, 255);
    }
  } */
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

      ${'' /* grid-template-columns: (4, 1fr); */}
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

const bannerImages = [
  'https://cdn.shopify.com/s/files/1/2524/0922/files/1915.110_print_1728x.jpg?v=1622211081',
  'https://cdn.shopify.com/s/files/1/2524/0922/files/1950_cropped_1728x.jpg?v=1588016027',
  'https://cdn.shopify.com/s/files/1/2524/0922/files/1958.47_print_d6fd88b2-7342-4851-bcba-9d856ff2d0e3.jpg?v=1622209021'
]

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

export default function ShopPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    // window.scrollTo(0, 0)
  }, [])

  return (
    <div className={shopPageContainer}>
      {/* {isLoadingCollectionsMsg && <div className={loading}></div>} */}
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
          <h1>ARTWORKS.</h1>
          <i className="fas fa-chevron-left"></i>
          <a href="./#/shop">Back to shop</a>
        </div>

        {/* <Carousel responsive={responsive}> */}
        <div className="items">
          <div className="item">
            <img className="item__image" src={images[0]} />
            <div className="item__cover">
              <a href="#/product">
                <button className="quick-view-btn">QUICK VIEW</button>
              </a>
              <button className="add-to-cart-btn">ADD TO CART</button>
            </div>
            <div className="item_sName">I'M AN ARTWORK</div>
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
            <div className="item_sName">I'M AN ARTWORK</div>
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
            <div className="item_sName">I'M AN ARTWORK</div>
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
            <div className="item_sName">I'M AN ARTWORK</div>
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
            <div className="item_sName">I'M AN ARTWORK</div>
            <div className="item__price">TWD. 590</div>
          </div>
        </div>
        {/* </Carousel> */}

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
