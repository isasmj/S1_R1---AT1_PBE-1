import { Router } from 'express';
import categoriaController from '../controllers/categoria.controller.js';

const categoriaRoutes = Router();

categoriaRoutes.post('/categorias', categoriaController.cadastrarCategorias);
categoriaRoutes.get('/categorias', categoriaController.listarTodos);
categoriaRoutes.get('/categorias/:id', categoriaController.listarPorId);
categoriaRoutes.patch('/categorias/:id', categoriaController.editarCategoria);
categoriaRoutes.delete('/categorias/:id', categoriaController.excluir);

export default categoriaRoutes;