import { css } from '@emotion/css'

const aboutPageContainer = css`
  background-image: url('https://images.unsplash.com/photo-1529157366686-70612f8b5fc5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;

  .about {
    margin: 0px auto;
    background: rgba(0, 0, 0, 0.6);

    h1 {
      margin: 80px 0;
      color: white;
      text-align: center;
      font-size: 68px;
      font-family: serif;
      @media only screen and (min-width: 576px) and (max-width: 1200px) {
        padding: 0 20px;
        margin: 50px 0;
      }
      @media only screen and (max-width: 576px) {
        padding: 0 20px;
        font-size: 50px;
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
    font-family: 'Gill Sans';
    font-weight: 300;
    font-size: 22px;
    margin: 0 auto;
    padding-bottom: 40px;
    line-height: 3rem;
    color: white;
    max-width: 1080px;
    @media only screen and (max-width: 1200px) {
      padding: 0 20px;
    }

    h2 {
      font-size: 26px;
      font-weight: 600;
      margin-bottom: 20px;
      line-height: 3rem;
      @media only screen and (max-width: 576px) {
        font-size: 21px;
      }
    }

    ul {
      padding-left: 1rem;
      margin: 0;

      li {
        font-size: 28px;
        margin: 10px;
        font-weight: 300;
      }
    }
    p {
      list-style-type: disc;
      display: list-item;
      list-style-position: inside;
      font-size: 24px;
      margin: 10px;
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
            <h2>
              The ArtBox is devoted to art in every form, from architecture and
              fashion to graphics, product and industrial design.
            </h2>
            <ul>
              <li>Our Mission </li> To create inspiring encounters with art that
              expand the ways we see ourselves, the world and its possibilities.
            </ul>
            <ul>
              <li>Our Vision </li>
              Where great art and courageous conversations are catalysts for a
              more connected, civic, and empathetic world.
            </ul>
            <ul>
              <li>Our Values </li>
              <p>Great Art and Great Art Experiences</p>
              We hold ourselves to the highest standards of excellence in
              collections, exhibitions, programs, and visitor experience. Our
              work seeks to expand and challenge the traditional art historical
              canon by including multiple perspectives. We strive to create
              opportunities for transformative engagement with our collections
              through inspirational exhibitions, programs, and educational
              offerings, and to welcome all visitors with respect.
              <p>Many Histories and a Shared Future </p>
              We promote perspectives that expand the stories we tell and engage
              diverse audiences in conversations that broaden the way we see
              ourselves, the world and its possibilities. The Museum should be a
              place where people see themselves with dignity and each other with
              empathy, care, and respect. As a public, civic institution, we
              believe it is our mandate to contribute to the advancement of
              society with a commitment to true connectedness and diversity.
              Central to this belief is our commitment to exploring,
              understanding, and appreciating our differences, while
              acknowledging how structural inequities and systems of oppression
              impact our work.
              <p>Openness and Free Expression </p> We believe that the open and
              free exchange of ideas among people of diverse beliefs, cultures,
              and experiences stimulates new understandings, expands insights
              into our shared humanity, and promotes social generosity. We also
              recognize that differing views may sometimes be met with
              discomfort, dissent, and even conflict, and we embrace our public,
              civic role as an important conduit for open sharing and learning.
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
