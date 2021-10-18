import { css } from '@emotion/css'
import image210008 from '../../assets/210008.jpeg'
import image210009 from '../../assets/210009.jpeg'
import image210010 from '../../assets/210010.jpeg'
import { Modal, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel as SliderCarousel } from 'react-responsive-carousel'
import 'react-multi-carousel/lib/styles.css'
import Cart from '../../components/Cart'
import Loading from '../../components/Loading'
import { getSpecificProducts } from '../../redux/reducers/productReducer'
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

  .shop-banner {
    position: relative;

    .placeholder {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: grey;
    }
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

      @media only screen and (min-width: 576px) and (max-width: 959px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media only screen and (max-width: 576px) {
        grid-template-columns: repeat(1, 1fr);
      }
    }

    .item {
      text-align: center;
      padding: 0 0 60px;
      margin: 20px 5px;
      color: black;
      position: relative;

      @media only screen and (max-width: 576px) {
        margin: 0;
      }

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

const bannerImages = [image210008, image210009, image210010]

function Product({ product, scrollPosition }) {
  const history = useHistory()
  const dispatch = useDispatch()
  const userId = useSelector((store) => store.users.userId)
  const [modalShow, setModalShow] = useState(false)
  const favoriteProductsId = useSelector(
    (store) => store.users.favoriteProductsId
  )

  const handleToggle = () => {
    let productUrl = `product/${product.category}/${product.id}`

    if (!userId) {
      history.push('/login')
    }

    if (userId) {
      if (favoriteProductsId && !favoriteProductsId.includes(product.id)) {
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
    let data = JSON.parse(localStorage.getItem('cartData')) || []

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
        if (duplicateData.id === items[i].id && items[i].quantity < 10) {
          items[i].quantity += 1
          break
        }
      }
    } else {
      data.push({
        id: item.id,
        title: item.title,
        image: item.images[0],
        price: item.price,
        category: item.category,
        size: item.stock[0].size,
        stock: item.stock.quantity,
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
            id="contained-modal-title-center"
            style={{ 'font-family': 'Gill Sans', alignItems: 'center' }}
          >
            <i
              className="fas fa-clipboard-check"
              style={{ margin: '0 10px', color: 'green', 'font-size': '26px' }}
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
    <div className="item">
      <img className="item__image" src={product.images[0]} />
      <div className="item__cover">
        {favoriteProductsId && favoriteProductsId.includes(product.id) ? (
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
  )
}

export default function ProductsPage() {
  const dispatch = useDispatch()
  const params = useParams()
  const products = useSelector((store) => store.products.specificProducts)
  const isLoadingProductsMsg = useSelector(
    (store) => store.products.isLoadingProducts
  )
  const userId = useSelector((store) => store.users.userId)

  useEffect(() => {
    dispatch(getSpecificProducts(params.category))
    if (userId) {
      dispatch(getFavoriteProducts(userId))
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [params.category, userId])

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
          </div>
        )}

        <Cart />
      </div>
    </div>
  )
}
