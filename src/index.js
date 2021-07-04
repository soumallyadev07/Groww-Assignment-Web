import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/Groww-Assignment-Web">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

