import React,  { Component } from 'react'


class ChangeStockTodos extends Component {

  changeStockTodos = (ids,cantidad) => {  
        try { 
          this.props.contract.methods.changeStockTodos([ids],[cantidad])
          .send({ from: this.props.account, gas: 1000000})
          .on('transactionHash', function(hash){
            document.getElementById("web3_message").textContent="Cargando Stock...";
          })
          .on('receipt', function(receipt){
            document.getElementById("web3_message").textContent="STOCK CARGADO!!!!";    })
          .catch((revertReason) => {
            console.log(revertReason)
          });
        }catch(err){
          console.log(err)
        }
      }
      
      
  render(){
  return (
   <div className='col-md-4 '> 
    <p style={{color:"red"}} id="web3_message"></p>
        <h2 > AGREGAR STROCKS +</h2>
        <form onSubmit = {(event) => {
            event.preventDefault()
            const id = this.id.value
            const cantidad = this.cantidad.value
        this.changeStockTodos(id, cantidad )
        }} >  

        <input type= 'text' 
                className='form-control mb-1' 
                placeholder = 'ID BILLETE = DENOMINACION '
                ref = {(input) => {this.id = input}} 
               
            /> 
              <input type= 'text' 
                className='form-control mb-1' 
                placeholder = 'CANTIDAD QUE QUIERAS'
                ref = {(input) => {this.cantidad = input}} 
            /> 
        <input type = 'submit'
                className= 'btn btn-block btn-success btn-sm'
                value = 'AGREGAR BILLETES'
        /> 
    </form>
  </div>
   
  )
  }
}

export default ChangeStockTodos;