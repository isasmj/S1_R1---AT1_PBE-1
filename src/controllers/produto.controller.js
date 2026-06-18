import produtoModel from "../repositories/produtosrepository.js";

const produtoController = {

    cadastrarProduto: async (req, res) => {
        try {
            const { idCategoria, nomeProduto, valorProduto } = req.body;
            if (!idCategoria || !nomeProduto || !valorProduto) {
                return res.status(400).json({ erro: "Preencha todos os campos obrigatórios" });
            }
            const registro = {
                idCategoria: parseInt(idCategoria),
                nomeProduto: nomeProduto.trim(),
                valorProduto: parseFloat(valorProduto),
                vinculoImagem: req.file ? req.file.filename : null,
                dataCad: new Date()
            };
            const resultado = await produtoModel.cadastrar(registro);
            return res.status(201).json({ mensagem: "Produto registrado com sucesso" });
        } catch (erro) {
            return res.status(500).json({ erro: "Erro ao salvar produto", errorMessage: erro.message })
        }
    },

    listarTodos: async (req, res) => {
        try {
            const itens = await produtoModel.listarTodos();
            return res.status(200).json(itens);
        } catch (erro) {
            return res.status(500).json({ erro: "Erro ao recuperar produtos", errorMessage: erro.message });
        }
    },

    listarUm: async (req, res) => {
        try {
            const codigo = req.params.id;
            const item = await produtoModel.listarId(codigo);
            if (!item) {
                return res.status(404).json({ erro: "Produto não localizado no banco de dados" });
            }
            return res.status(200).json(item);
        } catch (erro) {
            return res.status(500).json({ erro: "Falha na busca do produto", errorMessage: erro.message });
        }
    },

    editar: async (req, res) => {
        try {
            const codigo = req.params.id;
            const { idCategoria, nomeProduto, valorProduto } = req.body;
            const atualizacoes = {};
            if (idCategoria) atualizacoes.idCategoria = parseInt(idCategoria);
            if (nomeProduto) atualizacoes.nomeProduto = nomeProduto.trim();
            if (valorProduto) atualizacoes.valorProduto = parseFloat(valorProduto);
            if (req.file) atualizacoes.vinculoImagem = req.file.filename;

            const item = await produtoModel.listarId(codigo);
            if (!item) {
                return res.status(404).json({ erro: "Produto inexistente para edição" });
            }
            await produtoModel.atualizar(codigo, atualizacoes);
            return res.status(200).json({ mensagem: "Produto modificado com sucesso" });
        } catch (erro) {
            return res.status(500).json({ erro: "Não foi possível alterar o produto", errorMessage: erro.message });
        }
    },

    excluir: async (req, res) => {
        try {
            const codigo = req.params.id;
            const item = await produtoModel.listarId(codigo);
            if (!item) {
                return res.status(404).json({ erro: "Produto já foi removido ou não existe" });
            }
            await produtoModel.excluir(codigo);
            return res.status(200).json({ mensagem: "Produto excluído permanentemente" });

        } catch (erro) {
            return res.status(500).json({ erro: "Erro na exclusão do registro", errorMessage: erro.message });
        }
    }
};
export default produtoController;