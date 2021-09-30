import { css } from '@emotion/css'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUserId } from '../../redux/reducers/userReducer'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Header from '../Header'
import Footer from '../Footer'
import HomePage from '../../pages/HomePage'
import CollectionsPage from '../../pages/CollectionsPage'
import ArtworkPage from '../../pages/ArtworkPage'
import ShopPage from '../../pages/ShopPage'
import ProductsPage from '../../pages/ProductsPage'
import ProductPage from '../../pages/ProductPage'
import LoginPage from '../../pages/LoginPage'
import RegisterPage from '../../pages/RegisterPage'
import CheckoutPage from '../../pages/CheckoutPage'
import WishlistPage from '../../pages/WishlistPage'
import OrdersPage from '../../pages/OrdersPage'

const root = css`
  margin: 0 auto;
  max-width: 100vw;
  position: relative;
  height: 100vh;
`

function App() {
  const auth = getAuth()
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.users.userId)
  const expiredTime = 1000 * 60 * 60

  setTimeout(function () {
    localStorage.removeItem('cartData')
  }, expiredTime)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUserId(user.uid))
    }
  })

  return (
    <div className={root} value={{ userId, setUserId }}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/collections/:page">
            <CollectionsPage />
          </Route>
          <Route path="/collection/:id">
            <ArtworkPage />
          </Route>
          <Route path="/shop">
            <ShopPage />
          </Route>
          <Route path="/products/:category">
            <ProductsPage />
          </Route>
          <Route path="/product/:category/:id">
            <ProductPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/checkout">
            <CheckoutPage />
          </Route>
          <Route path="/wishlist">
            <WishlistPage />
          </Route>
          <Route path="/orders">
            <OrdersPage />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}

export default App
