import { css } from '@emotion/css'
import { useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

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

import { getAuthToken } from '../../utils'
import { setUser, getUser } from '../../redux/reducers/userReducer'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const root = css`
  margin: 0 auto;
  max-width: 100vw;
  position: relative;
  height: 100vh;
`
const auth = getAuth()

function App() {
  const dispatch = useDispatch()

  // useEffect(() => {
  //   // 有 token 才 call api
  //   if (getAuthToken()) {
  //     dispatch(getUser())
  //   }
  // }, [])

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser(user.uid))
    } else {
      console.log('has log out')
    }
  })
  const user = useSelector((state) => state.users.user)

  return (
    <div className={root} value={{ user, setUser }}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/collections">
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
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}

export default App
