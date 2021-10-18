import { css } from '@emotion/css'
import { SRLWrapper } from 'simple-react-lightbox'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getArtwork } from '../../redux/reducers/collectionReducer'
import Cart from '../../components/Cart'
import Loading from '../../components/Loading'

const artworkPageContainer = css`
  position: relative;
  height: auto;
  font-family: Serif;
  background: rgba(0, 0, 0, 1);
  position: relative;
  font-size: 20px;
  padding: 30px;
`

const artworkContainer = css`
  margin: 0 auto;
  width: 100%;
  max-width: 1180px;
  padding: 50px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 3px;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 0px 40px;
  overflow: hidden;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 1216px) {
    display: block;
    max-width: 900px;
    padding: 20px;
  }

  img {
    display: block;
    margin: 0 auto;
    max-height: 700px;
    max-width: 100%;
    object-fit: contain;
    overflow: hidden;
    transform: scale(1, 1);
    transition: all 0.4s ease-out;
    cursor: pointer;

    &:hover {
      transform: scale(1.01, 1.01);
    }

    @media only screen and (max-width: 1216px) {
      display: block;
      margin: 0 auto;
      max-width: 100%;
      max-height: 100%;
    }
  }

  .artwork {
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    letter-spacing: 0.03rem;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-size: 20px;

    @media only screen and (max-width: 1216px) {
      margin-top: 20px;
      padding: 0 0 30px;
      height: auto;
      margin: 0;
    }

    a {
      font-size: 16px;
      display: inline-block;
      text-align: left;
      margin-bottom: 20px;
    }

    button {
      border: none;
      background: transparent;
      padding: 0;
    }

    p {
      margin: 0 0;
      color: rgba(0, 0, 0, 0.7);
    }

    &__title {
      font-size: 28px;
      padding: 5px 0;
      font-weight: 700;

      @media only screen and (max-width: 1216px) {
        margin-top: 20px;
        font-size: 22px;
      }
    }

    &__culture {
      padding: 10px 0;
      font-weight: 700;
      font-size: 20px;
    }

    &__description {
      &__title {
        padding: 10px 0;
        display: flex;
        font-size: 20px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.6);
        font-weight: 700;
      }

      &__content {
        font-family: 'Gill Sans';
        font-weight: 200;
        padding: 10px 0;
        font-size: 18px;
      }
    }

    &__tombstone {
      &__title {
        padding: 10px 0;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.6);
        font-weight: 700;
      }

      &__content {
        padding: 10px 0;
        font-size: 14px;
        overflow-y: auto;
        max-height: 200px;
        font-style: italic;
        font-weight: 300;
      }
    }
  }
`

export default function CollectionPage() {
  const dispatch = useDispatch()
  const params = useParams()
  const artwork = useSelector((store) => store.collections.artwork)
  const isLoadingCollectionsMsg = useSelector(
    (store) => store.collections.isLoadingCollections
  )

  useEffect(() => {
    dispatch(getArtwork(params.id))
  }, [params.id, dispatch])

  window.scrollTo(0, 0)

  return (
    <div className={artworkPageContainer}>
      {isLoadingCollectionsMsg && <Loading></Loading>}
      <div className="artwork-cover">
        <div className={artworkContainer}>
          <div className="artwork-image">
            {artwork.images ? (
              <SRLWrapper>
                <img src={artwork.images.web.url} alt={artwork.title} />
              </SRLWrapper>
            ) : (
              <img
                src="https://github.com/lea6121/img-storage/blob/main/image/210011.jpeg?raw=true"
                alt={artwork.title}
              />
            )}
          </div>
          <div className="artwork">
            <h1 className="artwork__title">{artwork.title}</h1>

            <div className="artwork__culture">
              <p>Culture - {artwork.culture}</p>
            </div>

            {artwork.wall_description && (
              <div className="artwork__description">
                <div className="artwork__description__title">
                  <p>Description</p>
                </div>
                <div className="artwork__description__content">
                  {window.HTMLReactParser(artwork.wall_description)}
                </div>
              </div>
            )}
            <div className="artwork__tombstone">
              <div className="artwork__tombstone__title">
                <p>Citation</p>
              </div>
              <p className="artwork__tombstone__content">{artwork.tombstone}</p>
            </div>
          </div>
        </div>
        <Cart />
      </div>
    </div>
  )
}
