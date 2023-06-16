import React, { useState, useEffect } from "react";
import "./style.css";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdgsvIjt5eU_O80r4yvXEbEEONVBEVGas",
  authDomain: "crud-produtos-5972b.firebaseapp.com",
  projectId: "crud-produtos-5972b",
  storageBucket: "crud-produtos-5972b.appspot.com",
  messagingSenderId: "650147894625",
  appId: "1:650147894625:web:b68d6780141c62a2f86120",
  measurementId: "G-946D1HQFBM"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const Form = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState("");
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editType, setEditType] = useState("");

  useEffect(() => {
    const productsCollection = collection(firestore, "products");
    const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    });

    return () => unsubscribe();
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const addProduct = async () => {
    if (editProductId) {
      if (editProductId === "") {
        return; // Não permite atualizar se o ID estiver vazio
      }

      const productDocRef = doc(firestore, "products", editProductId);
      await updateDoc(productDocRef, {
        name: editName,
        price: editPrice,
        type: editType
      });
      setEditProductId("");
      setEditName("");
      setEditPrice("");
      setEditType("");
      setShowEditModal(false);
    } else {
      const newProduct = {
        name: name,
        price: price,
        type: type
      };

      const productsCollection = collection(firestore, "products");
      await addDoc(productsCollection, newProduct);
      setName("");
      setPrice("");
      setType("");
    }
  };

  const deleteProduct = async (id) => {
    const productDocRef = doc(firestore, "products", id);
    await deleteDoc(productDocRef);
  };

  const loadProductDataForEdit = (product) => {
    setEditProductId(product.id);
    setEditName(product.name);
    setEditPrice(product.price);
    setEditType(product.type);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setEditProductId("");
    setEditName("");
    setEditPrice("");
    setEditType("");
    setShowEditModal(false);
  };

  return (
    <div className="container">
      <h1>Adicionar produtos</h1>
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
        <button onClick={addProduct}>Adicionar Produto</button>
      </div>
      <div className="Container-modal"></div>

      <ul>
        <h1>Lista de Produtos</h1>
        <div className="infoMain">
          <div id="info">
            <p id="p0">id</p>
            <p id="p1">Nome</p>
            <p id="p2">Preço</p>
            <p id="p3">Tipo</p>
          </div>
        </div>

        <div className="result">
          {products.map((product) => (
            <li key={product.id} id="itemMain">
              <a id="item">{product.id}</a>
              <a id="item">{product.name}</a>
              <a id="item2">{product.price}</a>
              <a id="item3">{product.type}</a>
              <div className="excluirMain">
                <button onClick={() => deleteProduct(product.id)} id="excluir">
                  Excluir
                </button>
                <button onClick={() => loadProductDataForEdit(product)} id="editar">Editar</button>
              </div>
            </li>
          ))}
        </div>
      </ul>

      <div className="container-modal">
        {showEditModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Editar Produto</h2>

              <div className="input">
                <label>ID:</label>
                <input type="text" value={editProductId} onChange={(event) => setEditProductId(event.target.value)} />
              </div>
              <div className="input">
                <label>Nome:</label>
                <input type="text" value={editName} onChange={(event) => setEditName(event.target.value)} />
              </div>
              <div className="input">
                <label>Preço:</label>
                <input type="text" value={editPrice} onChange={(event) => setEditPrice(event.target.value)} />
              </div>
              <div className="input">
                <label>Tipo:</label>
                <input type="text" value={editType} onChange={(event) => setEditType(event.target.value)} />
              </div>
              <div className="input">
                <button onClick={addProduct}>Atualizar Produto</button>
              </div>
              <button onClick={closeEditModal}>Fechar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
