import React from "react";







const ValorTotal = ({ products, showBottomModal, setShowBottomModal }) => {
  const loadProductDataForPrice = () => {
    setShowBottomModal(true);
  };

  const calcularTotal = () => {
    let total = 0;
    products.forEach((product) => {
      total += parseFloat(product.price);
    });
    return total;
  };

  return (
    <div>
      {showBottomModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Valor Total</h2>
            <p>Total: R${calcularTotal()},00</p>
            <button onClick={() => setShowBottomModal(false)} id="fecharTotal">
              Fechar
            </button>
          </div>
        </div>
      )}
      <div className="valorTotal">
        <button onClick={loadProductDataForPrice} id="botaoTotal">
          Valor Total
        </button>
      </div>
    </div>
  );
};

export default ValorTotal;

