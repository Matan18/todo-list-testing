import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ListManagerProvider } from './hook/ListManager'

ReactDOM.render(
  <React.StrictMode>
    <ListManagerProvider>
      <App />
    </ListManagerProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
