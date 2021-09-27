import { css } from '@emotion/css'
import { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector, useStore } from 'react-redux'
import Carousel from 'react-multi-carousel'
import { Carousel as SliderCarousel } from 'react-responsive-carousel'
import 'react-multi-carousel/lib/styles.css'
import Cart from '../../components/Cart'
import Loading from '../../components/Loading'
import { getAllProducts } from '../../redux/reducers/productReducer'

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
        margin-right: 8px;
        color: unset;
        text-decoration: none;
      }

      i {
        font-size: 8px;
      }
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
        padding: 3px 10px;
        font-size: 16px;
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
            color: rgba(0, 0, 0, 0.8);
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

function Product({ product }) {
  const history = useHistory()
  const user = useSelector((store) => store.users.user)
  const [isActive, setActive] = useState('false')

  const handleToggle = () => {
    if (user) {
      setActive(!isActive)
    } else {
      alert('Please log in first.')
      history.push('/login')
    }
  }
  return (
    <>
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
    </>
  )
}

export default function ShopPage() {
  const dispatch = useDispatch()
  const products = useSelector((store) => store.products.allProducts)
  const isLoadingProductsMsg = useSelector(
    (store) => store.products.isLoadingProducts
  )

  useEffect(() => {
    dispatch(getAllProducts())
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={shopPageContainer}>
      {isLoadingProductsMsg && <Loading />}

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

      {products.length !== 0 && (
        <div className="shop-container">
          <div className="shop-container__category">
            <h1>{products.prints[0].category.toUpperCase()}.</h1>
            <a
              href={`./#/products/${products.prints[0].category}`}
              data-key={products.prints[0].category}
            >
              shop now
            </a>
            <i className="fas fa-chevron-right"></i>
          </div>
          <Carousel responsive={responsive}>
            {products.prints.map((print) => (
              <Product key={print.id} product={print} />
            ))}
          </Carousel>
          <div className="shop-container__category">
            <h1>{products.books[0].category.toUpperCase()}.</h1>
            <a href={`./#/products/${products.books[0].category}`}>shop now</a>
            <i className="fas fa-chevron-right"></i>
          </div>
          <Carousel responsive={responsive}>
            {products.books.map((book) => (
              <Product key={book.id} product={book} />
            ))}
          </Carousel>
          <div className="shop-container__category">
            <h1>{products.accessories[0].category.toUpperCase()}.</h1>
            <a href={`./#/products/${products.accessories[0].category}`}>
              shop now
            </a>
            <i className="fas fa-chevron-right"></i>
          </div>
          <Carousel responsive={responsive}>
            {products.accessories.map((accessories) => (
              <Product key={accessories.id} product={accessories} />
            ))}
          </Carousel>
          <div className="shop-container__category">
            <h1>{products['desk accessories'][0].category.toUpperCase()}.</h1>
            <a
              href={`./#/products/${products['desk accessories'][0].category}`}
            >
              shop now
            </a>
            <i className="fas fa-chevron-right"></i>
          </div>
          <Carousel responsive={responsive}>
            {products['desk accessories'].map((deskAccessories) => (
              <Product key={deskAccessories.id} product={deskAccessories} />
            ))}
          </Carousel>
          <div className="shop-container__category">
            <h1>{products['games & puzzles'][0].category.toUpperCase()}.</h1>
            <a href={`./#/products/${products['games & puzzles'][0].category}`}>
              shop now
            </a>
            <i className="fas fa-chevron-right"></i>
          </div>
          (
          <Carousel responsive={responsive}>
            {products['games & puzzles'].map((gamesAndPuzzles) => (
              <Product key={gamesAndPuzzles.id} product={gamesAndPuzzles} />
            ))}
          </Carousel>
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
  )
}
