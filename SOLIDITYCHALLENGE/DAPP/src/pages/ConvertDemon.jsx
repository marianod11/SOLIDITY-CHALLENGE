import React,  { Component } from 'react'

class ConvertDemon extends Component {

    ConvertDemon = (cantidad) => {  
        try { 
          this.props.contract.methods.convertDenom( cantidad)
          .send({ from: this.props.account, gas: 1000000})
          .on('transactionHash', function(hash){
            document.getElementById("web3_message").textContent="Combirtiendo billetes...";
          })
          .on('receipt', function(receipt){
            document.getElementById("web3_message").textContent="CAMBIOOOOOO!!!!!!!";    })
          .catch((revertReason) => {
            console.log(revertReason)
          });
        }catch(err){
          console.log(err)
        }
      }
      
  render(){
  return (
   <div className='col-md-6 ' style={{margin:"auto"}}> 
    <p style={{color:"red"}} id="web3_message"></p>
        <h2 > CONVERTIR BILLETES</h2>
        <form onSubmit = {(event) => {
            event.preventDefault()
            const cantidad = this.cantidad.value
        this.ConvertDemon(cantidad )
        }} >  
              <input type= 'text' 
                className='form-control mb-1' 
                placeholder = 'CANTIDAD QUE QUIERAS CONVERTIR'
                ref = {(input) => {this.cantidad = input}} 
            /> 
        <input type = 'submit'
                className= 'btn btn-block btn-success btn-sm'
                value = 'CONVERTIR BILLETES'
        /> 
    </form>
  </div>
   
  )
  }
}

export default ConvertDemon;