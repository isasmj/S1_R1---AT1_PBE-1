import { Router } from 'express';
import produtoController from '../controllers/produto.controller.js';
import uploadImage from '../middleware/uploadImage.middleware.js';

const produtoRoutes = Router();

produtoRoutes.post('/produtos', uploadImage, produtoController.cadastrarProduto);
produtoRoutes.get('/produtos', produtoController.listarTodos);
produtoRoutes.get('/produtos/:id', produtoController.listarUm);
produtoRoutes.put('/produtos/:id', uploadImage, produtoController.editar);
produtoRoutes.delete('/produtos/:id', produtoController.excluir);

export default produtoRoutes;