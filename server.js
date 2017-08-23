'use strict';
var net = require('net');
/**
 * Module dependencies.
 */


var app = require('./config/lib/app');
var server = app.start();

/*var Server = net.createServer((socket) => {
    socket.end('deconnexion');
}).on('error', (err) => {
    console.log(err);
});
Server.listen(3000);

Server.on('connection', function (socket) {
    Server.getConnections(function (err, count) {
        console.log('connexion: ' + count);
    })
});*/