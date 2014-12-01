'use strict';

var WebSocketServer = require('websocket').server;
var http = require('http');
var clients = [];
var messageManager = new MessageManager(50);
var allowedOrigins = [/^http:\/\/localhost/, /^http:\/\/127.0.0.1/, /^http:\/\/nathanfriend.com/, /^http:\/\/www.nathanfriend.com/, /^http:\/\/dev.nathanfriend.com/, /^http:\/\/nathanfriend.cloudapp.net/, /^http:\/\/www.nathanfriend.cloudapp.net/];

var server = http.createServer(function (request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function () {
    console.log((new Date()) + ' Server is listening on port 8080');
});

var wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

wsServer.on('request', function (request) {
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    var connection = request.accept('nodechat-protocol', request.origin);
    clients.push(connection);
    console.log((new Date()) + ' Connection accepted.');

    //send history of chat to client
    connection.sendUTF(JSON.stringify({
        type: 'history',
        messages: messageManager.getMessages()
    }));

    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            messageManager.addMessage(message.utf8Data);

            clients.forEach(function (element, index, array) {
                if (element !== connection) {
                    element.sendUTF(message.utf8Data);
                }
            });
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');

            clients.forEach(function (element, index, array) {
                if (element !== connection) {
                    element.sendBytes(message.binaryData);
                }
            });
        }
    });

    connection.on('close', function (reasonCode, description) {
        clients.splice(clients.indexOf(connection), 1);
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});

function originIsAllowed(origin) {
    var isAllowed = false;
    allowedOrigins.forEach(function (element, index, array) {
        if (element.test(origin)) {
            isAllowed = true;
        }
    });

    return isAllowed;
}

function MessageManager(size) {

    if (size <= 0) {
        throw "MessageManager size must be greater than 0";
    }

    var queue = [];
    this.messageCount = 0;

    this.addMessage = function (object) {
        if (queue.length === size) {
            queue.shift();
        }

        queue.push(object)
        this.messageCount = queue.length;
    };

    this.getMessages = function () {
        return queue;
    };
}