var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}



socket.on('connect', function() {
    console.log("Conectado al servidor");

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conectados', resp);
    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexion con el servidor');

});


// //Enviar informacion al servidor
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola mundo'
// }, function(resp) {
//     console.log('Respuesta Server: ', resp);
// });

// Escuchar informacion del servidor
socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor: ', mensaje);
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersona', function(personas) {
    console.log('Servidor: ', personas);
});

// Mensajes privados (accion de escuchar el mensaje privado --> En el servidor)
socket.on('mensajePrivado', function(mensaje) {

    console.log('Mensaje Privado: ', mensaje);

});