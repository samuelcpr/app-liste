import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "./style.css";
import { getFirestore, collection, addDoc, doc, onSnapshot, deleteDoc } from "firebase/firestore";


const firebaseConfig = {

};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
// const analytics = getAnalytics(app);

const App = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [products, setProducts] = useState([]);

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
    const newProduct = {
      name: name,
      price: price,
      type: type
    };

    const productsCollection = collection(firestore, "products");
    await addDoc(productsCollection, newProduct);
  };

  const deleteProduct = async (id) => {
    const productDocRef = doc(firestore, "products", id);
    await deleteDoc(productDocRef);
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
      <div className="input" >
        <button onClick={addProduct}>Adicionar Produto</button>
      </div>
      <ul>
        {/* titulo da exibição */}
        <h1>lista</h1>
        <div className="infoMain">
          <div id="info"><p id="p1">Nome</p> <p id="p2">Preço</p> <p id="p3">Tipo</p></div>
        </div>
        <div className="result">
          {products.map((product) => (
            <li key={product.id} id="itemMain">
              <a id="item">
                {product.name}
              </a>
              <a id="item2">
                {product.price}
              </a>
              <a id="item3">{product.type}</a>
              <div className="excluirMain">
              <button onClick={() => deleteProduct(product.id)} id="excluir">Excluir</button>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default App;
