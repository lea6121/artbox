import { css } from '@emotion/css'
import { useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../Header'
import Footer from '../Footer'
import HomePage from '../../pages/HomePage'
import CollectionsPage from '../../pages/CollectionsPage'
import CollectionPage from '../../pages/CollectionsPage/CollectionsPage'
import ShopPage from '../../pages/ShopPage'
import ProductPage from '../../pages/ProductPage'

import { getAuthToken } from '../../utils'
import { setUser, getMe } from '../../redux/reducers/userReducer'

const root = css`
  margin: 0 auto;
  max-width: 100vw;
  position: relative;
`

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.users.user)

  useEffect(() => {
    // 有 token 才 call api
    if (getAuthToken()) {
      dispatch(getMe())
    }
  }, [dispatch])

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
          <Route path="/collections/:id">
            <CollectionPage />
          </Route>
          <Route path="/shop">
            <ShopPage />
          </Route>
          <Route path="/product/">
            <ProductPage />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}

export default App
