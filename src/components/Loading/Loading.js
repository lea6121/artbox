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
  background-image: url('https://firebasestorage.googleapis.com/v0/b/artbox-b25a6.appspot.com/o/products_images%2F210000.gif?alt=media&token=3fc61fc1-7685-4a4c-ad27-8eeac3aff9dd');
  background-position: 50% 50%;
  background-size: 160px;
  background-repeat: no-repeat;
`

export default function Loading() {
  return <div className={loading}></div>
}
