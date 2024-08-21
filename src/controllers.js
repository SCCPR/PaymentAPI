import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(express.json());

const usersFilePath = path.resolve('users.json');

// Função para ler os usuários do arquivo
const readUsersFromFile = () => {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

// Função para escrever os usuários no arquivo
const writeUsersToFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
};

// Rota POST para adicionar um novo usuário
app.post('/user', (req, res) => {
    try {
        const users = readUsersFromFile();
        const newUser = {
            id: users.length + 1, // Incrementa o ID de forma simples
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
        };
        users.push(newUser);
        writeUsersToFile(users);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

// Rota GET para retornar todos os usuários
app.get('/user', (req, res) => {
    try {
        const users = readUsersFromFile();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

// Rota PUT para atualizar um usuário pelo ID
app.put('/user/:id', (req, res) => {
    try {
        const users = readUsersFromFile();
        const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));

        if (userIndex === -1) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        users[userIndex] = {
            ...users[userIndex],
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
        };

        writeUsersToFile(users);
        res.status(200).json(users[userIndex]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
});

// Rota DELETE para remover um usuário pelo ID
app.delete('/user/:id', (req, res) => {
    try {
        let users = readUsersFromFile();
        users = users.filter(user => user.id !== parseInt(req.params.id));

        writeUsersToFile(users);
        res.status(200).json({ message: 'Usuário deletado' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
