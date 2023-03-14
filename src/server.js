import express from 'express';
import ProductManager from './productManager.js';

const APP = express();
const PORT = 8080;

APP.use(express.urlencoded({ extended: true }));
APP.use(express.json());

APP.get('/', (req, res) => {
    res.send(`Hola Gasty! Este es el desafío de la Clase N°6!`)
})

APP.get('/products', (request, response) => {
    let { limit } = request.query;
    let productList;
    if (!limit) {
        productList = new ProductManager().getProducts();
    } else {
        productList = new ProductManager().getProductsWithLimit(limit);
    }
    response.send(productList);
});


APP.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})