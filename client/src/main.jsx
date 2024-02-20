import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@radix-ui/themes/styles.css';
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './redux/store.js'
import { Provider } from 'react-redux'
import ThemeProvider from './components/ThemeProvider.jsx'
import { Theme } from '@radix-ui/themes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
    <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <Theme>
          <App />
        </Theme>
      </ThemeProvider>
    </Provider>
    </BrowserRouter>
  </PersistGate> 
)