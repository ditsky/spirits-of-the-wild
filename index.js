const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const socketServer = http.createServer(app);
const io = socketIo(socketServer);
const port = process.env.PORT || 5000;
var Game = require('./game');

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});



var games = new Map()

function startGame(room_id, users){
    newGame =  new Game(room_id, users)
    games.set(room_id, newGame)
    return newGame
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

io.on('connection', socket => {
    console.log('New Client Conectected');
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    socket.on('add one stone', function(room_id){
        var game = games.get(room_id)
        var stone = game.takeStoneFromBag(true)
        game.bowl.push(stone)
        io.sockets.to(room_id).emit('refresh', game)
    })

    socket.on('take one stone', function(room_id, color, socket_id, animal, position){
        var game = games.get(room_id)
        if (game.bowl.includes(color)) {

            var board1 = game.boards[0]
            var board2 = game.boards[1]
            var board_to_edit = null
            if (board1.animals[0].valueOf() === socket_id.valueOf()){
                board_to_edit = board1
            } else {
                board_to_edit = board2
            }
            if (board_to_edit.animals[animal].addStone(position, color))
                game.takeFromBowl(color)

            io.sockets.to(room_id).emit('refresh', game)

        } else {
            console.log('ERROR NO STONE OF THAT TYPE')
        }
        

    
    })
  
    socket.on('join game', function(room_id, username){
        var clients = io.sockets.adapter.rooms[room_id].sockets;
        var numClients = (typeof clients !== 'undefined') ? Object.keys(clients).length : 0;
        if (numClients != 1) {
            socket.emit('not right # of players');
        } else {
            io.sockets.to(room_id).emit('opponent', username);

            var clientSocket = null
            for (var id in clients){
                clientSocket = io.sockets.connected[id];
            }

            socket.join(room_id);
            socket.emit('game', room_id, username, clientSocket.username);
            users = [socket.id, clientSocket.id]
            newGame = startGame(room_id, users)
            io.sockets.to(room_id).emit('refresh', newGame);
        }
    });
  
    socket.on('host game', function(username){
        var room_id = makeid(5)
        socket.username = username
        socket.join(room_id)
        socket.emit('game', room_id, username, '');
    })
})


socketServer.listen(port, () => console.log(`Listening on port ${port}`));