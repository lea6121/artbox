import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import SimpleReactLightbox from 'simple-react-lightbox'
// import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import store from './redux/store'

const theme = {
  colors: {
    primary_300: '#3333dd',
    primary_400: '#e33e3e',
    primary_500: '#af0505'
  }
}

ReactDOM.render(
  <Provider store={store}>
    <SimpleReactLightbox>
      {/* <ThemeProvider theme={theme}> */}
      <App />
    </SimpleReactLightbox>
    {/* </ThemeProvider> */}
  </Provider>,
  document.getElementById('root')
)
