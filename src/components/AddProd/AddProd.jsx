import React, { useState } from "react";
import CurrencyInputField from "react-currency-input-field";
import "../../modules/form/style.css";

const ProductForm = ({ addProduct }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePriceChange = (value) => {
    const formattedPrice = formatPrice(value || "0");
    setPrice(formattedPrice);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addProduct({ name, price, type });
    setName("");
    setPrice("");
    setType("");
  };

  const formatPrice = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    const decimalPart = numericValue.slice(-2);
    const integerPart = numericValue.slice(0, -2);
    const reversedIntegerPart = integerPart.split("").reverse().join("");
    const formattedValue = reversedIntegerPart.replace(/(\d{3})/g, "$1.").split("").reverse().join("") + "," + decimalPart;
    return formattedValue || "0,00 R$";
  };
  

  const handlePriceInput = (value) => {
    const formattedPrice = formatPrice(value || "0");
    setPrice(formattedPrice);
  };

  // Função de máscara de preço
  function moeda(a, e, r, t) {
    let n = "";
    let h = 0;
    let u = 0;
    let l = "";
    let o = window.Event ? t.which : t.keyCode;
    if (13 === o || 8 === o) {
      return true;
    }
    if (n = String.fromCharCode(o), -1 === "0123456789".indexOf(n)) {
      return false;
    }
    for (u = a.value.length, h = 0; h < u && ("0" === a.value.charAt(h) || a.value.charAt(h) === r); h++);
    for (l = ""; h < u; h++) {
      if (-1 !== "0123456789".indexOf(a.value.charAt(h))) {
        l += a.value.charAt(h);
      }
    }
    if (l += n, 0 === (u = l.length) && (a.value = ""), 1 === u && (a.value = "0" + r + "0" + l), 2 === u && (a.value = "0" + r + l), u > 2) {
      let ajd2 = "";
      let j = 0;
      for (let h = u - 3; h >= 0; h--) {
        if (3 === j) {
          ajd2 += e;
          j = 0;
        }
        ajd2 += l.charAt(h);
        j++;
      }
      a.value = "";
      const tamanho2 = ajd2.length;
      for (let h = tamanho2 - 1; h >= 0; h--) {
        a.value += ajd2.charAt(h);
      }
      a.value += r + l.substr(u - 2, u);
    }
    return false;
  }

  
 
  

  return (
    <div className="container">
      <h1>Adicionar produtos</h1>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label>Nome:</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div className="input">
          <label>Preço:</label>
          <input type="text" value={price} placeholder="00,00 R$" onChange={(e) => handlePriceInput(e.target.value)} />
        </div>
        <div className="input">
          <label>Tipo:</label>
          <input id="input3" type="text" value={type} onChange={handleTypeChange} />
        </div>
        <div className="input">
          <button type="submit">Adicionar Produto</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
