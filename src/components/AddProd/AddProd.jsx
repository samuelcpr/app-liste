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

 
  
  

  return (
    <div className="container">
      <h1>Adicionar produtos</h1>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label>Nome:</label>
          <input type="text" value={name}  onChange={handleNameChange} />
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
