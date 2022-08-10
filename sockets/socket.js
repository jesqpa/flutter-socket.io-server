const { io } = require('../index');

//Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado')
    //client.on('event', data => { /* … */ });
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });

    client.on('mensaje',( payload )=>{
        console.log('Mensaje!!!!'+' * '+payload.nombre+' * '+payload.userid);
        var time = new Date().getTime();
        io.emit('mensaje', { admin:'Nuevo mensaje', userid:time });
    });


});