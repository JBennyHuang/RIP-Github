var fs = require('fs');

exports.receiver = function(io) {
    io.on('connection', function(socket) {
        console.log(socket.id + " has connected");
        
        var content = fs.readFileSync('./temp.txt', 'utf8')
        
        io.to(socket.id).emit("text update", content);

        socket.on('text update', function(text) {
            fs.writeFileSync('./temp.txt', text, 'utf8');
        });
    });
};

exports.sender = function(io) {
    io.on('connection', function(socket) {
        socket.on('text update', function(text) {
            socket.broadcast.emit("text update", text);
        });
    });
};





