import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AuthContext from './contexts/AuthContext.jsx'
import DataContext from './contexts/DataContext.jsx'
import { BrowserRouter } from 'react-router-dom';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContext>
      <DataContext>
        <App />
      </DataContext>
    </AuthContext>
    </BrowserRouter>
  </React.StrictMode>
)
