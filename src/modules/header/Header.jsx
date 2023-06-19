import React from "react";
import logo from '../../img/online store.png';
import './style.css';

function Header() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <a
          className="App-link"
          href="https://github.com/samuelcpr/app-liste"
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
