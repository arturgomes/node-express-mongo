/**
 * Segundo servidor, um pouco mais complexo,
 * usando um arquivo JSON para simular consulta 
 * ao banco de dados
 */

const express = require("express");
const app = express();

// Copiar o conteúdo de https://pastebin.com/J3KPnUUU
// salvar em data.json
const data = require("./data.json");
app.use(express.json());

//lista exatamente toda a base de dados de data.json
app.get("/clientes", (req, res) => {
  res.json(data);
});

app.post("/clientes", (req, res) => {
  const { address } = req.body;
  res.json({   address  });
});





/**
 * Três formas de passar parametros para uma API
 * 
 * - req.body
 * 
 * - req.params
 * 
 * - req.query
 * 
 * 
 * O primeiro nós já aprendemos, que é passar um JSON no corpo da requisição
 * 
 * O segundo, req.params consiste em passar parametros como parte da uri
 * 
 * pode ser usado quando não requer um grande volume de dados como parametros (para esse caso, usar o body)
 * 
 * aluno/123/disciplina/456/matricular
 * 
 * acima, o aluno com identificador 123, solicita matrícula na disciplina de identificador 456
 * 
 * aluno/123/disciplina/456/desmatricular
 * 
 * acima, o aluno com identificador 123, solicita a exclusão da disciplina de identificador 456
 * 
 */


 app.get("/aluno/:alunoId/disciplina/:discId/matricular", (req, res) => {
  res.json({ mensagem: `O aluno de RGA ${req.params.alunoId} solicitou matricula na disciplina de código ${req.params.discId}`})
 })

 /**
  * req.query 
  * req.query  é mais usada para busca, ordenação, filtro, paginação, etc.
  * 
  *  Por exemplo:
  * 
  *  Estou buscando uma passagem aérea de Corumbá (Código CMG) para 
  * João Pessoa (Código JPA), com 2 adultos, 1 criança e um bebê.
  *  A data de ida é dia 21/12/2022 e a volta dia 18/01/2023, em 
  * classe econômica
  * 
  *  Uma busca no site da 123 milhas, preenchendo os formulários, vai fazer uma consulta com a seguinte query.
  * 
  *  https://123milhas.com/v2/busca?
  * de=CMG&para=JPA&adultos=2&criancas=1&
  * bebes=1&ida=21-12-2022&volta=18-01-2023&classe=3
  *   
  *  provavelmente, se fosssemos implementar algo assim, fariamos um método GET da seguinte forma:
  */
app.get('/busca', (req,res) => {
  console.log(req.query)
  const {de,para,adultos,criancas,bebes,ida,volta} = req.query
  res.json({mensagem: `Estou buscando uma passagem aérea de ${de} 
  para ${para}, com ${adultos} adultos, ${criancas} criança e ${bebes} 
  bebê. A data de ida é dia ${ida} e a volta dia ${volta}, em 
  classe econômica`})
})

/**
 * Voltando ao nosso exemplo do inicio da aula passada...
 */

app.get("/clientes/:id", (req, res) => {
  const { id } = req.params;
  const client = data.find(cli => cli.id == id);

  if (!client) return res.status(204).json();

  res.json(client);
});



app.put("/clientes/:id", (req, res) => {
  const { id } = req.params;
  const client = data.find(cli => cli.id == id);

  if (!client) return res.status(204).json();
 
  const { name } = req.body;
  const {username} = req.query;
  client.name = name;
  client.username = username;

  res.json(client);
});

// app.delete("/clientes/:id", (req, res) => {
//   const { id } = req.params;
//   const clientesFiltered = data.filter(client => client.id != id);

//   res.json(clientesFiltered);
// });




app.listen(3334, () =>{
  console.log("Server is running");
});
