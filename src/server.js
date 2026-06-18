import express from 'express';
import categoriaRoutes from './routes/categoria.routes.js';
import produtoRoutes from './routes/produto.routes.js';
import 'dotenv/config';
import { initializeDatabase } from './config/Database.js'; 


const app = express();
app.use(express.json());


app.use('/uploads', express.static('uploads')); 
app.use(produtoRoutes);
app.use(categoriaRoutes);
app.use(express.urlencoded({ extended: true }));


// app.listen(process.env.SERVER_PORT, () => {
//     console.log(`Servidor rodando em http:localhost:${process.env.SERVER_PORT}`)
// });

initializeDatabase().then(() => {
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Servidor rodando na porta ${process.env.SERVER_PORT}`);
    });
}).catch(err => {
    console.error("Erro ao inicializar o banco de dados:", err);
});



