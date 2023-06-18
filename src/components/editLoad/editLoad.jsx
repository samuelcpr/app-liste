import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";
import FirebaseConfig from "../../server/Api/api";
import "../../modules/form/style.css"

const firebaseConfig = FirebaseConfig;

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const EditLoad = ({ products, deleteProduct, editProduct }) => {
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

      await updateDoc(doc(firestore, "products", editProductId), editedProduct);
      console.log("Produto atualizado com sucesso!");

      cancelEditProduct();
    } catch (error) {
      console.error("Erro ao atualizar o produto:", error);
    }
  };

  return (
    <div className="result">
      {products.map((product) => (
        <li key={product.id} id="itemMain">
          <a id="item">{product.id}</a>
          {editProductId === product.id ? (
            <div className="Liste">
              <input
                type="text"
                value={editedProductName}
                onChange={(e) => setEditedProductName(e.target.value)}
              />
              <input
                type="text"
                value={editedProductPrice}
                onChange={(e) => setEditedProductPrice(e.target.value)}
              />
              <input
                type="text"
                value={editedProductType}
                onChange={(e) => setEditedProductType(e.target.value)}
              />
              <button onClick={saveEditedProduct}>Salvar</button>
              <button onClick={cancelEditProduct}>Cancelar</button>
            </div>
          ) : (
            <div className="Liste">
              <a id="item">{product.name}</a>
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
            </div>
          )}
        </li>
      ))}
    </div>
  );
};

export default EditLoad;
