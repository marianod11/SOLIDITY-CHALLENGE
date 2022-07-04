import React, { Component } from 'react';


class Nav extends Component {



  render() {
    return (
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="https://frogames.es/rutas-de-aprendizaje"
            target="_blank"
            rel="noopener noreferrer"
          >
            SOLIDITY CHALLENGE
          </a>
          <ul className="navbar-nav px-3"> 
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block " style={{color:"white"}}>
                ADDRESS: {this.props.account}   
              <small className="text-white"><span id="account"></span></small>

            </li>

           </ul>
        </nav>
    );
  }
}

export default Nav;
