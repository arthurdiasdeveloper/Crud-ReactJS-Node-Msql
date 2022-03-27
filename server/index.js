
// A primeira coisa quando iniciamos um server é pegar o expresse
const express = require("express")
// precisamos execultar esse express
const app = express();
// variavel mysql - DB
const mysql = require("mysql");
// O corse serve para nao deixar 
// dar problema quando estivermos fazendo conexao do backend com o frontEnd
 const cors = require("cors");


// variavel DB 
const db = mysql.createPool({ 
    // Vamos passar uma lista de objetos.
    // connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "SempreTodos98",
    database: "crudgames",

});

// agora vamos usar o nosso corse
app.use(cors());
// vamos utilizar o express. Para lermos os dados no front
// vamos utilizar o formato json
app.use(express.json());


// --------------------------------------------------------------------------------
app.post("/register", (req, res)=>{
    // Vamos comecar a pegar nossos dados.
  const  { name } = req.body;
  const  { cost } = req.body;
  const  { category } = req.body;



//   console.log(name);
// Agora vamos execultar o nosso banco de dados.
let SQL = "INSERT INTO games  ( name, cost, category ) VALUES ( ?,?,? )";

// Com o código acima finalizado, precisamos enviar para o BD
// vamos fazer isso com o seguinte código:
db.query(SQL, [ name, cost, category], (err, result) => {
    // Aqui, já estamos enviando para o BD
    // vamos dar um console.log somente para verificar!
   if (err) console.log (err);
   else res.send(result);
})

});


// --------------------------------------------------------------------------------
// Após criarmos a funçao useEffcs na no aquivo App.js
// vamos criar a funáo aqui
app.get("/getCards", (req, res) =>{
    // comando SQL  para pegar todos os dados.
    let SQL = "SELECT * from games";

    

    db.query(SQL, (err, result) => {
        // se der algum erro, entao retorna erro
        if(err) console.log(err);
        // se nao retorna o resultado.
        else res.send(result);
    });
});


// --------------------------------------------------------------------------------
//Esse metodo Put diz respeito a handleClick ira fazer a atulizaçao no BD
app.put("/edit", (req, res) =>{
    const { id } = req.body;
    const { name } = req.body;
    const { cost } = req.body;
    const { category } = req.body;
    
    let SQL = "UPDATE games SET name = ?, cost = ?, category = ? WHERE idgames = ?";
    
    db.query(SQL, [name, cost, category, id], (err, result) => {
       if (err) console.log(err);
       else res.send(result);
        });
      });
// --------------------------------------------------------------------------------
app.delete("/delete/:id", (req,res) =>{

    const { id }   = req.params;
    //ira deletar id do meu componente.
    let SQL = "DELETE FROM games WHERE idgames = ?";

    db.query(SQL, [id],(err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
})


// --------------------------------------------------------------------------------



/* 
// Vamos verificar se realmente a conexao
// com o bando de dados está funcionando.
app.get("/", (req, res) => { 
    // vamos execultar o nosso código de mysl
    let SQL = 
    "INSERT INTO games ( name, cost, category ) VALUES ('Far Cry 5', '120','Ação')";

    // para executar essa inserção vamos dar o comando
    db.query(SQL, (err, result) => {
        console.log(err);
    });
});

 */







/* //vamos utlixar o metodo get para pegar alguns dados
//vamos buscar duas funcoes: request e result
app.get('/', (req, res) => {
    res.send("hello word!");
}) */

// para rodar o servidor
app.listen(3001, () => {
    console.log("rodando servidor!");
});