var express = require('express');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var receive = require('./io');

app.use(express.static("public"));
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));

app.get("/", function(req,res){
    res.sendFile(__dirname + '/views/home.html');
});

receive.receiver(io);
receive.sender(io);

http.listen(3000 , function(){
    console.log("Server has started!");
});

