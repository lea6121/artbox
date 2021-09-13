import './collectionsPage.css'
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { ResetStyle, GlobalStyle } from '../../globalStyle'
import {
  getCurrentViewCollections,
  getSpecificCollections,
  searchCollections
} from '../../redux/reducers/collectionReducer'
import { Loading } from '../../components/App/App'
import { useDispatch, useSelector, useStore } from 'react-redux'
// import { getProducts } from '../../WebAPI'

// const Root = styled.div`
//   width: 80%;
//   margin: 0 auto;
//   padding-top: 100px;
//   position: relative;
// `

// const PostsContainer = styled.div`
//   border-bottom: 1px solid rgba(0, 12, 34, 0.2);
//   padding: 40px 10px;
//   border: 1px solid black;
//   margin: 20px;
// `

// const PostTopContainer = styled.div`
//   padding-bottom: 30px;
//   margin: 0px 18px 15px 16px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `

// const PostTitle = styled(Link)`
//   font-weight: 600;
//   line-height: 4rem;
//   font-size: 24px;
//   color: #333;
//   text-decoration: none;
// `

// const PostDate = styled.div`
//   font-size: 14px;
//   color: rgba(0, 0, 0, 0.8);
// `

// const PostContent = styled.div`
//   color: rgba(0, 0, 0, 0.8);
//   margin: 0 18px;
//   display: -webkit-box;
//   -webkit-box-orient: vertical;
//   -webkit-line-clamp: 2;
//   overflow: hidden;
//   white-space: pre-line;
//   font-size: 19px;
//   line-height: 4rem;
// `

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

const categories = [
  'African Art ',
  'American Painting and Sculpture ',
  'Art of the Americas ',
  'Chinese Art ',
  'Contemporary Art ',
  'Decorative Art and Design ',
  'Drawings ',
  'Egyptian and Ancient Near Eastern Art ',
  'European Painting and Sculpture ',
  'Greek and Roman Art ',
  'Indian and South East Asian Art ',
  'Islamic Art ',
  'Japanese Art ',
  'Korean Art ',
  'Medieval Art ',
  'Modern European Painting and Sculpture ',
  'Oceania',
  // 'Performing Arts, Music, & Film ',
  'Photography ',
  'Prints ',
  'Textiles '
]

function Collection({ collection }) {
  const location = useLocation()
  return (
    <>
      <a href={`./#/collections/${collection.id}`} className="artwork">
        {collection.images ? (
          <img
            className="artwork__photo"
            src={collection.images.web.url}
            alt="collection"
          />
        ) : (
          <img
            src="https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg"
            alt="no-img"
          />
        )}

        <div class="artwork__title">{collection.title}</div>
        {collection.creators.length !== 0 &&
          collection.creators.map((creator) => (
            <div class="artwork__artist">{creator.description}</div>
          ))}
      </a>
    </>
  )
}

export default function CollectionPage() {
  const [value, setValue] = useState()
  const isLoadingCollectionsMsg = useSelector(
    (store) => store.collections.isLoadingCollections
  )
  // const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch()

  const collections = useSelector((store) => store.collections.collections)

  useEffect(() => {
    dispatch(getCurrentViewCollections())
  }, [])

  const handleClick = (e) => {
    let category = e.target.innerText
    dispatch(getSpecificCollections(category))
  }

  function Category() {
    return (
      <>
        {categories.map((item) => (
          <li onClick={handleClick}>{item}</li>
        ))}
      </>
    )
  }
  // const totalPosts = useSelector((store) => store.posts.totalPosts)

  // let page = 4
  // useEffect(() => {
  //   dispatch(getCollections(page))
  // }, [dispatch])

  // console.log(products)
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

  const handleInputChange = (e) => {
    setValue(e.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!value) return
    dispatch(searchCollections(value))
    setValue('')
  }

  return (
    <>
      {isLoadingCollectionsMsg && <Loading></Loading>}
      <div className="collection__banner">
        <h1>Search Collections</h1>
        <div class="input-group flex-nowrap">
          <br />
          <form onSubmit={handleFormSubmit}>
            <input
              value={value}
              type="text"
              className="form-control"
              placeholder="🔍 Search collections..."
              onChange={handleInputChange}
            />
          </form>
          {/* <span className="input-group-text" id="addon-wrapping">
            Search
          </span> */}
        </div>
      </div>
      <div className="collection__container">
        <section className="left-section">
          <ul>
            Categories
            <Category></Category>
          </ul>
        </section>

        <section className="right-section">
          {/* <div className="right-section__banner">
            <img src="https://openaccess-cdn.clevelandart.org/1970.67/1970.67_web.jpg" />
          </div> */}
          {collections.length > 0 ? (
            <div className="collections">
              {collections.map((collection) => (
                <Collection key={collection.id} collection={collection} />
              ))}
            </div>
          ) : (
            <div className="message">
              <h1>Hmmm...</h1>
              <h1>Looks like we don't have any matches for your search.</h1>
              <ul>You might try: </ul>
              <li>
                Using more generic search terms, or double check your search for
                any types or spelling errors.
              </li>
              <li>
                The collection you searching for may be not in our collection
                yet.
              </li>
            </div>
          )}
        </section>
      </div>

      <a href="#top">
        <button
          type="button"
          class="btn btn-dark btn-floating btn-lg"
          id="btn-back-to-top"
        >
          <i class="fas fa-angle-up"></i>
        </button>
      </a>
      {/* <Root>
        <RenderPagination></RenderPagination>
      </Root> */}
    </>
  )
}
