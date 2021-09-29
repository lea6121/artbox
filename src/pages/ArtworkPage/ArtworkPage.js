import { css } from '@emotion/css'
import { SRLWrapper } from 'simple-react-lightbox'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getArtwork } from '../../redux/reducers/collectionReducer'
import Cart from '../../components/Cart'
import Loading from '../../components/Loading'

const artworkPageContainer = css`
  width: 100vw;
  height: 1000px;
  font-family: Serif;
  background-image: url('https://firebasestorage.googleapis.com/v0/b/artbox-b25a6.appspot.com/o/products_images%2F210007.webp?alt=media&token=f8701af1-d542-4804-945d-f64171d245ce');
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  font-size: 20px;
`

const artworkContainer = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 1280px;
  padding: 10px 30px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 3px;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 0px 0px;
  overflow: hidden;
  align-items: center;
  justify-content: center;

  img {
    ${'' /* border: 1px solid white; */}
    max-height: 700px;
    width: 600px;
    object-fit: contain;
    overflow: hidden;
    transform: scale(1, 1);
    transition: all 0.4s ease-out;
    cursor: pointer;
    &:hover {
      transform: scale(1.01, 1.01);
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
    font-size: 18px;

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
    }

    &__title {
      font-size: 34px;
      padding: 20px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.6);
      margin-top: 50px;
    }

    &__creation-date,
    &__culture {
      padding: 10px 0;
    }

    &__description {
      &__title {
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.6);
      }

      &__content {
        overflow-y: auto;
        max-height: 200px;
        padding: 10px 0;
      }
    }

    &__creator {
      &__title {
        padding: 10px 0;
        border-bottom: 1px solid grey;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      &__content {
        padding: 10px 0;
        font-size: 18px;
        overflow-y: auto;
        max-height: 200px;
      }
    }
  }
`

export default function CollectionPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const artwork = useSelector((store) => store.collections.artwork)
  const params = useParams()
  const isLoadingCollectionsMsg = useSelector(
    (store) => store.collections.isLoadingCollections
  )
  const [showCreator, setShowCreator] = useState(false)
  const onclickShowCreatorBtn = () =>
    showCreator ? setShowCreator(false) : setShowCreator(true)
  const [showDescription, setShowDescription] = useState(false)
  const onclickShowDescriptionBtn = () =>
    showDescription ? setShowDescription(false) : setShowDescription(true)

  useEffect(() => {
    dispatch(getArtwork(params.id))
    window.scrollTo(80, 80)
  }, [params.id, dispatch])

  const Creator = () => (
    <>
      {artwork.creators &&
        artwork.creators.map(
          (creator) =>
            creator.biography && (
              <div className="artwork__creator__content">
                {creator.biography}
              </div>
            )
        )}
    </>
  )

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
                src="https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg"
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
                    <p>Creator - {creator.description}</p>
                  ))
                ) : (
                  <p>Creator - {artwork.description}</p>
                )}

                {artwork.creators &&
                  artwork.creators.map(
                    (creator) =>
                      creator.biography && (
                        <button onClick={onclickShowCreatorBtn}>+</button>
                      )
                  )}
              </div>
              {showCreator ? <Creator /> : null}
            </div>

            {artwork.wall_description && (
              <div className="artwork__description">
                <div className="artwork__description__title">
                  <p>Description</p>
                  <button onClick={onclickShowDescriptionBtn}>+</button>
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
