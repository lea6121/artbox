import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import SimpleReactLightbox from 'simple-react-lightbox'
import { Provider } from 'react-redux'
import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <SimpleReactLightbox>
      <App />
    </SimpleReactLightbox>
  </Provider>,
  document.getElementById('root')
)
