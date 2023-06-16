import React from "react";
import logo from '../../logo.svg';
import './style.css';

function Header() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Projeto desenvolvido em react.js
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ler Mais
        </a>
      </header>
    </div>
  );
}

export default Header;
