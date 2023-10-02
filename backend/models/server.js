const express = require('express')
const cors = require('cors');
const route = require('../route/fonasa.route');

class Server {

  constructor(){

    this.app = express();
    this.middleWares();
    this.routes();
  }

  middleWares(){
    this.app.use(cors())
    this.app.use(express.json())
  }

  listen(){
    this.app.listen(80, ()=> console.log('Encendido'))
  }

  routes(){
    this.app.use('/buscadorFonasa',route)
  }
}


module.exports = Server;
