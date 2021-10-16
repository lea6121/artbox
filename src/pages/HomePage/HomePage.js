import { css } from '@emotion/css'
import trailer from '../../assets/trailer.mp4'
import image210001 from '../../assets/210001.jpeg'
import image210002 from '../../assets/210002.jpeg'
import image210003 from '../../assets/210003.jpeg'
import image210004 from '../../assets/210004.jpeg'
import image210005 from '../../assets/210005.jpeg'
import image210012 from '../../assets/210012.jpeg'

const homePageContainer = css`
  box-sizing: border-box;
  letter-spacing: 0.1rem;
  margin: 0 auto;
  font-family: serif;

  .banner {
    margin-top: 5px;
    margin-bottom: 50px;
    display: grid;
    grid-template-columns: 30% auto;
    grid-gap: 10px 5px;
    position: relative;
    max-width: 100vw;
    height: 100%;

    @media only screen and (max-width: 1408px) {
      display: block;
    }

    section {
      width: 100%;
      height: 100%;
      position: relative;
      background-repeat: repeat-x;
      background-size: contain;
      background-position: left;
      background-attachment: fixed;
      text-align: center;
      font-family: 'Arial Black';
      transition: all 0.8s ease-out;
      overflow: hidden;

      &:hover {
        transform: scale(1.02);
      }

      @media only screen and (max-width: 1408px) {
        display: block;
        margin-bottom: 5px;
      }
    }

    &__mask {
      z-index: 1;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      background: rgba(255, 255, 255, 0.55);
      padding: 40px;
      margin: 0 auto;
      text-align: center;

      @media only screen and (max-width: 1408px) {
        padding: 20px;
        position: static;
        max-height: 300px;
      }

      h3 {
        font-size: 32px;
        padding: 40px 0 40px 0;
        position: absolute;
        top: 35%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 70%;

        @media only screen and (max-width: 1408px) {
          position: static;
          top: 0%;
          left: 0%;
          transform: translate(-0%, -0%);
          font-size: 22px;
          padding: 20px 0 10px 0;
          width: 100%;
        }
      }

      h1 {
        width: 100%;
        position: absolute;
        top: 48%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 40px;
        color: rgb(16, 150, 132);
        @media only screen and (max-width: 1408px) {
          position: static;
          top: 0%;
          left: 0%;
          transform: translate(-0%, -0%);
          text-align: center;
          font-size: 30px;
          padding-bottom: 10px;
        }
      }

      p {
        font-size: 20px;
        width: 70%;
        position: absolute;
        top: 65%;
        left: 50%;
        transform: translate(-50%, -50%);
        @media only screen and (max-width: 1408px) {
          position: static;
          top: 0%;
          left: 0%;
          transform: translate(-0%, -0%);
          font-size: 15px;
          width: 100%;
        }
      }
    }

    video {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }

  .contents-container {
    margin: 0;

    .contents {
      margin: 30px auto 50px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px 5px;
      max-width: 98vw;
      font-size: 24px;

      @media only screen and (max-width: 959px) {
        display: block;
      }

      &__tag {
        text-align: center;
        overflow: hidden;
      }

      .content {
        @media only screen and (max-width: 959px) {
          margin: 10px;
        }

        &__card {
          position: relative;
          height: 400px;

          @media only screen and (min-width: 768px) and (max-width: 959px) {
            max-height: 600px;
            transition: all 0.8s ease-out;

            &:hover {
              transform: scale(1.02);
            }
          }

          @media only screen and (min-width: 576px) and (max-width: 768px) {
            max-height: 700px;
            transition: all 0.8s ease-out;

            &:hover {
              transform: scale(1.02);
            }
          }

          @media only screen and (max-width: 576px) {
            max-height: 260px;
            transition: all 0.8s ease-out;

            &:hover {
              transform: scale(1.02);
            }
          }
        }

        &__photo {
          width: 100%;
          object-fit: contain;
          overflow: hidden;
          transform: scale(1, 1);
          transition: all 0.4s ease-out;

          @media only screen and (max-width: 959px) {
            max-height: 100%;
            object-fit: cover;
          }

          &:hover {
            transform: scale(1.2, 1.2);

            @media only screen and (max-width: 959px) {
              transform: scale(1, 1);
            }
          }
        }

        &__mask {
          position: absolute;
          bottom: 0;
          width: 100%;
          padding: 8px 0;
          font-weight: 500;
          color: white;
          font-size: 36px;
          background: rgba(0, 0, 0, 1);

          @media only screen and (max-width: 768px) {
            font-size: 20px;
            height: 50px;
            top: 80%;
          }
        }

        &__cover {
          position: absolute;
          top: 0%;
          font-size: 38px;
          width: 100%;
          height: 100%;
          transition: all 0.4s ease-out;
          color: transparent;

          h1 {
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 54px;
            font-family: 'Snell Roundhand';
            font-weight: 700;
            transition: all 0.4s ease-out;

            @media only screen and (max-width: 768px) {
              font-size: 40px;
            }

            &:hover {
              color: black;
            }
          }

          &:hover {
            background: rgba(255, 255, 255, 0.4);
            color: black;
          }
        }
      }
    }
  }
`
export default function HomePage() {
  return (
    <div className={homePageContainer}>
      <div className="banner">
        <section style={{ backgroundImage: `url(${image210001})` }}>
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
          poster={image210012}
          preload="true"
          controls
        ></video>
      </div>

      <div className="contents-container">
        <div className="contents">
          <a href="./#/collections/1" className="contents__tag">
            <div className="content__card">
              <img
                className="content__photo"
                src={image210002}
                alt="Search collections."
              />
              <div className="content__mask">Search collections.</div>
            </div>
          </a>
          <a href="./#/about" className="contents__tag">
            <div className="content__card">
              <img className="content__photo" src={image210003} alt="About." />
              <div className="content__mask">About.</div>
            </div>
          </a>
          <a href="./#/shop" className="contents__tag">
            <div className="content__card">
              <img
                className="content__photo"
                src={image210004}
                alt="Shop online store."
              />
              <div className="content__mask">Shop online store.</div>
            </div>
          </a>
          <a
            href="javascript:void(0)"
            style={{ cursor: 'default' }}
            className="contents__tag"
          >
            <div className="content__card">
              <img
                className="content__photo"
                src={image210005}
                alt="Visit online exhibition."
              />
              <div className="content__cover">
                <h1>Coming Soon</h1>
              </div>
              <div className="content__mask">Visit online exhibition.</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
