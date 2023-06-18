import React from "react";

const Listatext = ({ products, deleteProduct, editProduct }) => {
  const handleDelete = (id) => {
    deleteProduct(id);
  };

  const handleEdit = (product) => {
    editProduct(product);
  };

  return (
    <div className="Lista">
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
                <button onClick={() => handleDelete(product.id)} id="excluir">
                  Excluir
                </button>
                <button onClick={() => handleEdit(product)} id="editar">
                  Editar
                </button>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Listatext;
