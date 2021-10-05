import { css } from '@emotion/css'

const aboutPageContainer = css`
  font-family: 'Gill Sans';

  .about {
    margin: 0px auto;
    background: rgba(0, 0, 0, 0.9);
    padding-bottom: 40px;

    h1 {
      margin: 70px 0;
      color: white;
      text-align: center;
      font-size: 50px;
      font-weight: 300;
      @media only screen and (min-width: 576px) and (max-width: 1200px) {
        padding: 0 20px;
        margin: 50px 0;
      }
      @media only screen and (max-width: 576px) {
        padding: 0 20px;
        font-size: 38px;
        margin: 50px 0;
      }
    }

    > div {
      margin: 0 auto;
    }
  }

  .about-profile__pic {
    margin: 0 auto;
    img {
      display: block;
      width: 100%;
      object-fit: contain;
    }
  }

  .about-profile__info {
    font-weight: 300;
    font-size: 22px;
    margin: 0 auto;
    padding-bottom: 100px;
    line-height: 3rem;
    color: white;
    max-width: 1080px;
    font-family: 'Gill Sans';

    @media only screen and (max-width: 1200px) {
      padding: 0 20px;
    }

    ul {
      padding-left: 1rem;
      margin: 0;

      @media only screen and (max-width: 576px) {
        font-size: 18px;
      }

      li {
        font-size: 28px;
        margin: 10px;
        font-weight: 300;

        @media only screen and (max-width: 576px) {
          font-size: 22px;
        }
      }
    }
  }
`

export default function AboutPage() {
  window.scrollTo(0, 0)

  return (
    <div className={aboutPageContainer}>
      <div className="about">
        <div>
          <div className="about-profile__pic">
            <img src="https://media.nbcchicago.com/2021/06/GettyImages-157189989.jpg?quality=85&strip=all&resize=1200%2C675" />
          </div>
          <h1>ABOUT US</h1>

          <div className="about-profile__info">
            <ul>
              <li>Our Mission </li>
              To create transformative experiences through art, “for the benefit
              of all the people forever.”
            </ul>
            <ul>
              <li>Our Vision </li>
              To be a global leader among museums.
            </ul>
            <ul>
              <li>Our Values </li>
              Offers dynamic experiences that illuminate the power and enduring
              relevance of art in today’s global society. The museum builds,
              preserves, studies, and shares its outstanding collections of art
              from all periods and parts of the world, generating new
              scholarship and understanding, while serving as a social and
              intellectual hub for its community.
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
