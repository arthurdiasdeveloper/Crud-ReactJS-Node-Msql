import React from "react";
import "./card.css";
import FormDialog from "../dialog/dialog";




// vamos passar as props
export default function Card(props) { 
    // return <h1>Card</h1>;
    // constantes e functions do componente Dialog
    // como nossa props está recebendo false, o nosso card inicia fechado
    // vamos colocar-lo para abri com a function handleClick
    const [open, setOpen] = React.useState(false);


    const handleClickCard = () => {
    // Como colocamos true no setOpen, sempre que clicarmos 
    // no nosso card ele irá abrir
    setOpen(true);

    };
    return (


    //iniciei o card  
    <>
    {/* como props, passamos para o FormDialog o open e o SetOpen */}
    {/* Quando clicarmos no formulario, queremos que ele carregue os dados 
    para podermos editar. Nesse caso, no FormDialog, precisamos passar como props
    as constantes utlizadas como: name, cost e category. */}
    <FormDialog open={open} setOpen={setOpen} name={props.name} cost={props.cost} 
    category={props.category}
    // Estamos enviando o listCard e o SetListCard para fazermos as alteraçoes lá
    // no formulário
    listCard={props.listCard} setListCard={props.setListCard} id={props.id}
    
    />

    {/* Vamos implementar o onClick, porque queremos assim que clicar
    no card, recebermos os dados cadastrados. */}
    <div className="card--container" onClick={() => 
    handleClickCard()}>
        {/* agora com o card pronto, vamos organizar a 
        estrutura para aparacer na tela */}
        <h1 className="card--title">{props.name}</h1>
        {/* paragrafo */}
        <p className="card--category">{props.category}</p>
        <p className="car--cost"> R${props.cost}</p>
    </div>

  
    {/* finalizei o card */}
    </>



    )
};
