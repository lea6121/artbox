import { css } from '@emotion/css'
import image210006 from '../../assets/210006.jpeg'
import image210011 from '../../assets/210011.jpeg'
import image210015 from '../../assets/210015.png'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Cart from '../../components/Cart'
import Loading from '../../components/Loading'
import {
  getCollections,
  getSpecificCollections,
  searchCollections
} from '../../redux/reducers/collectionReducer'

const collectionsPageContainer = css`
  position: relative;
  box-sizing: border-box;
  font-family: serif;
  margin: 0 auto;

  #btn-back-to-top {
    position: fixed;
    bottom: 10px;
    left: 10px;
  }

  .collection {
    &__banner {
      margin: 0 0 50px;
      position: relative;
      height: 80vh;
      background-size: cover;
      background-position: top;
      background-repeat: no-repeat;
      background-attachment: fixed;
      -o-background-size: cover;
      -moz-background-size: cover;
      -webkit-background-size: cover;

      h1 {
        background: linear-gradient(#000000, #3e3e3e, rgb(172, 170, 170));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 48px;
        font-weight: 500;
        position: absolute;
        top: 34%;
        left: 50%;
        width: 80%;
        text-align: center;
        transform: translate(-50%, -50%);

        @media only screen and (max-width: 576px) {
          top: 32%;
          font-size: 32px;
          text-align: left;
          background: black;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }

      .input-group {
        text-align: center;
        max-width: 50%;
        position: absolute;
        top: 46%;
        left: 50%;
        transform: translate(-50%, -50%);
        @media only screen and (max-width: 959px) {
          max-width: 90%;
        }
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
      max-width: 1380px;
      margin: 0 auto;
      display: grid;
      grid-gap: 0 30px;
      grid-template-columns: 20% auto;

      @media only screen and (min-width: 579px) and (max-width: 992px) {
        grid-template-columns: 40% auto;
      }

      @media only screen and (max-width: 579px) {
        display: block;
      }

      .left-section {
        ul {
          font-size: 28px;
          list-style: none;
          margin-bottom: 30px;
          padding: 0 1rem;

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
        & > h1 {
          text-align: left;
          margin: 30px 30px 30px 10px;
          font-size: 26px;
          font-style: italic;
          color: rgba(0, 0, 0, 0.8);
        }

        .collections {
          margin: 20px auto;
          padding: 10px 5px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: auto;
          grid-gap: 30px 30px;
          align-items: stretch;
          text-align: center;

          @media only screen and (min-width: 992px) and (max-width: 1200px) {
            grid-template-columns: repeat(2, 1fr);
          }

          @media only screen and (max-width: 992px) {
            grid-template-columns: repeat(1, 1fr);
          }

          .collection {
            position: relative;
            text-decoration: none;
            color: #000000;
            border-bottom: 1px solid #a8a7a7;
            padding-bottom: 20px;
            text-align: center;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 8;
            overflow: hidden;
            align-items: center;

            .placeholder {
              position: absolute;
              top: 0%;
              left: 0%;
              background-color: transparent;
              background-size: 50% 50%;
              background-repeat: no-repeat;
              background-position: center;
              height: 400px;
              width: 100%;
              -webkit-transition: opacity 0.5s;
              -moz-transition: opacity 0.5s;
              -ms-transition: opacity 0.5s;
              transition: opacity 0.5s;
              cursor: unset;
            }

            img {
              transition: all 0.6s ease-out;
              border-radius: 5px;
              min-height: 400px;
              height: 400px;
              width: 100%;
              object-fit: contain;
              opacity: 1;

              &:hover {
                transform: scale(1.1);
              }
            }

            &__title {
              text-align: start;
              font-size: 20px;
              margin: 20px 0 10px;
            }

            &__artist {
              text-align: start;

              color: rgba(0, 0, 0, 0.6);
              font-style: italic;
              font-size: 14px;
              font-family: 'Gill Sans';
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

    .btn {
      @media only screen and (max-width: 480px) {
        padding: 6px;
        font-size: 12px;
      }
      @media only screen and (max-width: 320px) {
        padding: 4px;
        font-size: 12px;
      }
    }
  }
`

const categories = [
  'African Art ',
  'American Painting and Sculpture ',
  'Art of the Americas ',
  'Chinese Art ',
  'Decorative Art and Design ',
  'Drawings ',
  'Egyptian and Ancient Near Eastern Art ',
  'European Painting and Sculpture ',
  'Greek and Roman Art ',
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

function Collection({ collection, scrollPosition }) {
  return (
    <>
      <a href={`./#/collection/${collection.id}`} className="collection">
        <div
          className="placeholder"
          style={{ backgroundImage: `url(${image210015})` }}
        ></div>
        {collection.images ? (
          <LazyLoadImage
            alt={collection.title}
            effect="blur"
            src={collection.images.web.url}
          />
        ) : (
          <LazyLoadImage
            alt="Img unavailable"
            effect="blur"
            src={image210011}
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

export default function CollectionsPage() {
  const dispatch = useDispatch()
  const params = useParams()
  const page = Number(params.page)
  const collections = useSelector((store) => store.collections.collections)
  const isLoadingCollectionsMsg = useSelector(
    (store) => store.collections.isLoadingCollections
  )
  const currentSearch = useSelector((store) => store.collections.currentSearch)
  const currentCategory = useSelector(
    (store) => store.collections.currentCategory
  )
  const [value, setValue] = useState()

  const handleClick = (e) => {
    let category = e.target.innerText
    dispatch(getSpecificCollections(category, 0))
    window.location.replace('#/collections/1')
  }

  const handleInputChange = (e) => {
    setValue(e.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!value) return
    dispatch(searchCollections(value, 0))
    window.location.replace('#/collections/1')
    setValue('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
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

  function changePage(value) {
    let currentPageNum = Number(value)
    if (currentSearch) {
      dispatch(searchCollections(currentSearch, (currentPageNum - 1) * 24))
    } else if (currentCategory) {
      dispatch(
        getSpecificCollections(currentCategory, (currentPageNum - 1) * 24)
      )
    } else {
      dispatch(getCollections((currentPageNum - 1) * 24))
    }
    window.location.replace(`#/collections/${currentPageNum}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
          {page >= 1 &&
            pageNumbers.splice(0, 1).map((value, index) => (
              <button
                className={
                  value === page ? ' btn btn-dark' : ' btn btn-outline-dark'
                }
                key={value}
                onClick={() => {
                  changePage(1)
                }}
              >
                {value}
              </button>
            ))}
          {page >= 2 && (
            <button
              className="btn btn-outline-dark"
              onClick={() => {
                changePage(page - 1)
              }}
            >
              <i
                className="fas fa-chevron-left"
                style={{ fontSize: '6px' }}
              ></i>
              <i
                className="fas fa-chevron-left"
                style={{ fontSize: '6px', marginRight: '2px' }}
              ></i>
            </button>
          )}
          {page < 7
            ? pageNumbers.slice(0, 6).map((value, index) => (
                <button
                  className={
                    value === page ? ' btn btn-dark' : ' btn btn-outline-dark'
                  }
                  key={value}
                  onClick={() => {
                    changePage(value)
                  }}
                >
                  {value}
                </button>
              ))
            : pageNumbers.slice(page - 5, page + 2).map((value, index) => (
                <button
                  className={
                    value === page ? ' btn btn-dark' : ' btn btn-outline-dark'
                  }
                  key={value}
                  onClick={() => {
                    changePage(value)
                  }}
                >
                  {value}
                </button>
              ))}

          {page < pageNumbers.length && (
            <button
              className="btn btn-outline-dark"
              key={page - 1}
              onClick={() => {
                changePage(page + 1)
              }}
            >
              <i
                className="fas fa-chevron-right"
                style={{ fontSize: '6px', marginLeft: '2px' }}
              ></i>
              <i
                className="fas fa-chevron-right"
                style={{ fontSize: '6px' }}
              ></i>
            </button>
          )}

          {page < pageNumbers.length - 2 &&
            pageNumbers.slice(-1).map((value, index) => (
              <button
                className={
                  value === page ? ' btn btn-dark' : ' btn btn-outline-dark'
                }
                key={value}
                onClick={() => {
                  changePage(value)
                }}
              >
                {value}
              </button>
            ))}
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (currentSearch) {
      dispatch(searchCollections(currentSearch, (page - 1) * 24))
    } else if (currentCategory) {
      dispatch(getSpecificCollections(currentCategory, (page - 1) * 24))
    } else {
      dispatch(getCollections((page - 1) * 24))
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className={collectionsPageContainer}>
      {isLoadingCollectionsMsg && <Loading></Loading>}
      <div
        className="collection__banner"
        style={{ backgroundImage: `url(${image210006})` }}
      >
        <h1>THE COLLECTION</h1>

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
          {(currentSearch || currentCategory) && collections.length !== 0 && (
            <h1>Results for "{currentSearch || currentCategory}"</h1>
          )}

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
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      >
        <i className="fas fa-angle-up"></i>
      </button>

      <Cart />
    </div>
  )
}
