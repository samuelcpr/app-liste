import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import App from './modules/form/form';
import Header from './modules/header/Header';
import Footer from './modules/footer/footer';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Header/>
    <App/>
    <Footer/>

  </React.StrictMode>
);


reportWebVitals();
