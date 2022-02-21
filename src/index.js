import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Routes ,Route, BrowserRouter as Router } from 'react-router-dom';

import Search from './Pages/Search';
import Coin from './Pages/Coin';
import Nav from './Components/Nav';

import './CSS/Nav.css';
import './CSS/Coin.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/search/" element={<Search/>} />
        <Route path="/coin/:slug" element={<Coin/>} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
