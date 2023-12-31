import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../modules/form/form";
import "./atualize.css";
import CurrencyFormat from "react-currency-format";

const LoadProductDataForEdit = ({ products, deleteProduct, editProduct }) => {
  const [editProductId, setEditProductId] = useState(null);
  const [editedProductName, setEditedProductName] = useState("");
  const [editedProductPrice, setEditedProductPrice] = useState("00,00");
  const [editedProductType, setEditedProductType] = useState("");

  const handleEditProduct = (product) => {
    setEditProductId(product.id);
    setEditedProductName(product.name);
    setEditedProductPrice(product.price);
    setEditedProductType(product.type);
  };

  const cancelEditProduct = () => {
    setEditProductId(null);
    setEditedProductName("");
    setEditedProductPrice("00,00");
    setEditedProductType("");
  };

  const saveEditedProduct = async () => {
    try {
      const editedProduct = {
        name: editedProductName,
        price: editedProductPrice,
        type: editedProductType,
      };

      const updatedDoc = doc(firestore, "products", editProductId);
      await updateDoc(updatedDoc, editedProduct);
      console.log("Produto atualizado com sucesso!");

      cancelEditProduct();
    } catch (error) {
      console.error("Erro ao atualizar o produto:", error);
    }
  };

  const formatPrice = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    const decimalPart = numericValue.slice(-2);
    const integerPart = numericValue.slice(0, -2);
    const reversedIntegerPart = integerPart.split("").reverse().join("");
    const formattedValue =
      reversedIntegerPart
        .replace(/(\d{3})/g, "$1.")
        .split("")
        .reverse()
        .join("") +
      "," +
      decimalPart;
    return formattedValue || "0,00 R$";
  };

  const handlePriceInput = (value) => {
    const formattedPrice = formatPrice(value || "0");
    setEditedProductPrice(formattedPrice);
  };

  return (
    <div className="result">
      <div className="Descricao">
        <h3 id="price1">Nome</h3>
        <h3 id="price2">Preço</h3>
        <h3 id="price3">Tipo</h3>
      </div>
      {products &&
        products.map((product) => (
          <li key={product.id} id="itemMain">
            {editProductId === product.id ? (
              <>
                <input
                  id="itemx"
                  type="text"
                  value={editedProductName}
                  onChange={(e) => setEditedProductName(e.target.value)}
                />
                <input
                  id="itemx"
                  type="text"
                  value={editedProductPrice}
                  placeholder="00,00 R$"
                  onChange={(e) => handlePriceInput(e.target.value)}
                />

                <input
                  id="itemx"
                  type="text"
                  value={editedProductType}
                  onChange={(e) => setEditedProductType(e.target.value)}
                />
                <div className="containerBut">
                  <button onClick={saveEditedProduct} id="itemx1">
                    Salvar
                  </button>
                  <button onClick={cancelEditProduct} id="itemx2">
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <a id="item2">{product.name}</a>
                <CurrencyFormat
                  id="item2"
                  value={product.price}
                  displayType="text"
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="R$"
                  renderText={(formattedValue) => <a id="item2" className="price-item">{formattedValue}</a>}
                />
                <a id="item3">{product.type}</a>
                <div className="excluirMain">
                  <button onClick={() => deleteProduct(product.id)} id="excluir">
                    Excluir
                  </button>
                  <button onClick={() => handleEditProduct(product)} id="editar">
                    Editar
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
    </div>
  );
};

export default LoadProductDataForEdit;
