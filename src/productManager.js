const fs = require("fs");

class ProductManager {
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

const newSess = new ProductManager("./files/products.json");

//agregar productos
newSess.addProduct(
  "A la sombra de la espada",
  "A la sombra de la espada es una novela evocadora y poética, compuesta por tres cartas que, en un estilo de confesión o diario, nos revelan una voz y un tiempo.",
  14.2,
  "http://www.valdemar.com/images/cd_068.jpg",
  8477021902,
  24
);
newSess.addProduct(
  "Aforismos sobre el arte de saber vivir",
  "¿Qué alternativa queda para quienes han visto más allá del velo de Maya, para quienes reconocen que el mundo es nada, pero desean seguir viviendo? ¿Cómo continuar, pues, subsistiendo en el infierno, en este «valle de lágrimas», y hacerlo lo más agradable posible?",
  18.99,
  "http://www.valdemar.com/images/cd-102nuevo.gif",
  9788477027140,
  75
);
newSess.addProduct(
  "Aforismos, ocurrencias y opiniones",
  "En la presente selección de los Schulbücher el lector encontrará una clasificación por temas de las anotaciones de Lichtenberg, así como una nota introductoria que sitúa cada tema en su contexto y proporciona algunos datos que pueden ayudar a comprender los diferentes aforismos, cuyo principal mérito consiste en despertar las facultades intelectuales del lector, estimulándose para que piense por sí mismo.",
  12.8,
  "http://www.valdemar.com/images/cd_137.jpg",
  8477022992,
  33
);

console.log("Lista de productos productos agregados:");
console.log(newSess.getProducts());

//tratar de agregar producto, pero con código repetido
newSess.addProduct(
  "A la sombra de la espada",
  "A la sombra de la espada es una novela evocadora y poética, compuesta por tres cartas que, en un estilo de confesión o diario, nos revelan una voz y un tiempo.",
  14.2,
  "http://www.valdemar.com/images/cd_068.jpg",
  8477021902,
  24
);

//actualizar producto
let prodUpdate = {
  title: "A la sombra de la espada y del manzano",
  description:
    "A la sombra de la espada es una novela evocadora y poética, compuesta por tres cartas que, en un estilo de confesión o diario, nos revelan una voz y un tiempo.",
  price: 14.2,
  thumbnail: "http://www.valdemar.com/images/cd_068.jpg",
  code: 8477021902,
  stock: 24,
};

console.log("Lista de productos después de actualizar el título del primero:");
console.log(newSess.runApp());
//obtener producto por id - correcto e incorrecto
newSess.getProductById(1);
newSess.getProductById(7);

//eliminar producto
newSess.deleteProduct(1);

console.log("Lista de productos después de eliminar el primero:");
console.log(newSess.runApp());