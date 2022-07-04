import React, { Component } from 'react';
import './App.css';
import Nav from './pages/Nav';
import ChallengeSolidity from "../src/abis/ChallengeSolidity.json"
import Web3 from 'web3';
import CrearBilletes  from './pages/CrearBilletes';
import ChangeStock from './pages/ChangeStock';
import ChangeStockTodos from './pages/ChangeStockTodos';
import Balance from './pages/Balance';
import ConvertDemon from './pages/ConvertDemon';









class App extends Component  {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }

    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }

    else {
      window.alert('¡Considera usar Metamask!')
    }

  }


  async loadBlockchainData(){
    const web3 = window.web3
    // Cargar una cuenta
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})
    const networkId = 3
    const networkData = ChallengeSolidity.networks[networkId]

          if(networkData) {
            const abi = ChallengeSolidity.abi
            const address = networkData.address 
            this.setState({address: address})
            const contract = new web3.eth.Contract(abi, address)
            this.setState({contract: contract})
            var balanceAcount = await this.state.contract.methods._totalPesos().call()
            var balance = balanceAcount.toString()
            this.setState({balanceAcount: balance})

    
          var billetesUsados1 = await this.state.contract.methods.balanceOf(this.state.account , 1).call()
            var balance1 = billetesUsados1.toString()
            this.setState({stringBilletes1peso: balance1})

            var billetesUsados5 = await this.state.contract.methods.balanceOf(this.state.account , 5).call()
            var balance5 = billetesUsados5.toString()
            this.setState({stringBilletes5peso: balance5})

            var billetesUsados20 = await this.state.contract.methods.balanceOf(this.state.account , 20).call()
            var balance20 = billetesUsados20.toString()
            this.setState({stringBilletes20peso: balance20})

            var billetesUsados50 = await this.state.contract.methods.balanceOf(this.state.account , 50).call()
            var balance50 = billetesUsados50.toString()
            this.setState({stringBilletes50peso: balance50})

            var billetesUsados100 = await this.state.contract.methods.balanceOf(this.state.account , 100).call()
            var balance100 = billetesUsados100.toString()
            this.setState({stringBilletes100peso: balance100})

            
        for(var i = 0; i< balanceAcount ; i++){
          var balance21 = await this.state.contract.methods.billetesUsados(i).call()
          var balanceString = balance21.toString()
          this.setState({billetesUsadosAS: [
            ...this.state.billetesUsadosAS, balanceString
          ]})
        }
            
          } else {
            window.alert('¡Smart Contract no desplegado en la red!')
          }
        }
        constructor(props) {
          super(props)
          this.state = {
            address: "",
            account: '',
            contract: null,
            balanceAcount: "",
            stringBilletes1peso: "",
            stringBilletes5peso: "",
            stringBilletes20peso: "",
            stringBilletes50peso: "",
            stringBilletes100peso: "",
            billetesUsadosAS: [""]
          
         
          }
        }



  render(){
  return (
    <div className='body'>

    <div className='container'>
    <Nav account= {this.state.account} />
      <Balance address = {this.state.address} balanceAcount = {this.state.balanceAcount}   billetesUsadosAS = {this.state.billetesUsadosAS} stringBilletes1peso= {this.state.stringBilletes1peso} stringBilletes5peso= {this.state.stringBilletes5peso}
     stringBilletes20peso= {this.state.stringBilletes20peso} stringBilletes50peso= {this.state.stringBilletes50peso} stringBilletes100peso= {this.state.stringBilletes100peso} />
       <div className = 'row sends1' >
     <ConvertDemon contract = {this.state.contract} account= {this.state.account} />
     </div>
      <div className = 'row sends'>
        <h2 className="col-md-12" style={{ textAlign :"center"}}>FUNCIONES DEL OWNER</h2>
      <CrearBilletes contract = {this.state.contract} account= {this.state.account} />
      <ChangeStock contract = {this.state.contract} account= {this.state.account} />
      <ChangeStockTodos contract = {this.state.contract} account= {this.state.account} />
     </div>
     
    
      </div>
     </div>
  );
  }
}

export default App;
