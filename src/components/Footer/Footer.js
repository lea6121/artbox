// import styled from 'styled-components'
// import { ResetStyle, GlobalStyle } from '../../globalStyle'
import './footer.css'
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// import { setUser } from '../../redux/reducers/userReducer'
import { setAuthToken } from '../../utils'

// const HeaderContainer = styled.div`
//   letter-spacing: 1px;
//   width: 100vw;
//   display: flex;
//   align-items: center;
//   position: fixed;
//   background-color: white;
//   justify-content: space-evenly;
//   z-index: 2;
//   border-bottom: 1px solid black;
// `

// const Brand = styled(Link)`
//   font-size: 50px;
//   text-decoration: none;
//   color: #010101;
// `

// const NavbarList = styled.div`
//   display: flex;
//   color: #010101;
// `

// const Nav = styled(Link)`
//   border-left: 1px solid black;
//   box-sizing: border-box;
//   padding: 35px 40px 35px 40px;
//   font-size: 20px;
//   text-align: center;
//   color: #010101;
//   display: flex;
//   transition: all 0.2s ease-in;
//   cursor: pointer;
//   text-decoration: none;

//   ${(props) =>
//     props.$active &&
//     `
//     background: rgba(36, 35, 35, 0.9);
//     color: white;
//     `};
// `

export default function Footer() {
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
      <footer>
        <div class="footer">
          <div class="footer__content">
            <ul>
              <a href="./#/about">
                <li>About Us</li>
              </a>
              <a href="./">
                <li>Contact</li>
              </a>
              <a href="./">
                <li>FAQ</li>
              </a>
            </ul>
            <ul>
              <a href="./">
                <li>Shipping & Returns</li>
              </a>
              <a href="./">
                <li>Store Policy</li>
              </a>
              <a href="./">
                <li>Payment Methods</li>
              </a>
            </ul>

            <ul>
              <li>Tuesday to Sunday: 10:00 a.m.–5:00 p.m.</li>
              <li>Closed Monday</li>
              <li>11150 East Boulevard Cleveland, Ohio 44106</li>
              <li>216-421-7350 888-CMA-0033</li>
            </ul>

            <nav>
              <a href="./">
                <img
                  src="https://static.wixstatic.com/media/81af6121f84c41a5b4391d7d37fce12a.png/v1/fill/w_52,h_52,al_c,q_85,usm_0.66_1.00_0.01/81af6121f84c41a5b4391d7d37fce12a.webp"
                  alt="contact"
                />
              </a>
              <a href="./">
                <img
                  src="https://static.wixstatic.com/media/23fd2a2be53141ed810f4d3dcdcd01fa.png/v1/fill/w_52,h_52,al_c,q_85,usm_0.66_1.00_0.01/23fd2a2be53141ed810f4d3dcdcd01fa.webp"
                  alt="contact"
                />
              </a>
              <a href="./">
                <img
                  src="https://static.wixstatic.com/media/203dcdc2ac8b48de89313f90d2a4cda1.png/v1/fill/w_40,h_40,al_c,q_85,usm_0.66_1.00_0.01/203dcdc2ac8b48de89313f90d2a4cda1.webp"
                  alt="contact"
                />
              </a>
              <a href="./">
                <img
                  src="https://static.wixstatic.com/media/01ab6619093f45388d66736ec22e5885.png/v1/fill/w_40,h_40,al_c,q_85,usm_0.66_1.00_0.01/01ab6619093f45388d66736ec22e5885.webp"
                  alt="contact"
                />
              </a>
              <a href="./">
                <img
                  src="https://static.wixstatic.com/media/9c486556465843c5850fabfd68dfae49.png/v1/fill/w_40,h_40,al_c,q_85,usm_0.66_1.00_0.01/9c486556465843c5850fabfd68dfae49.webp"
                  alt="contact"
                />
              </a>
            </nav>
          </div>
          <div class="footer__copyright">
            The website is only for amateur project and not for commercial use.
            © 2021 By ArtBox
          </div>
        </div>
      </footer>
    </>
  )
}
