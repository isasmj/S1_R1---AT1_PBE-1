import { connection } from "../config/Database.js";

const categoriaModel = {
    cadastrar: async (dados) => {
        const sql = 'insert into categoria (descricaoCategoria, dataCad) values (?, NOW());';
        const [rows] = await connection.execute(sql, [dados.descricaoCategoria]);
        return rows;
    },

    listar: async () => {
        const sql = 'Select * from categoria;';
        const [rows] = await connection.execute(sql);
        return rows;
    },

    buscarPorId: async (id) => {
        const sql = 'select * from categoria where idCategoria = ?;';
        const [rows] = await connection.execute(sql, [id]);
        return rows[0];
    },

    editar: async (id, descricao) => {
        const sql = 'update categoria set descricaoCategoria = ? where idCategoria = ?;';
        const [rows] = await connection.execute(sql, [descricao, id]);
        return rows;
    },

    excluir: async (id) => {
        const sql = 'delete from categoria where idCategoria = ?;';
        const [rows] = await connection.execute(sql, [id]);
        return rows;
    }
};

export default categoriaModel;