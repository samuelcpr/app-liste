import React from "react";
import logo from '../../img/icons8-foguete.png';
import './footer.css';

function Footer() {
  return (
    <div className="App">
      <header className="App-footer">
        <img src={logo} alt="" />
        <p>
          Feito por samuel-carlos ©
        </p>
      </header>
    </div>
  );
}

export default Footer;
