import { css } from '@emotion/css'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import 'react-multi-carousel/lib/styles.css'
import Cart from '../../components/Cart'
import Loading from '../../components/Loading'
import {
  getFavoriteProducts,
  removeFavoriteProduct
} from '../../redux/reducers/userReducer'

const wishlistPageContainer = css`
  height: auto;
  font-family: 'Gill Sans';
  font-weight: 300;
  border: 1px solid transparent;
  background: rgba(0, 0, 0, 0.9);
  border-bottom: 1px solid white;

  .wishlist {
    position: relative;
    margin: 50px auto;
    max-width: 1080px;
    background: white;
    padding: 0 50px 50px;
    box-shadow: -7px -7px 0px 0px gold;
    @media only screen and (max-width: 576px) {
      padding: 0;
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
      margin-top: 20px;
      padding: 50px 0 30px;
      color: rgba(0, 0, 0, 0.7);
      border-bottom: 1px solid black;
      text-align: center;

      h1 {
        font-size: 34px;
        text-align: left;
        padding: 0 10px;
        font-weight: 300;
      }

      a {
        display: inline-block;
        margin-left: 8px;
        color: unset;
        text-decoration: none;
      }
    }

    .product {
      display: grid;
      grid-template-columns: 10% 30% 35% 25%;
      margin: 24px 0;
      text-align: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      align-items: center;
      font-size: 18px;
      @media only screen and (max-width: 576px) {
        font-size: 11px;
      }
      i {
        cursor: pointer;
      }

      &__image {
        margin: 0 auto 1rem;
        max-width: 200px;
        max-height: 200px;
        object-fit: contain;
        @media only screen and (max-width: 768px) {
          max-width: 100px;
          max-height: 100px;
        }
      }
    }

    .product:nth-child(2) {
      border-bottom: 1px solid black;
      font-weight: 500;
      font-size: 20px;
    }
  }
`
function Product({ product }) {
  const dispatch = useDispatch()
  const userId = useSelector((store) => store.users.userId)

  return (
    <div className="product">
      <i
        className="fas fa-times"
        onClick={() => dispatch(removeFavoriteProduct(userId, product.id))}
      ></i>
      <a href={`#/${product.url}`}>
        <img className="product__image" src={product.picture} />
      </a>
      <p className="product__title">{product.title}</p>
      <p className="product__price">$ {product.price}</p>
    </div>
  )
}

export default function WishlistPage() {
  const history = useHistory()
  const dispatch = useDispatch()
  const favoriteProducts = useSelector((store) => store.users.favoriteProducts)
  const userId = useSelector((store) => store.users.userId)
  const isLoadingMsg = useSelector((store) => store.users.isLoading)

  useEffect(() => {
    if (userId) {
      dispatch(getFavoriteProducts(userId))
    }
  }, [userId])

  if (!userId) {
    history.push('/login')
  }

  return (
    <div className={wishlistPageContainer}>
      {isLoadingMsg && <Loading />}
      <div className="wishlist">
        {/* <div className="wishlist__left-dot"></div>
        <div className="wishlist__right-dot"></div> */}
        <div className="wishlist__title">
          <h1>WISHLIST.</h1>
        </div>

        {favoriteProducts.length === 0 ? (
          <p className="reminder">List is empty ʕ•ᴥ•ʔ Add something new ?</p>
        ) : (
          <div className="product">
            <p></p>
            <p className="product__image">Product Image</p>
            <p className="product__title">Product Name</p>
            <p className="product__price">Price</p>
          </div>
        )}

        {favoriteProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}

        <Cart />
      </div>
    </div>
  )
}
