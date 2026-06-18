import categoriaModel from "../repositories/categoria.repository.js";

const categoriaController = {

    cadastrarCategorias: async (req, res) => {
        try {
            const { descricaoCategoria } = req.body;
            if (!descricaoCategoria) {
                return res.status(400).json({ erro: "Informe a descrição da categoria" });
            }
            const resultado = await categoriaModel.cadastrar({ descricaoCategoria });
            return res.status(201).json({ mensagem: "Categoria cadastrada!" });
        } catch (erro) {
            return res.status(500).json({ erro: "Falha no cadastro", errorMessage: erro.message });
        }
    },

    listarTodos: async (req, res) => {
        try {
            const lista = await categoriaModel.listar();
            res.status(200).json(lista);
            if (lista.length == 0) {
                return res.status(200).json({ message: "Não há categorias" });
            }
        } catch (erro) {
            return res.status(500).json({ erro: "Não foi possível carregar as categorias", errorMessage: erro.message });
        }
    },

    listarPorId: async (req, res) => {
        try {
            const idCategoria = req.params.id;
            const registro = await categoriaModel.buscarPorId(idCategoria);
            if (!registro) {
                return res.status(404).json({ erro: "Categoria inexistente" });
            }
            return res.status(200).json(registro);
        } catch (erro) {
            return res.status(500).json({ erro: "erro na consulta", errorMessage: erro.message });
        }
    },

    editarCategoria: async (req, res) => {
        try {
            const idCategoria = req.params.id;
            const { descricaoCategoria } = req.body;
            if (!descricaoCategoria) {
                return res.status(400).json({ erro: "Descrição não pode ser vazia" });
            }
            const existe = await categoriaModel.buscarPorId(idCategoria);
            if (!existe) {
                return res.status(404).json({ erro: "Registro não localizado para atualização" });
            }
            await categoriaModel.editar(idCategoria, { descricaoCategoria });
            return res.status(200).json({
                mensagem: "Dados da categoria atualizados"
            });
        } catch (erro) {
            return res.status(500).json({ erro: "Não foi possível atualizar", errorMessage: erro.message });
        }
    },

    excluir: async (req, res) => {
        try {
            const idCategoria = req.params.id;
            const existe = await categoriaModel.buscarPorId(idCategoria);
            if (!existe) {
                return res.status(404).json({ erro: "Impossível remover: categoria não existe" });
            }
            await categoriaModel.excluir(idCategoria);
            return res.status(200).json({
                mensagem: "Categoria removida do sistema"
            });
        } catch (erro) {
            return res.status(500).json({ erro: "Falha na exclusão", errorMessage: erro.message });
        }
    }
};

export default categoriaController;