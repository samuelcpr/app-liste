import Product from "../models/Product";

const ProductController = {
  addProduct: (name, price, type) => {
    Product.addProduct(name, price, type);
  },

  updateProduct: (id, name, price, type) => {
    Product.updateProduct(id, name, price, type);
  },

  deleteProduct: (id) => {
    Product.deleteProduct(id);
  },

  getAllProducts: () => {
    return Product.getAllProducts();
  }
};

export default ProductController;
