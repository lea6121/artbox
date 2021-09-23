import { css } from '@emotion/css'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Cart from '../../components/Cart'
import Loading from '../../components/Loading'
import {
  getCollections,
  getSpecificCollections,
  searchCollections,
  setCurrentPageNum
} from '../../redux/reducers/collectionReducer'

const collectionsPageContainer = css`
  box-sizing: border-box;
  font-family: Baskerville;

  #btn-back-to-top {
    position: fixed;
    bottom: 10px;
    left: 10px;
    /* display: none; */
  }
  .collection {
    &__banner {
      width: 100vw;
      margin: 0 0 50px;
      position: relative;
      max-width: 100vw;
      height: 80vh;
      background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Chinese_Painting_-_Flickr_-_Jaykhuang.jpg/1280px-Chinese_Painting_-_Flickr_-_Jaykhuang.jpg');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: top;
      background-attachment: fixed;

      h1 {
        font-family: Serif;
        background: linear-gradient(#000000, #3e3e3e, rgb(172, 170, 170));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 48px;
        font-weight: 500;
        position: absolute;
        top: 34%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .input-group {
        text-align: center;
        max-width: 50%;
        position: absolute;
        top: 46%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      form {
        width: 100%;
      }

      .form-control {
        height: 45px;
        border-radius: 5px;
        font-size: 18px;
      }
    }

    &__container {
      height: auto;
      max-width: 93%;
      margin: 0 auto;
      display: grid;
      grid-gap: 0 30px;
      grid-template-columns: 20% auto;

      .left-section {
        ul {
          font-size: 28px;
          list-style: none;
          margin-bottom: 30px;

          li {
            cursor: pointer;
            font-size: 18px;
            padding: 15px;
            background-color: white;
            border-bottom: rgba(255, 255, 255, 0.1);
            box-shadow: 0 1px 4px 0px rgba(0, 0, 0, 0.2);
          }
        }
      }

      .right-section {
        font-family: Georgia, 'Times New Roman', Times, serif;

        & > h1 {
          text-align: left;
          margin: 30px;
          font-size: 28px;
          font-style: italic;
          color: rgba(0, 0, 0, 0.8);
        }

        .collections {
          letter-spacing: 0.1rem;
          margin: 20px auto;
          padding: 10px 5px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: auto;
          grid-gap: 30px 30px;
          align-items: stretch;
          text-align: center;

          .collection {
            text-decoration: none;
            color: #000000;
            border-bottom: 1px solid #a8a7a7;
            padding-bottom: 20px;
            text-align: start;

            img {
              transition: all 0.6s ease-out;
              border-radius: 5px;
              height: 390px;
              object-fit: contain;
              width: 100%;
              &:hover {
                transform: scale(1.1);
              }
            }

            &__title {
              font-size: 18px;
              margin: 20px 0;
              letter-spacing: 0.05rem;
            }

            &__artist {
              color: #3e3e3e;
              font-style: italic;
              font-size: 14px;
            }
          }
        }
        .message {
          margin: 0 auto;
          padding: 30px;
          h1 {
            text-align: left;
            margin: 40px 0;
            font-size: 32px;
          }
          ul {
            padding-left: 0;
            font-size: 24px;
          }
        }
      }
    }
  }

  .pagination-container {
    margin: 20px auto;
    text-align: center;
  }
`
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
  // 'Indian and South East Asian Art ',
  'Islamic Art ',
  'Japanese Art ',
  'Korean Art ',
  'Medieval Art ',
  'Modern European Painting and Sculpture ',
  'Oceania',
  'Photography ',
  'Prints ',
  'Textiles '
]

function Collection({ collection }) {
  const location = useLocation()
  // console.log(location)
  return (
    <>
      <a
        href={`/#/collection/${collection.id}`}
        className="collection"
        // to={`/collections/${collection.id}`}
      >
        {collection.images ? (
          <img
            className="collection__image"
            src={collection.images.web.url}
            alt={collection.title}
          />
        ) : (
          <img
            src="https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg"
            alt="no-img"
          />
        )}

        <div className="collection__title">{collection.title}</div>
        {collection.creators &&
          collection.creators.length !== 0 &&
          collection.creators.map((creator) => (
            <div className="collection__artist">{creator.description}</div>
          ))}
      </a>
    </>
  )
}

export default function CollectionPage() {
  const dispatch = useDispatch()
  const collections = useSelector((store) => store.collections.collections)
  const isLoadingCollectionsMsg = useSelector(
    (store) => store.collections.isLoadingCollections
  )
  const currentSearch = useSelector((store) => store.collections.currentSearch)
  const currentCategory = useSelector(
    (store) => store.collections.currentCategory
  )
  // const currentPage = useSelector((store) => store.collections.currentPage)
  const [value, setValue] = useState()
  const [currentPage, setCurrentPage] = useState(1)

  // const [currentSearch, setCurrentSearch] = useState('')
  const handleClick = (e) => {
    let category = e.target.innerText
    dispatch(getSpecificCollections(category, 0))
    window.scrollTo(0, 700)
  }

  const handleInputChange = (e) => {
    setValue(e.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!value) return
    dispatch(searchCollections(value, 0))
    // setCurrentSearch(value)
    setValue('')
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

  function changePage(e) {
    const currentPageNum = Number(e.target.innerText)
    console.log(currentPageNum)
    setCurrentPage(currentPageNum)
    if (currentSearch) {
      dispatch(searchCollections(currentSearch, (currentPageNum - 1) * 24))
    } else if (currentCategory) {
      dispatch(
        getSpecificCollections(currentCategory, (currentPageNum - 1) * 24)
      )
    } else {
      dispatch(getCollections((currentPageNum - 1) * 24))
    }
    window.scrollTo(0, 300)
  }

  function Pagination() {
    const totalCollections = useSelector(
      (store) => store.collections.totalCollections
    )
    const totalPages = Math.ceil(totalCollections / 24)
    let pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }

    return (
      <div className="pagination-container">
        <div className="btn-group me-2" role="group">
          {pageNumbers.slice(0, 5).map((value, index) => (
            <button
              className="btn btn-outline-dark"
              key={value}
              onClick={changePage}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    )
  }

  useEffect(() => {
    console.log(currentPage)
    if (currentSearch) {
      dispatch(searchCollections(currentSearch, (currentPage - 1) * 24))
    } else if (currentCategory) {
      dispatch(getSpecificCollections(currentCategory, (currentPage - 1) * 24))
    } else {
      dispatch(getCollections((currentPage - 1) * 24))
    }
  }, [])

  return (
    <div className={collectionsPageContainer}>
      {isLoadingCollectionsMsg && <Loading></Loading>}
      <div className="collection__banner">
        <h1>THE COLLECTION</h1>
        {/* <p>
          Explore thousands of artworks in the museum’s wide-ranging
          collection—from our world-renowned icons to lesser-known gems from
          every corner of the globe—as well as our books, writings, reference
          materials, and other resources.
        </p> */}
        <div className="input-group flex-nowrap">
          <br />
          <form onSubmit={handleFormSubmit}>
            <input
              value={value}
              type="text"
              className="form-control"
              placeholder="🔍 Search by artists, keywords..."
              onChange={handleInputChange}
            />
          </form>
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
          {(currentSearch || currentCategory) && collections.length <= 0 && (
            <div className="message">
              <h1>Hmmm...</h1>
              <h1>
                Looks like we don't have any matches for "
                {currentSearch || currentCategory}".
              </h1>
              <ul>You might try: </ul>
              <li>
                Using more generic search terms, or double check your search for
                any types or spelling errors.
              </li>
              <li>
                The collection you searching for may be not in our collections
                yet.
              </li>
            </div>
          )}
          {/* ) : (
            <h1>The results for "{currentSearch || currentCategory}"</h1>
          )} */}
          {collections.length > 0 && (
            <div className="collections">
              {collections.map((collection) => (
                <Collection key={collection.id} collection={collection} />
              ))}
            </div>
          )}
        </section>
      </div>
      <Pagination />

      <button
        type="button"
        className="btn btn-dark btn-floating btn-lg"
        id="btn-back-to-top"
        onClick={() => {
          window.scrollTo(0, 0)
        }}
      >
        <i className="fas fa-angle-up"></i>
      </button>

      <Cart />
    </div>
  )
}
