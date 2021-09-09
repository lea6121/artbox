import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import trailer from '../../media/trailer.mp4'
import styled from 'styled-components'
// import { ResetStyle, GlobalStyle } from '../../globalStyle'
import { getArtworks } from '../../redux/reducers/artworkReducer'
import { Loading } from '../../components/App/App'
import { useDispatch, useSelector } from 'react-redux'
import './homepage.css'
const Root = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-top: 100px;
  position: relative;
`

const ArtworksBanner = styled.div``

const ArtworksContainer = styled.div`
  border-bottom: 1px solid rgba(0, 12, 34, 0.2);
  padding: 40px 10px;
  border: 1px solid black;
  margin: 20px;
`

const ArtworksTopContainer = styled.div`
  padding-bottom: 30px;
  margin: 0px 18px 15px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ArtworksTitle = styled(Link)`
  font-weight: 600;
  line-height: 4rem;
  font-size: 24px;
  color: #333;
  text-decoration: none;
`

const ArtworksContent = styled.div`
  color: rgba(0, 0, 0, 0.8);
  margin: 0 18px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  white-space: pre-line;
  font-size: 19px;
  line-height: 4rem;
`
// const PaginationContainer = styled.div`
//   ${'' /* display: flex; */}
//   justify-content: center;
//   padding: 20px;
// `

// const Pagination = styled(Link)`
//   font-weight: 500;
//   color: rgba(0, 0, 0, 0.7);
//   text-decoration: none;
//   margin: 10px 5px;
//   font-size: 28px;
//   padding: 10px 18px;
// `
// const PageTeller = styled.div`
//   font-size: 16px;
//   color: grey;
//   text-align: center;
//   padding: 0 0 50px;
// `
function Artwork({ artwork }) {
  const location = useLocation()
  // console.log(artwork)
  return (
    <ArtworksContainer>
      <ArtworksBanner></ArtworksBanner>
      <ArtworksTopContainer>
        <ArtworksTitle
          to={`/posts/${artwork.id}`}
          $active={location.pathname === '/article'}
        >
          {artwork.title}
        </ArtworksTitle>
        <img src={artwork.images.web.url} alt="unavailble" />
        {/* <img
          src={`https://lakeimagesweb.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
          alt="pic"
        /> */}
      </ArtworksTopContainer>

      {/* <PostContent>{recipe.image}</PostContent> */}
    </ArtworksContainer>
  )
}

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch()
  const isLoadingArtworksMsg = useSelector(
    (store) => store.artworks.isLoadingArtworks
  )
  const artworks = useSelector((store) => store.artworks.artworks)

  // const totalPosts = useSelector((store) => store.posts.totalPosts)

  useEffect(() => {
    dispatch(getArtworks())
  }, [dispatch])

  // function changePage(e) {
  //   const currentPageNum = Number(e.target.innerText)
  //   setCurrentPage(currentPageNum)
  //   dispatch(getPosts(currentPageNum))
  // }

  // function RenderPagination() {
  //   const totalPages = Math.ceil(totalPosts / 5)
  //   let pageNumbers = []
  //   for (let i = 1; i <= totalPages; i++) {
  //     pageNumbers.push(i)
  //   }
  //   return (
  //     <>
  //       <PaginationContainer>
  //         {pageNumbers.map((value, index) => (
  //           <Pagination key={value} onClick={changePage}>
  //             {value}
  //           </Pagination>
  //         ))}
  //       </PaginationContainer>
  //       <PageTeller>
  //         第 {currentPage} 頁 / 共 {totalPages} 頁
  //       </PageTeller>
  //     </>
  //   )
  // }

  return (
    <>
      {isLoadingArtworksMsg && <Loading></Loading>}
      <div className="banner">
        <section>
          <div className="banner__mask">
            <h3>Current Exhibitions</h3>
            <h1>CLAUDE MONET</h1>
            <p>
              THE presale tickets available now. Public ticket sale begins Sept
              20.
            </p>
          </div>
        </section>
        <video
          src={trailer}
          poster="https://uploads4.wikiart.org/images/claude-monet/the-sea-at-pourville.jpg!Large.jpg"
          preload
          controls
        ></video>
      </div>

      <div className="contents-container">
        <div className="contents">
          <a href="./#/about" className="contents-tag">
            <div className="content__card">
              <img
                className="content__photo"
                src="https://p7.itc.cn/q_70/images03/20210207/3038f3cc2f204016805217e98db937da.jpeg"
                alt="content"
              />
              <div className="content-mask">
                <div className="content-mask__text">about.</div>
              </div>
            </div>
          </a>

          <a href="./#/collections" className="contents-tag">
            <div className="content__card">
              <img
                className="content__photo"
                src="https://www.clevelandart.org/sites/default/files/styles/takeover_highlight_secondary/public/2001-45_sh.jpg?itok=D1NKRMBW"
                alt="content"
              />
              <div className="content-mask__text">search collections.</div>
            </div>
          </a>

          <a href="./#/shop?type=tickets" class="contents-tag">
            <div class="content__card">
              <img
                class="content__photo"
                src="https://www.clevelandart.org/sites/default/files/styles/takeover_highlight_secondary/public/2006-146_SH.jpg?itok=x8vsI67-"
                alt="item"
              />
              <div class="content-mask">
                <div class="content-mask__text">buy tickets.</div>
              </div>
            </div>
          </a>

          <a href="./#/shop" class="contents-tag">
            <div class="content__card">
              <img
                class="content__photo"
                src="https://www.clevelandart.org/sites/default/files/styles/takeover_highlight_secondary/public/Become%20a%20member_homepage_4MP_0.JPG?itok=tNj3wtZ8"
                alt="content"
              />
              <div class="content-mask">
                <div class="content-mask__text">shop online store.</div>
              </div>
            </div>
          </a>
          {/* <a href="./" className="artwork">
            <div className="artwork__container">
              <img
                className="artwork__photo"
                src="https://www.clevelandart.org/sites/default/files/styles/takeover_highlight_secondary/public/Become%20a%20member_homepage_4MP_0.JPG?itok=tNj3wtZ8"
                alt="item"
              />
              <div className="artwork__mask">
                <div className="artwork__mask__text">shop online store.</div>
              </div>
            </div>
          </a> */}
        </div>
      </div>
      {/* <ResetStyle />
      <GlobalStyle />
      <Root>
        {artworks.map((artwork) => (
          <Artwork key={artwork.id} artwork={artwork} />
        ))}
        <RenderPagination></RenderPagination>
      </Root> */}
    </>
  )
}
