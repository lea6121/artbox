import { css } from '@emotion/css'
import trailer from '../../media/trailer.mp4'

const homePageContainer = css`
  box-sizing: border-box;
  letter-spacing: 0.1rem;

  .banner {
    margin-top: 5px;
    margin-bottom: 50px;
    display: grid;
    grid-template-columns: 30% auto;
    grid-gap: 10px 5px;
    position: relative;
    max-width: 100vw;
    height: 100%;

    section {
      width: 100%;
      height: 100%;
      position: relative;
      background-image: url('https://github.com/lea6121/img-storage/blob/main/image/210001.jpeg?raw=true');
      background-repeat: repeat-x;
      background-size: contain;
      background-position: left;
      background-attachment: fixed;
      text-align: center;
      font-family: 'Arial Black';
      transition: all 0.8s ease-out;

      &:hover {
        transform: scale(1.02);
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

      h3 {
        font-size: 34px;
        padding: 70px 0 40px 0;
      }

      h1 {
        font-size: 43px;
        color: rgb(16, 150, 132);

        &:hover {
          text-decoration: underline;
        }
      }

      p {
        font-size: 20px;
        margin: 30px auto;
      }
    }

    video {
      width: 100%;
      height: 100%;
      /* transition: all 0.4s ease-in; */
      cursor: pointer;
    }
  }

  .contents-container {
    width: 100vw;
    margin: 0;

    .contents {
      margin: 30px auto 50px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px 5px;
      font-family: Georgia, 'Times New Roman', Times, serif;
      max-width: 98vw;
      font-style: italic;
      font-size: 24px;

      &__tag {
        text-align: center;
        overflow: hidden;
      }

      .content {
        &__card {
          position: relative;
          height: 400px;
        }

        &__photo {
          width: 100%;
          object-fit: contain;
          overflow: hidden;
          transform: scale(1, 1);
          transition: all 0.4s ease-out;
          &:hover {
            transform: scale(1.2, 1.2);
          }
        }

        &__mask {
          padding: 8px 0;
          font-weight: 500;
          color: white;
          font-size: 36px;
          background: rgba(0, 0, 0, 0.6);
          position: absolute;
          width: 100%;
          top: 92%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        &__cover {
          position: absolute;
          font-size: 38px;
          width: 100%;
          height: 100%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: transparent;
          transition: all 0.4s ease-out;

          h1 {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 60px;
            font-family: 'Snell Roundhand';
            font-weight: 700;
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
          preload="true"
          controls
        ></video>
      </div>

      <div className="contents-container">
        <div className="contents">
          <a href="./#/collections" className="contents__tag">
            <div className="content__card">
              <img
                className="content__photo"
                src="https://github.com/lea6121/img-storage/blob/main/image/210002.jpeg?raw=true"
                alt="content"
              />
              <div className="content__mask">search collections.</div>
            </div>
          </a>
          <a href="./#/about" className="contents__tag">
            <div className="content__card">
              <img
                className="content__photo"
                src="https://github.com/lea6121/img-storage/blob/main/image/210003.jpeg?raw=true"
                alt="content"
              />
              <div className="content__mask">about.</div>
            </div>
          </a>
          <a href="./#/shop" className="contents__tag">
            <div className="content__card">
              <img
                className="content__photo"
                src="https://github.com/lea6121/img-storage/blob/main/image/210004.jpeg?raw=true"
                alt="item"
              />
              <div className="content__mask">shop online store.</div>
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
                src="https://github.com/lea6121/img-storage/blob/main/image/210005.jpeg?raw=true"
                alt="content"
              />
              <div className="content__cover">
                <h1>Coming Soon</h1>
              </div>
              <div className="content__mask">visit online exhibition.</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
