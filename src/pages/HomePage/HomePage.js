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
      background-image: url('https://www.chinaoilpaintinggallery.com/image/oilpainting/claude-monet/camille-monet-at-the-window-argentuil.jpg');
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
          padding: 5px 0;
          font-weight: 500;
          color: white;
          font-size: 38px;
          background: rgba(0, 0, 0, 0.6);
          position: absolute;
          width: 100%;
          top: 92%;
          left: 50%;
          transform: translate(-50%, -50%);
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
          preload
          controls
        ></video>
      </div>

      <div className="contents-container">
        <div className="contents">
          <a href="./#/collections" className="contents__tag">
            <div className="content__card">
              <img
                className="content__photo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg/1024px-A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg"
                alt="content"
              />
              <div className="content__mask">search collections.</div>
            </div>
          </a>

          <a href="./#/shop?type=tickets" class="contents__tag">
            <div class="content__card">
              <img
                class="content__photo"
                src="http://diz36nn4q02zr.cloudfront.net/webapi/imagesV3/Original/SalePage/5992729/0/637630960939200000?v=1"
                alt="item"
              />
              <div class="content__mask">buy exhibition tickets.</div>
            </div>
          </a>

          <a href="./#/shop" class="contents__tag">
            <div class="content__card">
              <img
                class="content__photo"
                src="https://live.staticflickr.com/1567/23650403730_3b766eec9f_b.jpg"
                alt="content"
              />
              <div class="content__mask">shop online store.</div>
            </div>
          </a>

          <a href="./#/about" className="contents__tag">
            <div className="content__card">
              <img
                className="content__photo"
                src="https://live.staticflickr.com/1910/45456642921_b878d0fa2a_b.jpg"
                alt="content"
              />
              <div className="content__mask">about.</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
