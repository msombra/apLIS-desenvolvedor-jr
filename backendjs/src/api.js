// módulos
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// imports files
const db_config = require('./db_config');

// iniciando o servidor
const app = express();
app.listen(3000, err => {
    if (err) {
        console.log("Erro ao iniciar o servidor: " + err.message);
    } else {
        console.log("Servidor iniciado");
    }
});

// iniciando a conexão db
const conn = mysql.createConnection(db_config);

// cors
app.use(cors());

// para receber json no body das requisições
app.use(express.json());

// Rotas

// listar dados
app.get('/pacientes', (req, res) => {
    conn.query('SELECT * FROM pacientes ORDER BY nome', (err, results) => {
        if (err) {
            res.status(500).json({ 
                message: 'Erro ao buscar os dados.', 
                error: err.message 
            });
        } else {
            res.json(results);
        }
    });
});

// inserir dado
app.post('/pacientes', (req, res) => {
    const { nome, dataNascimento, carteirinha, cpf } = req.body;
    conn.query('INSERT INTO pacientes (nome, dataNascimento, carteirinha, cpf) VALUES (?, ?, ?, ?)', [nome, dataNascimento, carteirinha, cpf], (err, results) => {
        if (err) {
            res.status(500).json({ 
                message: 'Erro ao inserir os dados.', 
                error: err.message 
            });
        } else {
            res.json({ 
                status: 'success',
                message: 'Paciente criado com sucesso.', 
                id: results.insertId 
            });
        }
    });
});

// obtém um dado especifico pelo ID
app.get('/pacientes/:id', (req, res) => {
    const { id } = req.params;
    conn.query('SELECT * FROM pacientes WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).json({ 
                message: 'Erro ao buscar os dados.', 
                error: err.message 
            });
        } else {
            res.json(results);
        }
    });
});

// atualiza um dado
app.post('/pacientes/:id', (req, res) => {
    const { id } = req.params;
    const { nome, dataNascimento, carteirinha, cpf } = req.body;
    conn.query('UPDATE pacientes SET nome = ?, dataNascimento = ?, carteirinha = ?, cpf = ? WHERE id = ?', [nome, dataNascimento, carteirinha, cpf, id], (err, results) => {
        if (err) {
            res.status(500).json({ 
                message: 'Erro ao atualizar os dados.', 
                error: err.message 
            });
        } else {
            res.json({ 
                status: 'success',
                message: 'Paciente editado com sucesso.' 
            });
        }
    });
});

// deleta um dado
app.delete('/pacientes/:id', (req, res) => {
    const { id } = req.params;
    conn.query('DELETE FROM pacientes WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).json({ 
                message: 'Erro ao deletar os dados.', 
                error: err.message 
            });
        } else {
            res.json({ 
                status: 'success',
                message: 'Paciente removido com sucesso.' 
            });
        }
    });
});