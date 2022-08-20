const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band('Queen') );
bands.addBand( new Band('Bon Jovi') );
bands.addBand( new Band('Heroes del silencio') );
bands.addBand( new Band('Metallica') );


//Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado')

    client.emit('active-bands', bands.getBands() );


    //client.on('event', data => { /* … */ });
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });

    /*client.on('mensaje',( payload )=>{
        console.log('Mensaje!!!!'+' * '+payload.nombre+' * '+payload.userid);
        var time = new Date().getTime();
        io.emit('mensaje', { admin:'Nuevo mensaje', userid:time });
    });*/


    client.on('vote-band',( payload )=>{        
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands() );
        //console.table(payload);
    });
    
    client.on('delete-band',( payload )=>{        
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands() );
        console.table(payload);
    });

    client.on('add-band',( payload )=>{
        const newBand = new Band(payload.name);
        bands.addBand(newBand); 
        io.emit('active-bands', bands.getBands() );        
    });
    
    /*client.on('emitir-mensaje',( payload )=>{
        //io.emit('nuevo-mensaje', payload );
        client.broadcast.emit( 'nuevo-mensaje', payload );
        console.table(payload);
    });*/

    


});