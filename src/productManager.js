const fs = require("fs");

export class ProductManager {
  constructor(path, products = []) {
    this.products = products;
    this.path = path;
  }

  static id = 0;

  checkForFileAndReturnProducts = async () => {
    if (fs.existsSync(this.path)) {
      let productList = await fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(productList);
      ProductManager.id = this.products.length;
    } else {
      this.products = [];

    }
    return this.products;
  };

  runApp  = async () => {
    console.log(newSess.getProducts());
  }

  getProducts = async () => {
    this.products = await this.checkForFileAndReturnProducts();
    return this.products;
  };
  
  getProductsWithLimit = async (limit) => {
    let productsArray = [];
    this.products = await this.checkForFileAndReturnProducts();
    for (i = 0; i < limit; i++) {
      productsArray.push(this.products[i + 1]);
    }
    return productsArray;
  };

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    this.products = await this.checkForFileAndReturnProducts();
    const checkForDuplicatedCode = this.products.filter(
      (product) => product.code === code
    );
    if (checkForDuplicatedCode.length !== 0) {
      return `This code (${code}) already exists`;
    }
    if (title && description && price && thumbnail && code && stock) {
      let product = {
        id: ProductManager.id + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      ProductManager.id++;
      this.products.push(product);
      await fs.writeFileSync(this.path, JSON.stringify(this.products));
      return this.products;
    } else {
      return console.log("Fill in all the fields to add a new product");
    }
  };

  updateProduct = async (id, updatedProduct) => {
    this.products = await this.checkForFileAndReturnProducts();
    let product = this.products.find((product) => product.id == id);
    if (product) {
      product.title = updatedProduct.title || product.title;
      product.description = updatedProduct.description || product.description;
      product.price = updatedProduct.price || product.price;
      product.thumbnail = updatedProduct.thumbnail || product.thumbnail;
      product.stock = updatedProduct.stock || product.stock;
      product.id = product.id;

      await fs.writeFileSync(this.path, JSON.stringify(this.products));
      return this.products;
    } else {
      console.log(`This ID (${id}) does not exist.`);
      return this.products;
    }
  };

  deleteProduct = async (id) => {
    this.products = await this.checkForFileAndReturnProducts();
    const checkForID = this.products.findIndex((product) => product.id === id);

    if (checkForID > -1) {
      this.products.splice(checkForID, 1);
      await fs.writeFileSync(this.path, JSON.stringify(this.products));
      return this.products;
    } else {
      return `ID (${id}) not found or invalid`;
    }
  };

  getProductById = async (id) => {
    this.products = await this.checkForFileAndReturnProducts();
    const productByID = this.products.find((product) => product.id === id);
    if (productByID) {
      return productByID;
    } else {
      return `ID (${id}) not found or invalid`;
    }
  };
}