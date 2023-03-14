import express from 'express';

// declaramos express
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`Hola Gasty! Este es el desafío de la Clase N°6!`)
})

//  req.query

const consultas = []
app.get('/ejemploQueries/query', (request, response) => {
    let { nombre, apellido, edad } = request.query;
    consultas.push(request.query)
    response.send(consultas);
});




app.listen(PORT, () => {
    console.log(`Server run on port: ${PORT}`);
})