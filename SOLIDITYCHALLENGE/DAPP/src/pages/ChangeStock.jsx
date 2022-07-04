import React,  { Component } from 'react'



class ChangeStock extends Component {
  changeStock = (id, cantidad) => {  
        try { 
          this.props.contract.methods.changeStock(id, cantidad)
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
        <h2 > AGREGAR STOCK</h2>
        <form onSubmit = {(event) => {
            event.preventDefault()
            const id = this.id.value
            const cantidad = this.cantidad.value
        this.changeStock(id, cantidad )
        }} >  

        <input type= 'text' 
                className='form-control mb-1' 
                placeholder = 'ID BILLETE = DENOMINACION'
                ref = {(input) => {this.id = input}} 
            /> 
              <input type= 'text' 
                className='form-control mb-1' 
                placeholder = 'CANTIDAD QUE QUIERAS AGREGAR'
                ref = {(input) => {this.cantidad = input}} 
            /> 
        <input type = 'submit'
                className= 'btn btn-block btn-success btn-sm'
                value = 'AGREGAR BILLETE'
        /> 
    </form>
  </div>
   
  )
  }
}

export default ChangeStock;