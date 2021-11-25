

class Sockets {

    // Recibimos el parametro io del server por el metodo configurarSockets
    constructor( io ) {

        this.io = io;

        this.socketEvents();

    }

    socketEvents() {

        // El argumento "socket" (socket del servidor) hace referencia al cliente que se conecta
        this.io.on('connection', ( socket ) => { 
            //console.log(socket.id);

            
            // Escuchamos un mensaje proveniente del cliente
            socket.on( 'mensaje-para-servidor', (data) => {
                console.log(data);

                // Ahora enviamos (emit) el mensaje del servidor al cliente
                //socket.emit( 'menseje-del-servidor', data );


                // io para emitir los mensajes a todas las personas conectadas
                this.io.emit( 'menseje-del-servidor', data );

            });
        });

    }

}

module.exports = Sockets;