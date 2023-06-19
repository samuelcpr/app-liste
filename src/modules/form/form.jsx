import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";
import ProductForm from "../../components/AddProd/AddProd";
import ValorTotal from "../../components/TotalPreco/TotalPreco";
import LoadProductDataForEdit from "../../components/atualizandoProd/atualizeProd";
import FirebaseConfig from "../../server/Api/api";

const firebaseConfig = FirebaseConfig;

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

const App = () => {
  const [products, setProducts] = useState([]);
  const [showBottomModal, setShowBottomModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, "products"), (snapshot) => {
      const updatedProducts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(updatedProducts);
    });

    return () => unsubscribe();
  }, []);

  const addProduct = async (product) => {
    try {
      const docRef = await addDoc(collection(firestore, "products"), product);
      const newProduct = { id: docRef.id, ...product };
      setProducts([...products, newProduct]);
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(firestore, "products", id));
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

  const editProduct = async (product) => {
    try {
      const { id, ...productData } = product;
      await updateDoc(doc(firestore, "products", id), productData);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  return (
    <div className="mainContainer">
      <ProductForm addProduct={addProduct} />

      {/* Remova a linha <EditLoad /> do seu código */}
      <h1>Lista de produtos</h1>
      <LoadProductDataForEdit
        products={products}
        deleteProduct={deleteProduct}
        editProduct={editProduct}
      />
      <ValorTotal
        products={products}
        showBottomModal={showBottomModal}
        setShowBottomModal={setShowBottomModal}
      />
    </div>
  );
};

export default App;
