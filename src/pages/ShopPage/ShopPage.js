import { css } from '@emotion/css'
import 'react-multi-carousel/lib/styles.css'
import { Modal, Button } from 'react-bootstrap'
import Carousel from 'react-multi-carousel'
import { Carousel as SliderCarousel } from 'react-responsive-carousel'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Cart from '../../components/Cart'
import Loading from '../../components/Loading'
import { getAllProducts } from '../../redux/reducers/productReducer'
import { setCartProduct } from '../../redux/reducers/cartReducer'
import {
  getFavoriteProducts,
  setFavoriteProduct,
  removeFavoriteProduct
} from '../../redux/reducers/userReducer'

const shopPageContainer = css`
  margin: 0 auto;
  font-family: serif;
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
      height: 90vh;
      padding-bottom: 10px;

      @media only screen and (max-width: 768px) {
        height: 50vh;
      }
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
  'https://github.com/lea6121/img-storage/blob/main/image/210008.jpg?raw=true',
  'https://github.com/lea6121/img-storage/blob/main/image/210009.jpeg?raw=true',
  'https://github.com/lea6121/img-storage/blob/main/image/210010.jpg?raw=true'
]

export default function ShopPage() {
  const dispatch = useDispatch()
  const products = useSelector((store) => store.products.allProducts)
  const userId = useSelector((store) => store.users.userId)
  const favoriteProductsId = useSelector(
    (store) => store.users.favoriteProductsId
  )
  const isLoadingProductsMsg = useSelector(
    (store) => store.products.isLoadingProducts
  )

  useEffect(() => {
    dispatch(getAllProducts())
    if (userId) {
      dispatch(getFavoriteProducts(userId))
    }
    window.scrollTo(0, 0)
  }, [userId])

  function Product({ product }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const userId = useSelector((store) => store.users.userId)
    const [modalShow, setModalShow] = useState(false)

    const handleToggle = () => {
      let productUrl = `product/${product.category}/${product.id}`

      if (!userId) {
        history.push('/login')
      }

      if (userId) {
        if (!favoriteProductsId.includes(product.id)) {
          dispatch(
            setFavoriteProduct(
              userId,
              product.id,
              product.title,
              product.images[0],
              product.price,
              productUrl
            )
          )
        } else if (favoriteProductsId.includes(product.id)) {
          dispatch(removeFavoriteProduct(userId, product.id))
        }
      }
    }

    function handleAddToCart(item) {
      const data = JSON.parse(localStorage.getItem('cartData')) || []
      let duplicateData
      const itemExists = data.some((data) => {
        if (data.id === item.id) {
          duplicateData = data
        }
        return duplicateData
      })

      if (itemExists) {
        let items = JSON.parse(localStorage.cartData)
        for (let i = 0; i < items.length; i++) {
          if (duplicateData.id === items[i].id) {
            items[i].quantity += 1
            break
          }
        }
        localStorage.setItem('cartData', JSON.stringify(items))
        dispatch(setCartProduct(items))
      } else {
        data.push({
          id: item.id,
          title: item.title,
          image: item.images[0],
          price: item.price,
          category: item.category,
          size: item.stock[0].size,
          stock: item.stock[0].quantity,
          quantity: 1
        })
        localStorage.setItem('cartData', JSON.stringify(data))
        dispatch(setCartProduct(data))
      }
      setModalShow(true)
    }

    function MyVerticallyCenteredModal(props) {
      return (
        <Modal {...props} centered>
          <Modal.Header>
            <Modal.Title
              id="contained-modal-title-vcenter"
              style={{ 'font-family': 'Gill Sans', alignItems: 'center' }}
            >
              <i
                className="fas fa-clipboard-check"
                style={{
                  margin: '0 10px',
                  color: 'green',
                  'font-size': '26px'
                }}
              ></i>
              Add to cart successfully!
            </Modal.Title>
            <Button
              onClick={props.onHide}
              style={{
                background: 'rgba(0,0,0,0.8)',
                'border-color': '#343a40'
              }}
            >
              Close
            </Button>
          </Modal.Header>
        </Modal>
      )
    }

    return (
      <>
        <div className="item">
          <img className="item__image" src={product.images[0]} />
          <div className="item__cover">
            {favoriteProductsId.includes(product.id) ? (
              <i className="fas fa-heart" onClick={handleToggle}></i>
            ) : (
              <i className="far fa-heart" onClick={handleToggle}></i>
            )}
            <a href={`./#/product/${product.category}/${product.id}`}>
              <button className="quick-view-btn">VIEW</button>
            </a>
            <button
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(product)}
            >
              ADD TO CART
            </button>
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
          <div className="item__name">{product.title}</div>
          <div className="item__price">$ {product.price}</div>
        </div>
      </>
    )
  }

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
          <Carousel responsive={responsive}>
            {products['games & puzzles'].map((gamesAndPuzzles) => (
              <Product key={gamesAndPuzzles.id} product={gamesAndPuzzles} />
            ))}
          </Carousel>
        </div>
      )}

      <Cart />
    </div>
  )
}
