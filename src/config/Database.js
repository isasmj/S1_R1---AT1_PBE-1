
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';


class Database {
    static #instance = null;
    #pool = null;


    #createPool() {
        this.#pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT,
            waitForConnections: true,
            connectionLimit: 100,
            queueLimit: 0,
            ssl: {
                rejectUnauthorized: false
            }
        });
    }


    static getInstance() {
        if (!Database.#instance) {
            Database.#instance = new Database();
            Database.#instance.#createPool();
        }
        return Database.#instance;
    }


    getPool() {
        return this.#pool;
    }
}


export const connection = Database.getInstance().getPool();


export async function initializeDatabase() {
    console.log("Inicializando o banco de dados e tabelas...");
    try {
        const tempConnection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
            ssl: { rejectUnauthorized: false }
        });


        const dbName = process.env.DB_DATABASE || 'S1_R6 - AT1_PBE 2';


        await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        await tempConnection.query(`USE \`${dbName}\`;`);


        await tempConnection.query(`
            create table if not exists categoria (
            idCategoria INT PRIMARY KEY AUTO_INCREMENT,
            descricaoCategoria VARCHAR(200)NOT NULL,
            dataCad TIMESTAMP DEFAULT CURRENT_TIMESTAMP );
        `);


        await tempConnection.query(`
            create table if not exists produtos (
            idProduto CHAR(36) DEFAULT(uuid()) PRIMARY KEY,
            idCategoria INT NOT NULL,
            nomeProduto VARCHAR(100) NOT NULL,
            valorProduto DECIMAL (10,2) NOT NULL,
            vinculoImagem VARCHAR(255) NOT NULL,
            dataCad TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (idCategoria) references categoria (idCategoria)
            );
        `);



        await tempConnection.end();
        console.log("Banco de dados e tabelas verificados/criados com sucesso.");
    } catch (error) {
        console.error("Erro ao criar o banco ou as tabelas:", error);
        throw error;
    }
}


