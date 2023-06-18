
import React, { useState, } from "react";
import "../../modules/form/style.css"


const ProductForm = ({ addProduct }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
  
    const handleNameChange = (event) => {
      setName(event.target.value);
    };
  
    const handlePriceChange = (event) => {
      setPrice(event.target.value);
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
            <input type="text" value={price} onChange={handlePriceChange} />
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