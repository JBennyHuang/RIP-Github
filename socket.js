var fs = require('fs');

exports.createRoomSpeaker = function(io) {

};

var users = [];

exports.createRoomListener = function(app, express, io) {
    io.on('connection', function(socket) {
        socket.on('join room', function(room_id) {
            socket.join(room_id);
            
            console.log(socket.id + " has connected to " + room_id);

            var content = fs.readFileSync('.' + room_id, 'utf8');

            io.to(socket.id).emit("text update", content, -1);

            io.in(room_id).clients((err, clients) => {
                users = clients;
            });

            io.to(room_id).emit("join_room", users);
        });
        
        socket.on('text update', function(room_id, text, pos) {
            // authenticate user's privileges

            fs.writeFileSync('.' + room_id, text, 'utf8');

            socket.to(room_id).emit("text update", text, pos);
        });

        socket.on('caret update', function(room_id, start) {
            io.to(room_id).emit('caret update', start, socket.id);
        });
    });
};

var expressRR = require('express-route-reload');

const router = new expressRR.ReloadRouter()

exports.addRouteListener = function(app, express, io) {
    app.use(router.handler())

    io.on('connection', function(socket) {
        socket.on('add route', function(route, file) {
            newRouter = express.Router();
    
            newRouter.get(route, function (req, res, next) {
                res.sendFile(__dirname + file)
            });
    
            router.reload([newRouter]);
        });
    });
};

