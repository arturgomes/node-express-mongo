/**
 * Primeiro servidor bem básico da disciplina
 */

const express = require("express");
const app = express();

app.use(express.json());
//primeira forma de declaração de função
function getBasico(req, res) {
  res.json({mensagem:"Segunda rota basica"});
}
//segunda forma de declarar função
const bemVindo = function() {
  console.log("Server is running");
}

app.get("/basico", getBasico);

const pedraPapelTesoura = (req, res) => {
  let jogo = ['Pedra', 'Papel', 'Tesoura']
  res.json({jogada:jogo[Math.floor(Math.random()*3)]})
}

// Jogo pedra-papel-tesoura
app.get('/ppt',pedraPapelTesoura)


app.get('/dado',...)

//arrow function - terceira forma de escrever funcao
const bemVindo2 = () => {
  //corpo da funcao
  console.log("Bem vindo ao servidor");
}

app.listen(3333, bemVindo2);

