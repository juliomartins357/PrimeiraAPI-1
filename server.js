const express = require('express');
const app = express();
const port = 3000;

const db = require('./db');

app.use(express.json()); //Define que estamos usando json

let clientes = [];

app.get("/", (req, res) => {
    res.send("Hello world!")
});

app.get("/cliente", async (req, res)=> {
    try{
        const [rows] = await db.query("Select * from cliente");
        res.json(rows);
    }catch(error){
        console.log("Erro ao buscar: " + error.message);
        res.status(500).send("Erro ao buscar clientes")
    }
});

app.get("/cliente/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await db.query("Select * from cliente Where id = ?", [id]);
        if (rows.length > 0) {
            res.json(rows[0]); 
        }
        res.status(404).send("Cliente com id:" + id + " não encontrado!")
    }catch(error){
        console.log("Erro ao buscar: " + error.message);
        res.status(500).send("Erro ao buscar clientes")
    }

});

app.post("/cliente",async (req, res) => {
    // const nome = req.body.nome;
    let cliente = req.body;
    try{
        const [rows] = await db.query("Insert into cliente(nome, idade, cpf) values (?,?,?)",
         [cliente.nome, cliente.idade, cliente.cpf]);

        cliente.id = rows.insertId;

        res.status(201).json(cliente);
    }catch(error){
        console.log("Erro ao cadastrar cliente: " + error.message);
        res.status(500).send("Erro ao cadastrar clientes")
    }
});

app.put("/cliente/:id",async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await db.query("Select * from cliente Where id = ?", [id]);
        if (rows.length > 0) {
            let cliente = req.body;
             const [rows] = await db.query("Update cliente set nome = ?, idade = ?, cpf = ? Where id = ?",
             [cliente.nome, cliente.idade, cliente.cpf, id])

             cliente.id = id;

             res.status(200).json(cliente);
        }
        res.status(404).send("Cliente com id:" + id + " não encontrado!")
    }catch(error){
        console.log("Erro ao atualizar: " + error.message);
        res.status(500).send("Erro ao atualizar clientes")
    }
});

app.delete("/cliente/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const [rows] = await db.query("Delete From cliente Where id = ?", [id]);
        if(rows.affectedRows > 0) {
            res.status(204).send("Cliente deletado com sucesso!")
        }
        res.status(404).send("Cliente não encontrado para deletar!")
    }catch(error){
        console.log("Erro ao deletar: " + error.message);
        res.status(500).send("Erro ao deletar clientes")
    }
})

app.listen(port, ()=> {
    console.log("Servidor rodando na porta http://localhost:3000/");
});