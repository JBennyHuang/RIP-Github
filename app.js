var express = require('express');

var app = express();
var router = express.Router();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var socket = require('./socket');

app.use(express.static(__dirname + "/Public"));
app.use(express.static(__dirname + "/node_modules/codemirror/lib"))
app.use(express.static(__dirname + "/node_modules/codemirror/mode"))
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use(express.static(__dirname + "/node_modules/jquery/dist"));
app.use(express.static(__dirname + "/node_modules/angular"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/dashboard.html');
});

app.get("/Benny/project.txt", function (req, res) {
    res.sendFile(__dirname + '/views/file.html');
});

//room
socket.createRoomListener(app, express, io);
socket.addRouteListener(app, express, io);

server.listen(3000, function () {
    console.log("Server has started!");
});
