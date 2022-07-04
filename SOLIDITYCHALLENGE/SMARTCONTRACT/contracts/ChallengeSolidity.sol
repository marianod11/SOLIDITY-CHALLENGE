// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
    /*
    -RESUELTO TODOS LOS PUNTOS DEL CHALLENGE.
    -ELIMINADO DEL STANDAR ERC1155 REQUIERE PARA TRASNFERIR.
    -DEPLOYADO EN LA RED ROPSTEN.
  */


  contract SolidityChallenge is ERC1155 {
    uint256 public constant UNOPESOS = 1;
    uint256 public constant CINCOPESOS = 5;
    uint256 public constant VEINTEPESOS = 20;
    uint256 public constant CINCUENTAPESOS = 50;
    uint256 public constant CIENPESOS = 100;

    struct Billetes{
        uint id;
        uint cantidad;
        uint valor;
    }

    address public owner = msg.sender ;

  //MODIFIER OWNER
     modifier onlyOwner (address _direccion){
        require(_direccion == owner);
        _;
    }
  


    mapping(uint=>Billetes) public Billete;
    mapping(uint=> bool) public verificaBillete;
    event ChangeStock(address user, uint id, uint cantidad);

    uint[] public ids;
    uint[] public billetesUsados;
    

    constructor()  ERC1155("https://game.example/api/item/{id}.json") {  
        crearBilletes(UNOPESOS, 50);
        crearBilletes(CINCOPESOS, 5);
        crearBilletes(VEINTEPESOS, 2);
        crearBilletes(CINCUENTAPESOS, 2);
        crearBilletes(CIENPESOS, 20);

        owner = msg.sender;
    
    }
//CREAR NUEVO BILLETE
  function crearBilletes (uint _id, uint _cantidad) public onlyOwner(owner) {
        require(!verificaBillete[_id], "ya estaa este billete");
        Billetes memory newUnPeso = Billetes(
              _id,
              _cantidad,
              _id
        );

        Billete[_id] = newUnPeso;
        verificaBillete[_id] = true;
        ids.push(_id);
      _mint(msg.sender, _id, _cantidad , "");
  }

  //PAGO DE BILLETES
    function convertDenom(uint _cantidad) public  returns(uint[] memory va)  {
      uint totalBilletes = _totalPesos();
      require (_cantidad <= totalBilletes, "no tenemos tanto");

       uint[] memory cantidadDenom= new uint256[](ids.length);
        uint totalPagado ;
        uint i = ids.length ;
        while(i > 0){
          i--;
          while(_cantidad >= Billete[ids[i]].valor && Billete[ids[i]].cantidad > 0){
          _cantidad -= Billete[ids[i]].valor;
          Billete[ids[i]].cantidad -= 1;
          cantidadDenom[i] += 1;
          billetesUsados.push(Billete[ids[i]].valor);
          totalPagado += cantidadDenom[i];
          }
        }                              
        require(totalPagado > 0, "no hay billetes");
        safeBatchTransferFrom(owner,msg.sender,ids, cantidadDenom ,"" );
        return cantidadDenom;
    }

  //RETRUN BALANCE POR BILLETE
    function returnTotalBilletes(uint _id) public view returns(uint algo){
      uint balance = balanceOf(msg.sender, _id);
      return  balance;
    }

  //RETURN TODOS LOS BILLETES
    function returnTotalBilletes() public view returns(uint[] memory total){
        uint256[] memory batchBalances1 = new uint256[](ids.length);
        for (uint256 i = 0; i < batchBalances1.length; ++i) {
                batchBalances1[i] = balanceOf(msg.sender, ids[i]);
            }
          return batchBalances1;
    }

  //AGREGAR STOCK POR BILLETE
    function changeStock(uint _id, uint _cantidad) public onlyOwner(owner) {
      require(_id <= ids.length, "no hay ese id!!" );
        Billete[_id];
         _mint(msg.sender, Billete[_id].id,_cantidad , "");
          Billete[_id].cantidad +=_cantidad;
         emit ChangeStock(msg.sender,Billete[_id].id,_cantidad );
    }

  //AGREGAR TODOS LOS BILLETES O LOS QUE QUIERAS 
    function changeStockTodos(uint[] memory _ids, uint[] memory _cantidad) public onlyOwner(owner) {
      for(uint i = 0; i< _ids.length;i++){
       
        Billete[_ids[i]];
         _mint(msg.sender, Billete[_ids[i]].id, _cantidad[i] , "");
          Billete[_ids[i]].cantidad +=_cantidad[i];
         emit ChangeStock(msg.sender,Billete[i].id,_cantidad[i] );
      }
    }
//TOTAL DE LA SUMA DE TODOS LOS BILLETICOS
    function _totalPesos() public view returns(uint){
      uint totalBilletes;
       for(uint i = 0; i<ids.length; i++){
        totalBilletes += Billete[ids[i]].cantidad * Billete[ids[i]].valor;
      }
      return totalBilletes;
    }

  function returnBilletesUsados() public view returns(uint[] memory){
      return billetesUsados;
    }

}