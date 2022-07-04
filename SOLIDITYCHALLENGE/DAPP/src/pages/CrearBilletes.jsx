import React,  { Component } from 'react'

class CrearBilletes  extends Component {



  crearBilletes  = (id, cantidad) => {  
        try { 
          this.props.contract.methods.crearBilletes (id,cantidad )
          .send({ from: this.props.account,  gas: 1000000})
          .on('transactionHash', function(hash){
            document.getElementById("web3_message").textContent="Creando Billetes...";
          })
          .on('receipt', function(receipt){
            document.getElementById("web3_message").textContent="CREADOOOOOOOO!!!!";    })
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
     <h2 >CREEAR BILLETES</h2>

  <form onSubmit = {(event) => {
            event.preventDefault()
            const id = this.id.value
            const cantidad = this.cantidad.value
        this.crearBilletes(id, cantidad )
        }} >  

        <input type= 'text' 
                className='form-control mb-1' 
                placeholder = 'ID BILLETE = DENOMINACION QUE VA A TENER'
                ref = {(input) => {this.id = input}} 
            /> 
              <input type= 'text' 
                className='form-control mb-1' 
                placeholder = 'CANTIDAD QUE QUIERAS CREEAR'
                ref = {(input) => {this.cantidad = input}} 
            /> 
        <input type = 'submit'
                className= 'btn btn-block btn-success btn-sm'
                value = 'CREAR BILLETE'
        /> 
    </form>
    </div>
   
  )
  }
}

export default CrearBilletes ;