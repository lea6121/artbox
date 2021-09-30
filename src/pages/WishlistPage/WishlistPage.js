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
  width: 100vw;
  height: auto;
  font-family: 'Gill Sans';
  font-weight: 300;
  border: 1px solid transparent;
 background: rgba(0, 0, 0, 0.9);
  border-bottom: 1px solid white; 
  }

  .wishlist {
    position: relative;
    margin: 50px auto;
    width: 1120px;
    background: white;
    padding: 0 50px 50px;
    ${'' /* border: 1px solid rgba(0, 0, 0, 0.4); */}
    box-shadow: -7px -7px 0px 0px gold;

    ${
      '' /* &__right-dot {
      position: absolute;
      width: 24px;
      height: 24px;
      background: rgba(0, 0, 0, 0.7);
      top: 12px;
      right: 12px;
      border-radius: 50%;
      box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);
    }

    &__left-dot {
      position: absolute;
      width: 24px;
      height: 24px;
      background: rgba(0, 0, 0, 0.7);
      top: 12px;
      left: 12px;
      border-radius: 50%;
      box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
    } */
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
        font-size: 38px;
        text-align: left;
        padding: 0 10px;
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

      i {
        cursor: pointer;
      }

      &__image {
        margin: 0 auto 1rem;
        max-width: 200px;
        max-height: 200px;
        object-fit: contain;
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
    } else {
      alert('Please log in first!')
      history.push('/login')
    }
  }, [userId])

  return (
    <div className={wishlistPageContainer}>
      {isLoadingMsg && <Loading />}
      <div className="wishlist">
        {/* <div className="wishlist__left-dot"></div>
        <div className="wishlist__right-dot"></div> */}
        <div className="wishlist__title">
          <h1>MY WISHLIST.</h1>
        </div>

        <div className="product">
          <p></p>
          <p className="product__image">Product Image</p>
          <p className="product__title">Product Name</p>
          <p className="product__price">Price</p>
        </div>

        {favoriteProducts.length === 0 && (
          <p className="reminder">
            Wishlist is empty ʕ•ᴥ•ʔ Add something new ?
          </p>
        )}

        {favoriteProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}

        <Cart />
      </div>
    </div>
  )
}
