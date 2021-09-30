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
  background-image: url('https://github.com/lea6121/img-storage/blob/main/image/210000.gif?raw=true');
  background-position: 50% 50%;
  background-size: 160px;
  background-repeat: no-repeat;
`

export default function Loading() {
  return <div className={loading}></div>
}
