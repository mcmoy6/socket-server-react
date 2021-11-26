// Servidor de Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const Sockets  = require('./sockets');
const cors     = require('cors');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer( this.app );

        // Configuración del socket server
        this.io = socketio( this.server, { cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"]
          } } );
    }

    middlewares() {
        // Desplegar el directorio de la carpeta publica
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

        // Habilitar CORS
        this.app.use( cors() );
    }

    configurarSockets() {

        // Creamos la instancia de la clase Sockets
        // Y enviamos el parametro io ( this.io ) al constructor de la clase Sockets
        new Sockets( this.io );
    }

    execute() {

        // Inicializar Midlewares
        this.middlewares();

        // Inicializar Sockets
        this.configurarSockets();


        // Inicializar el server
        this.server.listen(this.port, () => {
            console.log('Server corriendo en el puerto:', this.port);
        });

    }
}

module.exports = Server;