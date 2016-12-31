var app = require('express')();
var http = require('http').Server(app);

//socket.io löser även cors
var io = require('socket.io')(http);

// var path = require('path');
// var bodyParser = require('body-parser');
// var cors = require('cors');

// var messages = require('./routes/messages');

var port = process.env.PORT || 1337;

// app.use(cors());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/api', messages);

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('add-message', (message, username) => {
        io.emit('message', {type: 'new-message', text: message, username: username});
    });
});

http.listen(port, () => {
    console.log('started on port ' + port);
});