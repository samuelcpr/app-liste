class Product {
  // ...

  static addProduct(name, price, type) {
    // Verifica se o produto com o mesmo ID já existe
    const existingProduct = this.getAllProducts().find(product => product.id === id);
    
    if (existingProduct) {
      console.log('Um produto com o mesmo ID já existe.');
      return;
    }

    // Cria um novo objeto de produto com os parâmetros fornecidos
    const newProduct = new Product(generateId(), name, price, type);

    // Adiciona o novo produto ao banco de dados
    addDoc(collection(firestore, "products"), {
      id: newProduct.id,
      name: newProduct.name,
      price: newProduct.price,
      type: newProduct.type
    })
      .then(() => {
        console.log('Produto adicionado com sucesso ao banco de dados.');
      })
      .catch((error) => {
        console.log('Erro ao adicionar o produto ao banco de dados:', error);
      });
  }

  // ...
}

export default Product;
