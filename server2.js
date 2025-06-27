const express = require(express);
const app = express();
const port = 300;

let usuario = [];
let vendas = [];
let carrosSport = [];

app.use(express.json());

// cadastra um usuário
app.post('/cliente' , (req,res) => {
    const {nome,cpf,tipo  } = req.body;
    //serve para ver se o  cpf é valido 
        const cpfValido = usuario.findu(usuario => usuario.cpf === cpf);
        if(cpfValido){
            return res.status(400).json({erro: 'CPF inválido'});
        }
});

// criação de usuário
const novoUsuario = {
    id: usuario.length +1,
    nome,
    email,
    tipo: tipo || 'Comprador do veículo'
};






