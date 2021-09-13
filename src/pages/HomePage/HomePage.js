import React from 'react'
import trailer from '../../media/trailer.mp4'
import { Loading } from '../../components/App/App'
import { useSelector } from 'react-redux'
import './homePage.css'

export default function HomePage() {
  return (
    <>
      {/* {<Loading></Loading>} */}
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
          <a href="./#/collections" className="contents-tag">
            <div className="content__card">
              <img
                className="content__photo"
                src="https://www.clevelandart.org/sites/default/files/styles/takeover_highlight_secondary/public/1926-1976_SH.jpeg?itok=lF6917iu"
                alt="content"
              />
              <div className="content-mask__text">search collections.</div>
            </div>
          </a>

          <a href="./#/shop?type=tickets" class="contents-tag">
            <div class="content__card">
              <img
                class="content__photo"
                src="https://www.clevelandart.org/sites/default/files/styles/takeover_highlight_secondary/public/nabi_bonnard_sh_0.jpg?itok=Fk0yWnAW"
                alt="item"
              />
              <div class="content-mask">
                <div class="content-mask__text">buy exhibition tickets.</div>
              </div>
            </div>
          </a>

          <a href="./#/shop" class="contents-tag">
            <div class="content__card">
              <img
                class="content__photo"
                src="https://www.clevelandart.org/sites/default/files/styles/takeover_highlight_secondary/public/Become%20a%20member_homepage_4MP_0.JPG?itok=tNj3wtZ8"
                alt="content"
              />
              <div class="content-mask">
                <div class="content-mask__text">shop online store.</div>
              </div>
            </div>
          </a>
          <a href="./#/about" className="contents-tag">
            <div className="content__card">
              <img
                className="content__photo"
                src="https://p7.itc.cn/q_70/images03/20210207/3038f3cc2f204016805217e98db937da.jpeg"
                alt="content"
              />
              <div className="content-mask">
                <div className="content-mask__text">about.</div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  )
}
