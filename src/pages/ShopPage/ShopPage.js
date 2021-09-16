import { css } from '@emotion/css'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector, useStore } from 'react-redux'
import Carousel from 'react-multi-carousel'
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
    /* display: none; */
  }

  ${
    '' /* .carousel-item {
    transition: transform 5s ease-in-out;
  } */
  }
  .carousels {
    margin-bottom: 50px;
    max-height: 600px;
    position: relative;

    .slider {
      height: 500px;
      overflow: hidden;
      ${
        '' /* background-image: url('https://www.tinostone.com/wp-content/uploads/2016/09/Marquina-closeup.jpg'); */
      }

      ${
        '' /* background-image: url('https://wallpaperaccess.com/full/130061.png');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center; */
      };
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
  }

  .shop-container {
    margin: 0 auto 50px;
    padding: 0 10px;

    .react-multiple-carousel__arrow {
      z-index: 3;
      background: rgba(0, 0, 0, 0.8);
    }

    &__title {
      padding: 30px 0 40px;
      color: rgba(0, 0, 0, 0.7);
      border-bottom: 1px solid black;
      text-align: center;

      h1 {
        font-size: 48px;
      }

      a {
        display: inline-block;
        margin-right: 8px;
        color: unset;
        text-decoration: none;
      }

      i {
        font-size: 8px;
      }
    }

    ${
      '' /* &__products {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 20px 10px;
    } */
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
        ${'' /* border: 1px solid black; */}
      }

      div {
        padding: 3px 20px;
        font-size: 16px;
      }
    }

    .product {
      &__cover {
        position: absolute;
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

export default function ShopPage() {
  const dispatch = useDispatch()

  return (
    <div className={shopPageContainer}>
      {/* {isLoadingCollectionsMsg && <div className={loading}></div>} */}
      <div className="shop-banner">
        <div class="carousels">
          <div class="slider">
            <div class="slides">
              <input type="radio" name="radio-btn" id="radio1" />
              <input type="radio" name="radio-btn" id="radio2" />
              <input type="radio" name="radio-btn" id="radio3" />

              <div class="slide first">
                <a href="#/shop/">
                  <img
                    src="https://cdn.shopify.com/s/files/1/2524/0922/files/1915.110_print_1728x.jpg?v=1622211081"
                    alt=""
                  />
                </a>
              </div>
              <div class="slide">
                <a href="#/shop/">
                  <img
                    src="https://cdn.shopify.com/s/files/1/2524/0922/files/1950_cropped_1728x.jpg?v=1588016027"
                    alt=""
                  />
                </a>
              </div>
              <div class="slide">
                <a href="./product.html?id=201902191242">
                  <img
                    src="https://cdn.shopify.com/s/files/1/2524/0922/files/1958.47_print_d6fd88b2-7342-4851-bcba-9d856ff2d0e3.jpg?v=1622209021"
                    alt=""
                  />
                </a>
              </div>

              <div class="navigation-auto">
                <div class="auto-btn1"></div>
                <div class="auto-btn2"></div>
                <div class="auto-btn3"></div>
              </div>
            </div>

            <div class="navigation-manual">
              <label for="radio1" class="manual-btn"></label>
              <label for="radio2" class="manual-btn"></label>
              <label for="radio3" class="manual-btn"></label>
            </div>
          </div>
        </div>
      </div>

      <div className="shop-container">
        <div className="shop-container__title">
          <h1>ARTWORKS.</h1>
          <a href="./#/artworks">shop now</a>
          <i class="fas fa-chevron-right"></i>
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
              <button class="product__add-to-cart">ADD TO CART</button>
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
              <button class="product__add-to-cart">ADD TO CART</button>
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
              <button class="product__add-to-cart">ADD TO CART</button>
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
              <button class="product__add-to-cart">ADD TO CART</button>
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
              <button class="product__add-to-cart">ADD TO CART</button>
            </div>
            <div class="product__name">I'M AN ARTWORK</div>
            <div class="product__price">TWD. 590</div>
          </div>
        </Carousel>

        <div className="shop-container__products"></div>

        <div className="shop-container__title">
          <h1>EXCLUSIVES.</h1>
          <a href="./#/exclusives">shop now</a>
          <i class="fas fa-chevron-right"></i>
        </div>

        <Carousel responsive={responsive}>
          <div class="shop-container__product">
            <img
              class="product__photo"
              src="https://cdn.shopify.com/s/files/1/0475/3663/6059/products/284047_2_640x928.jpg?v=1629146779"
            />
            <div className="product__cover">
              <a href="#">
                <button class="product__quick-view">QUICK VIEW</button>
              </a>
              <button class="product__add-to-cart">ADD TO CART</button>
            </div>
            <div class="product__name">I'M AN ARTWORK</div>
            <div class="product__price">TWD. 590</div>
          </div>

          <div class="shop-container__product">
            <img
              class="product__photo"
              src="https://cdn.shopify.com/s/files/1/0475/3663/6059/products/65050_2_640x864.jpg?v=1620738968"
            />
            <div className="product__cover">
              <a href="#">
                <button class="product__quick-view">QUICK VIEW</button>
              </a>
              <button class="product__add-to-cart">ADD TO CART</button>
            </div>
            <div class="product__name">I'M AN ARTWORK</div>
            <div class="product__price">TWD. 590</div>
          </div>
          <div class="shop-container__product">
            <img
              class="product__photo"
              src="https://cdn.shopify.com/s/files/1/0475/3663/6059/products/285929_1_1280x576.jpg?v=1612930379"
            />
            <div className="product__cover">
              <a href="#">
                <button class="product__quick-view">QUICK VIEW</button>
              </a>
              <button class="product__add-to-cart">ADD TO CART</button>
            </div>
            <div class="product__name">I'M AN ARTWORK</div>
            <div class="product__price">TWD. 590</div>
          </div>
          <div class="shop-container__product">
            <img
              class="product__photo"
              src="https://cdn.shopify.com/s/files/1/0475/3663/6059/products/284909_2_640x736.jpg?v=1619794059"
            />
            <div className="product__cover">
              <a href="#">
                <button class="product__quick-view">QUICK VIEW</button>
              </a>
              <button class="product__add-to-cart">ADD TO CART</button>
            </div>
            <div class="product__name">Bisa Butler Post Card Set</div>
            <div class="product__price">TWD. 590</div>
          </div>
          <div class="shop-container__product">
            <img
              class="product__photo"
              src="https://cdn.shopify.com/s/files/1/0475/3663/6059/products/284047_2_640x928.jpg?v=1629146779"
            />
            <div className="product__cover">
              <a href="#">
                <button class="product__quick-view">QUICK VIEW</button>
              </a>
              <button class="product__add-to-cart">ADD TO CART</button>
            </div>
            <div class="product__name">I'M AN ARTWORK</div>
            <div class="product__price">TWD. 590</div>
          </div>
        </Carousel>

        <div className="shop-container__title">
          <h1>ACCESSORIES & APPAREL.</h1>
          <a href="./#/accessories">shop now</a>
          <i class="fas fa-chevron-right"></i>
        </div>

        <Carousel responsive={responsive}>
          <div class="shop-container__product">
            <img
              class="product__photo"
              src="https://cdn.shopify.com/s/files/1/0475/3663/6059/products/286166_2_640x992.jpg?v=1628003773"
            />
            <div className="product__cover">
              <a href="#">
                <button class="product__quick-view">QUICK VIEW</button>
              </a>
              <button class="product__add-to-cart">ADD TO CART</button>
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
              <button class="product__add-to-cart">ADD TO CART</button>
            </div>
            <div class="product__name">I'M AN ARTWORK</div>
            <div class="product__price">TWD. 590</div>
          </div>
          <div class="shop-container__product">
            <img
              class="product__photo"
              src="https://cdn.shopify.com/s/files/1/0475/3663/6059/products/285928_2_932c9418-9f9f-49c2-bdf2-f03cedd90194_640x640.jpg?v=1631141188"
            />
            <div className="product__cover">
              <a href="#">
                <button class="product__quick-view">QUICK VIEW</button>
              </a>
              <button class="product__add-to-cart">ADD TO CART</button>
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
              <button class="product__add-to-cart">ADD TO CART</button>
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
              <button class="product__add-to-cart">ADD TO CART</button>
            </div>
            <div class="product__name">I'M AN ARTWORK</div>
            <div class="product__price">TWD. 590</div>
          </div>
        </Carousel>

        <div className="shop-container__title">
          <h1>BOOKS.</h1>
          <a href="./#/books">shop now</a>
          <i class="fas fa-chevron-right"></i>
        </div>

        <Carousel responsive={responsive}>
          <div class="shop-container__product">
            <img
              class="product__photo"
              src="https://cdn.shopify.com/s/files/1/0475/3663/6059/products/284047_2_640x928.jpg?v=1629146779"
            />
            <div className="product__cover">
              <a href="#">
                <button class="product__quick-view">QUICK VIEW</button>
              </a>
              <button class="product__add-to-cart">ADD TO CART</button>
            </div>
            <div class="product__name">I'M AN ARTWORK</div>
            <div class="product__price">TWD. 590</div>
          </div>

          <div class="shop-container__product">
            <img
              class="product__photo"
              src="https://cdn.shopify.com/s/files/1/0475/3663/6059/products/65050_2_640x864.jpg?v=1620738968"
            />
            <div className="product__cover">
              <a href="#">
                <button class="product__quick-view">QUICK VIEW</button>
              </a>
              <button class="product__add-to-cart">ADD TO CART</button>
            </div>
            <div class="product__name">I'M AN ARTWORK</div>
            <div class="product__price">TWD. 590</div>
          </div>
          <div class="shop-container__product">
            <img
              class="product__photo"
              src="https://cdn.shopify.com/s/files/1/0475/3663/6059/products/285929_1_1280x576.jpg?v=1612930379"
            />
            <div className="product__cover">
              <a href="#">
                <button class="product__quick-view">QUICK VIEW</button>
              </a>
              <button class="product__add-to-cart">ADD TO CART</button>
            </div>{' '}
            <div class="product__name">I'M AN ARTWORK</div>
            <div class="product__price">TWD. 590</div>
          </div>
          <div class="shop-container__product">
            <img
              class="product__photo"
              src="https://cdn.shopify.com/s/files/1/0475/3663/6059/products/284909_2_640x736.jpg?v=1619794059"
            />
            <div className="product__cover">
              <a href="#">
                <button class="product__quick-view">QUICK VIEW</button>
              </a>
              <button class="product__add-to-cart">ADD TO CART</button>
            </div>{' '}
            <div class="product__name">Bisa Butler Post Card Set</div>
            <div class="product__price">TWD. 590</div>
          </div>
          <div class="shop-container__product">
            <img
              class="product__photo"
              src="https://cdn.shopify.com/s/files/1/0475/3663/6059/products/284047_2_640x928.jpg?v=1629146779"
            />
            <div className="product__cover">
              <a href="#">
                <button class="product__quick-view">QUICK VIEW</button>
              </a>
              <button class="product__add-to-cart">ADD TO CART</button>
            </div>
            <div class="product__name">I'M AN ARTWORK</div>
            <div class="product__price">TWD. 590</div>
          </div>
        </Carousel>
      </div>

      <a href="#top">
        <button
          type="button"
          class="btn btn-dark btn-floating btn-lg"
          id="btn-back-to-top"
        >
          <i class="fas fa-angle-up"></i>
        </button>
      </a>
      <Cart />
    </div>
  )
}
