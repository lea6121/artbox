import { css } from '@emotion/css'

const footer = css`
  .footer {
    width: 100vw;
    bottom: 0;
    margin: 0 auto;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 26px 0;
    letter-spacing: 0.05rem;

    &__content {
      margin: 0 auto;
      font-size: 18px;
      padding: 20px 30px 40px;
      display: flex;
      justify-content: space-evenly;
      font-family: 'Gill Sans';
      font-weight: 300;
      align-items: center;

      a {
        color: white;
        text-decoration: none;
        &:hover {
          color: white;
        }
      }

      ul {
        list-style: none;
        margin: 0;

        li {
          padding: 10px;
        }
      }

      nav img {
        width: 25px;
      }
    }

    &__copyright {
      border-top: 1px solid white;
      padding-top: 20px;
      text-align: center;
      font-size: 14px;
      font-family: Georgia, 'Times New Roman', Times, serif;
      font-style: italic;
    }
  }
`
export default function Footer() {
  return (
    <>
      <footer className={footer}>
        <div className="footer">
          <div className="footer__content">
            <ul>
              <a href="./#/about">
                <li>About Us</li>
              </a>
              <a href="./">
                <li>Contact</li>
              </a>
              <a href="./">
                <li>FAQ</li>
              </a>
            </ul>
            <ul>
              <a href="./">
                <li>Shipping & Returns</li>
              </a>
              <a href="./">
                <li>Store Policy</li>
              </a>
              <a href="./">
                <li>Payment Methods</li>
              </a>
            </ul>

            <ul>
              <li>Tuesday to Sunday: 10:00 a.m.–5:00 p.m.</li>
              <li>Closed Monday</li>
              <li>11150 East Boulevard Cleveland, Ohio 44106</li>
              <li>216-421-7350 888-CMA-0033</li>
            </ul>

            <nav>
              <a href="./">
                <img
                  src="https://static.wixstatic.com/media/81af6121f84c41a5b4391d7d37fce12a.png/v1/fill/w_52,h_52,al_c,q_85,usm_0.66_1.00_0.01/81af6121f84c41a5b4391d7d37fce12a.webp"
                  alt="contact"
                />
              </a>
              <a href="./">
                <img
                  src="https://static.wixstatic.com/media/23fd2a2be53141ed810f4d3dcdcd01fa.png/v1/fill/w_52,h_52,al_c,q_85,usm_0.66_1.00_0.01/23fd2a2be53141ed810f4d3dcdcd01fa.webp"
                  alt="contact"
                />
              </a>
              <a href="./">
                <img
                  src="https://static.wixstatic.com/media/203dcdc2ac8b48de89313f90d2a4cda1.png/v1/fill/w_40,h_40,al_c,q_85,usm_0.66_1.00_0.01/203dcdc2ac8b48de89313f90d2a4cda1.webp"
                  alt="contact"
                />
              </a>
              <a href="./">
                <img
                  src="https://static.wixstatic.com/media/01ab6619093f45388d66736ec22e5885.png/v1/fill/w_40,h_40,al_c,q_85,usm_0.66_1.00_0.01/01ab6619093f45388d66736ec22e5885.webp"
                  alt="contact"
                />
              </a>
              <a href="./">
                <img
                  src="https://static.wixstatic.com/media/9c486556465843c5850fabfd68dfae49.png/v1/fill/w_40,h_40,al_c,q_85,usm_0.66_1.00_0.01/9c486556465843c5850fabfd68dfae49.webp"
                  alt="contact"
                />
              </a>
            </nav>
          </div>
          <div className="footer__copyright">
            The website is only for amateur project and not for commercial use.
            © 2021 By ArtBox
          </div>
        </div>
      </footer>
    </>
  )
}
