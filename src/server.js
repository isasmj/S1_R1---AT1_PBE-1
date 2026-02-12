import express from 'express';
import categoriaRoutes from './routes/categoria.routes.js';
import produtoRoutes from './routes/produto.routes.js';
import 'dotenv/config';

const app = express();
app.use(express.json());


app.use(produtoRoutes);
app.use(categoriaRoutes);
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando em http:localhost:${process.env.SERVER_PORT}`)
});

