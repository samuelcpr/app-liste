import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../modules/form/form";
import "./atualize.css"

const LoadProductDataForEdit = ({ products, deleteProduct, editProduct }) => {
  const [editProductId, setEditProductId] = useState(null);
  const [editedProductName, setEditedProductName] = useState("");
  const [editedProductPrice, setEditedProductPrice] = useState("");
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
    setEditedProductPrice("");
    setEditedProductType("");
  };

  const saveEditedProduct = async () => {
    try {
      const editedProduct = {
        name: editedProductName,
        price: editedProductPrice,
        type: editedProductType
      };

      const updatedDoc = doc(firestore, "products", editProductId);
      await updateDoc(updatedDoc, editedProduct);
      console.log("Produto atualizado com sucesso!");

      cancelEditProduct();
    } catch (error) {
      console.error("Erro ao atualizar o produto:", error);
    }
  };

  return (
    <div className="result">
      {products && products.map((product) => (
        <li key={product.id} id="itemMain">
          {/* <a id="item">{product.id}</a> */}
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
                onChange={(e) => setEditedProductPrice(e.target.value)}
              />
              <input
              id="itemx"
                type="text"
                value={editedProductType}
                onChange={(e) => setEditedProductType(e.target.value)}
              />
              <div className="containerBut" >
              <button onClick={saveEditedProduct} id="itemx1">Salvar</button>
              <button onClick={cancelEditProduct} id="itemx2">Cancelar</button>
              </div>
            </>
          ) : (
            <>
              <a id="item2">{product.name}</a>
              <a id="item2">{product.price}</a>
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
