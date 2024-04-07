//                  EX 01
const express = require ("express");
const app = express(); 
const PORT = 3000;
let produtos = [];
let users = [];

//                  EX 03

const logHoraMiddleware = (req, res, next) => {
    const horaAtual = new Date ().toISOString();
    console.log(
        `[${horaAtual}] Nova solicitação recebida para: ${req.method} ${req.originalUrl}`
    );
    next(); //Chamando next para passar a solicitação para o próximo Middleware
};

app.use(logHoraMiddleware);

app.use(express.json());

//                  EX 02

//Sobre
app.get('/sobre', (req, res) => {
    res.send('Esta é uma aplicação criada com Express.');
});

//Contato
app.get('/contato', (req, res) => {
    res.send('Entre em contato conosco.');
});

//                  EX 04

app.get ('/produto/:id', (req, res) => {
    const { id } = req.params;
    const produto = produtos.find (produto => produto.id === parseInt(id));
    if(!produto) {
        res.status(404).send(`Produto com o ID: ${id}, não encontrada.`);
        return;
    }
    res.json(produto);
});

//                  EX 05

app.get("/html", function(req, res){ 
    res.sendFile(__dirname + "/public/index.html")
});

//                  EX 06

//CRIAÇÃO
app.post('/users', (req, res) => {
    const user = req.body;
    user.id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    users.push(user);
    res.status(201).json({ message: 'Usuário adicionado com sucesso', user: user });
});

//LEITURA
app.get('/users', (req, res) => {
    res.json(users);
});

//LEITURA COM ID
app.get ('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find (user => user.id === parseInt(id));
    if(!user) {
        res.status(404).send('Not Found.');
        return;
    }
    res.json(user);
});

//UPDATE
app.put('/users/:id', (req, res) => { 
    const { id } = req.params;
    const newData = req.body; 
    const index = users.findIndex(user => user.id === parseInt(id));
    if (index === -1) {
        res.status(404).send('Not Found.');
        return;
    }
    users[index] = { ... users[index], ... newData};
    res.status(200 ).json({mensagem: 'Pessoa modificada com sucesso', dados: req.body});
});

//DELETE
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex (user => user.id === parseInt(id));
    if (index === -1) {
        res.status(404).send('Not Found.');
        return;
    }
    users.splice(index, 1);
    res.status(200).send('Usuário deletado com sucesso.');
});

app.listen(PORT, () => {
    console.log(`Servidor Express rodando na porta ${PORT}`);
});