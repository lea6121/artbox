import { css } from '@emotion/css'

const loading = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 1);
  width: 100vw;
  height: 100%;
  z-index: 2;
  background-image: url('https://2.bp.blogspot.com/-UFDt9YzEa5I/Vg6tACoYYLI/AAAAAAAAGZc/zpeRoLh3iUI/s1600/all%2Bsides.gif');
  background-position: 50% 50%;
  background-size: 160px;
  background-repeat: no-repeat;
`

export default function Loading() {
  return <div className={loading}></div>
}
