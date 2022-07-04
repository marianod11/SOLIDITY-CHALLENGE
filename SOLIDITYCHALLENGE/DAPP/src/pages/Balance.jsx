import React, { Component } from 'react';


class Balance extends Component {



  render() {
    return (
      <div className=' row balance'>
       <div className=' col-md-12'>
        <h2 className=''>TOTAL DE PESOS BILLETERA OWNER: <span> $ {this.props.balanceAcount}</span></h2>
        <h2>BILLETES USADOS <span>{this.props.billetesUsadosAS.join(" $")} </span></h2>
        <h2>Address Smart-Contract: <span>  {this.props.address}</span></h2>
       </div>
       <div className='col-md-2'>
          <h2>BILLETE $1</h2>
          <h5>Total: {this.props.stringBilletes1peso}</h5>
       </div>
       <div className='col-md-2'>
          <h2>BILLETE $5</h2>
          <h5>Total: {this.props.stringBilletes5peso}</h5>
       </div>
       <div className='col-md-2'>
          <h2>BILLETE $20</h2>
          <h5>Total: {this.props.stringBilletes20peso}</h5>
       </div>
       <div className='col-md-2'>
          <h2>BILLETE $50</h2>
          <h5>Total: {this.props.stringBilletes50peso}</h5>
       </div>
       <div className='col-md-2'>
          <h2>BILLETE $100</h2>
          <h5>Total: {this.props.stringBilletes100peso}</h5>
       </div>
      </div>
    );
  }
}

export default Balance;
