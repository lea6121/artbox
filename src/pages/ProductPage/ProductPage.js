import { css } from '@emotion/css'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel as SliderCarousel } from 'react-responsive-carousel'
import Carousel from 'react-multi-carousel'
import Cart from '../../components/Cart'

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

    &__title {
      padding: 30px 0 20px;
      color: rgba(0, 0, 0, 0.7);
      border-top: 1px solid rgba(0, 0, 0, 0.3);
      text-align: center;

      h1 {
        font-size: 22px;
        padding-top: 20px;
        color: black;
      }
    }

    &__product {
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

      .product__cover {
        position: absolute;
        ${'' /* background-color: black; */}
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;

        .product__quick-view {
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

        .product__add-to-cart {
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
          .product__quick-view {
            color: black;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(0, 0, 0, 0.1);
          }
          .product__add-to-cart {
            color: white;
            background: rgba(0, 0, 0, 0.8);
          }
        }
      }
    }
  }
`

const productContainer = css`
  width: 80vw;
  margin: 60px auto;
  padding: 0 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px 10px;
  max-width: 100vw;

  img {
    max-height: 400px;
    object-fit: contain;
  }

  .item {
    ${'' /* border: 1px solid black; */}
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
      font-size: 24px;
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

export default function ProductPage() {
  return (
    <div className={productPageContainer}>
      <div className={productContainer}>
        <SliderCarousel showArrows={false} showStatus={false}>
          <img src="https://cdn.shopify.com/s/files/1/0475/3663/6059/products/286167_2_1384cb5b-2b9c-404a-b5bf-ebd51f1a4bdb_768x576.jpg?v=1631141203" />
          <img src="https://cdn.shopify.com/s/files/1/0475/3663/6059/products/284047_2_640x928.jpg?v=1629146779" />
          <img src="https://cdn.shopify.com/s/files/1/0475/3663/6059/products/286167_2_1384cb5b-2b9c-404a-b5bf-ebd51f1a4bdb_768x576.jpg?v=1631141203" />
        </SliderCarousel>

        <div className="item">
          <h1 className="item__title">Kinetic Light Blue Green Earrings</h1>
          <p className="item__price">$ 27.99</p>
          <p className="item__size">Size</p>
          <select class="form-select" aria-label="Default select example">
            {/* <option selected>Size</option> */}
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>

          {/* <div class="input-group mb-3">
            <span class="input-group-text">-</span>
            <input
              type="text"
              class="form-control"
              aria-label="Amount (to the nearest dollar)"
            />
            <span class="input-group-text">+</span>
          </div> */}

          <div className="item__description">
            Discover miniature modernist art for your ears! In a truly unique
            combination, translucent dyed resin is suspended on stainless steel,
            placing the focus of these feather-weight earrings on the beauty of
            balance and color. Handmade in the USA.
          </div>
          <button className="item__add-to-cart">ADD TO CART</button>
        </div>
      </div>

      <div className="shop-container__title">
        <h1>you may also like...</h1>
      </div>

      <Carousel responsive={responsive}>
        <div class="shop-container__product">
          <img
            class="product__photo"
            src="https://cdn.shopify.com/s/files/1/0475/3663/6059/products/286166_2_640x992.jpg?v=1628003773"
          />
          <div className="product__cover">
            <a href="#/product">
              <button class="product__quick-view">QUICK VIEW</button>
            </a>
            {/* <button class="product__add-to-cart">ADD TO CART</button> */}
          </div>
          <div class="product__name">I'M AN ARTWORK</div>
          <div class="product__price">TWD. 590</div>
        </div>

        <div class="shop-container__product">
          <img
            class="product__photo"
            src="https://cdn.shopify.com/s/files/1/0475/3663/6059/products/285927_2_768x576.jpg?v=1631141173"
          />

          <div className="product__cover">
            <a href="#">
              <button class="product__quick-view">QUICK VIEW</button>
            </a>
            {/* <button class="product__add-to-cart">ADD TO CART</button> */}
          </div>
          <div class="product__name">I'M AN ARTWORK</div>
          <div class="product__price">TWD. 590</div>
        </div>
        <div class="shop-container__product">
          <img
            className="product__photo"
            src="https://cdn.shopify.com/s/files/1/0475/3663/6059/products/285928_2_932c9418-9f9f-49c2-bdf2-f03cedd90194_640x640.jpg?v=1631141188"
          />

          <div className="product__cover">
            <a href="#">
              <button class="product__quick-view">QUICK VIEW</button>
            </a>
            {/* <button class="product__add-to-cart">ADD TO CART</button> */}
          </div>
          <div class="product__name">I'M AN ARTWORK</div>
          <div class="product__price">TWD. 590</div>
        </div>

        <div class="shop-container__product">
          <img
            class="product__photo"
            src="https://cdn.shopify.com/s/files/1/0475/3663/6059/products/286167_2_1384cb5b-2b9c-404a-b5bf-ebd51f1a4bdb_768x576.jpg?v=1631141203"
          />
          <div className="product__cover">
            <a href="#">
              <button class="product__quick-view">QUICK VIEW</button>
            </a>
            {/* <button class="product__add-to-cart">ADD TO CART</button> */}
          </div>
          <div class="product__name">I'M AN ARTWORK</div>
          <div class="product__price">TWD. 590</div>
        </div>

        <div class="shop-container__product">
          <img
            class="product__photo"
            src="https://cdn.shopify.com/s/files/1/0475/3663/6059/products/286166_2_640x992.jpg?v=1628003773"
          />

          <div className="product__cover">
            <a href="#">
              <button class="product__quick-view">QUICK VIEW</button>
            </a>
            {/* <button class="product__add-to-cart">ADD TO CART</button> */}
          </div>
          <div class="product__name">I'M AN ARTWORK</div>
          <div class="product__price">TWD. 590</div>
        </div>
      </Carousel>
      <Cart />
    </div>
  )
}
