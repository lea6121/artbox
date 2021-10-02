import { css } from '@emotion/css'
import { SRLWrapper } from 'simple-react-lightbox'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getArtwork } from '../../redux/reducers/collectionReducer'
import Cart from '../../components/Cart'
import Loading from '../../components/Loading'

const artworkPageContainer = css`
  position: relative;
  height: auto;
  font-family: Serif;
  background-image: url('https://raw.githubusercontent.com/lea6121/img-storage/main/image/210007.webp');
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  font-size: 20px;
  padding: 30px;
`

const artworkContainer = css`
  margin: 0 auto;
  width: 100%;
  max-width: 1180px;
  padding: 20px 40px 10px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 3px;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 0px 30px;
  overflow: hidden;
  align-items: top;
  justify-content: center;

  @media only screen and (max-width: 1216px) {
    display: block;
    max-width: 900px;
  }

  img {
    display: block;
    margin: 0 auto;
    max-height: 700px;
    max-width: 700px;
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
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    overflow-y: auto;
    height: 95vh;
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

    &__tombstone {
      padding: 10px 0;
      font-size: 14px;
      overflow-y: auto;
      max-height: 120px;
    }

    &__title {
      font-size: 34px;
      padding: 20px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.6);
      margin-top: 50px;
      font-weight: 700;
      @media only screen and (max-width: 1216px) {
        margin-top: 20px;
      }
    }

    &__creation-date,
    &__culture {
      padding: 10px 0;
      font-weight: 700;
    }

    &__description {
      &__title {
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.6);
        font-weight: 700;
      }

      &__content {
        overflow-y: auto;
        max-height: 200px;
        padding: 10px 0;
        font-size: 18px;
        font-style: italic;
      }
    }

    &__creator {
      &__title {
        padding: 10px 0;
        border-bottom: 1px solid grey;
        align-items: center;
        overflow-y: auto;
        max-height: 300px;
        font-weight: 700;

        div {
          div {
            display: flex;
            justify-content: space-between;
          }
        }
      }

      &__content {
        padding: 10px 0;
        font-size: 18px;
        overflow-y: auto;
        max-height: 200px;
        font-size: 16px;
        font-style: italic;
        font-weight: 300;
      }
    }
  }
`

export default function CollectionPage() {
  const dispatch = useDispatch()
  const artwork = useSelector((store) => store.collections.artwork)
  const params = useParams()
  const isLoadingCollectionsMsg = useSelector(
    (store) => store.collections.isLoadingCollections
  )
  const [showCreator, setShowCreator] = useState(false)
  const showCreatorBtn = () =>
    showCreator ? setShowCreator(false) : setShowCreator(true)
  const [showDescription, setShowDescription] = useState(false)
  const showDescriptionBtn = () =>
    showDescription ? setShowDescription(false) : setShowDescription(true)

  useEffect(() => {
    dispatch(getArtwork(params.id))
    window.scrollTo(80, 80)
  }, [params.id, dispatch])

  const Description = () => (
    <div className="artwork__description__content">
      {artwork.wall_description}
    </div>
  )

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

            <div className="artwork__tombstone">
              <p className="artwork__tombstone__content">{artwork.tombstone}</p>
            </div>
          </div>
          <div className="artwork">
            <h1 className="artwork__title">{artwork.title}</h1>
            {artwork.images && (
              <a href={artwork.images.print.url}>SHOW FULL IMAGE</a>
            )}

            <div className="artwork__creation-date">
              <p>Creation Date - {artwork.creation_date}</p>
            </div>

            <div className="artwork__culture">
              <p>Culture - {artwork.culture}</p>
            </div>
            <div className="artwork__creator">
              <div className="artwork__creator__title">
                {artwork.creators ? (
                  artwork.creators.map((creator) => (
                    <div>
                      <div>
                        <p>Creator - {creator.description}</p>
                        {creator.biography && (
                          <button onClick={showCreatorBtn}>+</button>
                        )}
                      </div>
                      {showCreator ? (
                        <div className="artwork__creator__content">
                          {creator.biography}
                        </div>
                      ) : null}
                    </div>
                  ))
                ) : (
                  <p>Creator - {artwork.description}</p>
                )}
              </div>
            </div>

            {artwork.wall_description && (
              <div className="artwork__description">
                <div className="artwork__description__title">
                  <p>Description</p>
                  <button onClick={showDescriptionBtn}>+</button>
                </div>
                {showDescription ? <Description /> : null}
              </div>
            )}
          </div>
        </div>
        <Cart />
      </div>
    </div>
  )
}
