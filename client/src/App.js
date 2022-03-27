import React, { useState, useEffect } from "react"
import './App.css';
import Axios from "axios";
import Card  from "./components/cards/card";

function App() {
// vamos utlizar o useState para pegarmos os valores dos imputs
const [values, setValues] = useState();
const [listGames, SetListGames] = useState ();
console.log(listGames);

// --------------------------------------------------------------------------------
const handleChangeValues = (value) => {
   //console.log(value.target.value);
  setValues((prevValue) => ({
    // com o prevValue ele irá pegar o valor antigo 
    ...prevValue,
    // Agora iá adicionar o novo valor que ele está digitando.
    [value.target.name]: value.target.value,
  }));
};

// --------------------------------------------------------------------------------
// essa function pega o valor do bootun
const handleClickButton = () => {
  // console.log(values);
  // Quando clicarmos no botao, vamos querer um request 
  // para que ele envie os dados para o BD
  // Apos a URL, com a virgula passamos como objeto 
  // todas as variavéis que desejamos cadastrar.
  Axios.post("http://localhost:3001/register", {
    name: values.name,
    cost: values.cost,
    category: values.category,
  // }).then((response) => {
    // Vamos transformar o Then para atulizar os nossos dados
  }).then((res) => { 
    SetListGames([
      ...listGames,
      // vamos agora abrir nosso objeto e criar um outro objeto
      {
        name: values.name,
        cost: values.cost,
        category: values.category,
      },
    ]);
    // console.log(response);
  });
};

// --------------------------------------------------------------------------------
// Quando iniciarmos o aplicativo, queremos que esses dados sejam pegados
// Para isso vamos utilizar o useEffecs
useEffect(() => {
  Axios.get("http://localhost:3001/getCards").then((response) => {
    // console.log(response);
    // com isso estamos pegando todos os valores e ficando com eles
    SetListGames(response.data);
  });
}, []);

// --------------------------------------------------------------------------------
  return (
    // div para o aplicativo
    <div className="App--container">
      {/* div para a parte do registro */}
      <div className="register--container">
      {/* texto para a tela */}
      <h1 className="register--title">Aplication in React </h1>
    
      <input
        type="text" 
        name="name" 
        placeholder="Nome" 
        className="register--input"
        onChange={handleChangeValues}
      />
      
      <input
      type="text"
      name="cost"
      placeholder="Preço  "
      className="register--input"
      onChange={handleChangeValues}
      />
      <input
      type="text"
      name="category"
      placeholder="Categoria"
      className="register--input"
      onChange={handleChangeValues}
      />
      
     <button className="register--button" onClick={()=>handleClickButton()}>Cadastrar</button>
    </div>
    {typeof listGames !== "undefined" && listGames.map((value) => {
      
       return <Card key={value.id} listCard={listGames} SetListCards={SetListGames}
        // Vamos passar agora os dados do card que serao:
       id={value.idgames}
       name={value.name}
       cost={value.cost}
       category={value.category}
       ></Card>;
    })}
   
    </div>
  );
}

export default App;
