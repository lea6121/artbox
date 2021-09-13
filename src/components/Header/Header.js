import './header.css'
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// import { setUser } from '../../redux/reducers/userReducer'
import { setAuthToken } from '../../utils'

export default function Header() {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  // const user = useSelector((store) => store.users.user)

  // const handleLogout = () => {
  //   const logoutMsg = window.confirm('確認登出嗎？')
  //   if (logoutMsg) {
  //     setAuthToken('')
  //     dispatch(setUser(null))
  //     if (location.pathname !== '/') {
  //       history.push('/')
  //     }
  //   }
  // }

  return (
    //  <HeaderContainer>
    //    <ResetStyle />
    //   <GlobalStyle />

    //    <Brand to="/" $active={location.pathname === '/'}>
    //     ArtBox
    //   </Brand>
    //   <NavbarList classNameName="tags">
    //     <Nav to="/shop" $active={location.pathname === '/shop'}>
    //       SHOP
    //     </Nav>
    //      {user && (
    //       <Nav to="/new-post" $active={location.pathname === '/new-post'}>
    //         POST
    //       </Nav>
    //     )}
    //     {!user && (
    //       <Nav to="/login" $active={location.pathname === '/login'}>
    //         LOG IN
    //       </Nav>
    //     )}
    //     {user && <Nav onClick={handleLogout}>LOG OUT</Nav>}
    //     {!user && (
    //       <Nav to="/register" $active={location.pathname === '/register'}>
    //         SIGN UP
    //       </Nav>
    //     )} *
    //   </NavbarList>
    // </HeaderContainer>
    <>
      <div className="header-top">
        <div className="tags">
          <a href="./">
            <img
              id="site-logo"
              src="https://64.media.tumblr.com/add0f153b2b9d647ddd2773b8612fe3d/tumblr_ozqqsgf3Bl1u0ccv7o1_1280.gifv"
              alt="site-logo"
            />
          </a>
          <a href="./" className="site-name">
            ArtBox
          </a>
        </div>
        <nav className="icons">
          <a href="./#/collections">
            <img
              className="icon icon__collections"
              src="https://icon-library.com/images/img-icon/img-icon-1.jpg"
              alt="icon"
            />
            <div>collections</div>
          </a>

          {/* <a href="./#/shop?type=tickets">
            <img
              className="icon icon__ticket"
              src="https://www.vippng.com/png/detail/414-4142418_png-file-ticket-vector-icon.png"
              alt="icon"
            />
            <div>buy ticket</div>
          </a> */}

          <a href="./#/shop">
            <img
              className="icon icon__shop"
              src="https://www.pngfind.com/pngs/m/453-4531594_icon-05-min-clip-art-shopping-bag-hd.png"
              alt="icon"
            />
            <div>shop</div>
          </a>
          <a href="./#/shop?type=tickets">
            <img
              className="icon icon__ticket"
              src="https://www.vippng.com/png/detail/414-4142418_png-file-ticket-vector-icon.png"
              alt="icon"
            />
            <div>cart</div>
          </a>

          <a href="./#/user">
            <div className="drop">
              <img
                className="icon icon__user"
                src="https://www.pngfind.com/pngs/m/34-349693_circled-user-icon-transparent-background-username-icon-hd.png"
                alt="icon"
              />
              <button>account</button>
              <div className="dropbox">
                <a href="./#/Login">LOG IN/JOIN</a>
                {/* <a href="./#/user?">WISHLIST</a> */}
                <a href="./#/user?">訂單查詢</a>
                <a href="./#/user">BACKSTAGE</a>
                <a href="./#/user">LOG OUT</a>
              </div>
            </div>
          </a>
        </nav>
      </div>
    </>
  )
}
