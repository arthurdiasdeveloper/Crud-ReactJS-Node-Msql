import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
import produce from "immer";

export default function FormDialog(props) {


  // --------------------------------------------------------------------------------
    // Criamos a importaçao do useState e agora criamos a constante
    // editValues e setEditValues para manipularmos os dados.
    // Como talvez eu queria só atulizar um dado como o name, já tenho que inicializar
    // o state (edite value) com os proprios valores padroes alocados.
    const [editValues, setEditValues] = useState({
        id: props.id,
        name: props.name,
        cost: props.cost,
        category: props.category
    });
// --------------------------------------------------------------------------------
    // Vamos criar a function para editar os dados utilizando 
    // o PATH que tem no express
    const handleEditGame = () => {
     
        Axios.put("http://localhost:3001/edit",{
            // Agora precisamos mandar todos os nossos dados para essa funciton.
            id: editValues.id,
            name: editValues.name,
            cost: editValues.cost,
            category: editValues.category,
            
        });
        handleClose();
       
    };
// --------------------------------------------------------------------------------
    const handleDeleteGame = () => {
      // para podemos deletar algo, precisamos enviar por parametros 
      // Ao invés de utlixar Aspas na URL vamos usar Crase para inserirmos
      // JavaScript
      Axios.delete(`http://localhost:3001/delete/${editValues.id}`);
      handleClose();

    };

  





// --------------------------------------------------------------------------------
    const handleClickOpen = () => {
        props.setOpen(true);
    };

// --------------------------------------------------------------------------------
    const handleClose = () => {
        props.setOpen(false);
    };
 // --------------------------------------------------------------------------------
    // Vamos criar a function handleChangeValues para alterar os valores
    const handleChangeValues = (values) => {
      setEditValues((prevValues) => ({
        ...prevValues,
        [values.target.id]: values.target.value,
      }));
    };

// --------------------------------------------------------------------------------
  return (
    
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >


          {/* button editar */}
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>

            {/* TextField Nome do jogo */}
          <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nome do jogo"
           // o Default value props, permite pegar o valor do banco de dados e colocar
        // como padrao
          defaultValue={props.name}
        //   onchange ira chamar a function handle que altera os valores
          onChange={handleChangeValues}
          type="text"
          fullWidth
          />


            {/* TextField Preço */}
         <TextField
          autoFocus
          margin="dense"
          id="cost"
          label="Preço"
           // o Default value props, permite pegar o valor do banco de dados e colocar
        // como padrao
          defaultValue={props.cost}
           //   onchange ira chamar a function handle que altera os valores
           onChange={handleChangeValues}
          type="text"
          fullWidth
          />


            {/* TextField categoria do Jogo */}
         <TextField
          autoFocus
          margin="dense"
          id="category"
          label="Categoria do jogo"
        // o Default value props, permite pegar o valor do banco de dados e colocar
        // como padrao
          defaultValue={props.category}
           //   onchange ira chamar a function handle que altera os valores
           onChange={handleChangeValues}
          type="text"
          fullWidth
          />
         
        </DialogContent>




        <DialogActions>


            {/* Button Cancelar */}
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>


          {/* Button excluir */}
          <Button onClick={() => handleDeleteGame()} color="primary">
            Excluir
          </Button>

          {/* button salvar */}
          {/* o Button salver chama function handleEditGame */}
          <Button  onClick={() => handleEditGame()} color="primary">
            Salvar
          </Button>


        </DialogActions>
      </Dialog>
  );
};