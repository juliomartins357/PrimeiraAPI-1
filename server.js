const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); //Define que estamos usando json

let clientes = [];

app.get("/", (req, res) => {
    res.send("Hello world!")
});

app.get("/cliente", (req, res)=> {
    res.send(clientes);
});

app.get("/cliente/:id", (req, res) => {
    const id = req.params.id;
    const cliente = clientes.find(cliente => cliente.id == id);
    res.send(cliente);
});

app.post("/cliente", (req, res) => {
    // const nome = req.body.nome;
    let cliente = req.body;
    cliente.id = clientes.length + 1;
    clientes.push(cliente);
    res.send("Cliente cadastrado com sucesso!");
});

app.put("/cliente/:id", (req, res) => {
    const id = req.params.id;
    for(let i = 0; i < clientes.length; i++){
        if(clientes[i].id == id){
            let cliente = req.body;
            cliente.id = parseInt(id);
            clientes[i] = cliente;
        }
    }
    res.send("Cliente com id " + id + " Atualizado com sucesso!")
});

app.delete("/cliente/:id", (req, res) => {
    const id = req.params.id;
    let listaCliente = clientes.filter(cliente => cliente.id != id);
    clientes = listaCliente;
    res.send("Cliente com id " + id + " Deletado com sucesso!")
})

app.listen(port, ()=> {
    console.log("Servidor rodando na porta http://localhost:3000/");
});