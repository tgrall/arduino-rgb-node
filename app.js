var five = require("johnny-five"),
    express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);


var board = new five.Board();



board.on("ready", function() {
  var led = new five.Led.RGB([ 11, 10, 9 ]);

  board.on("changeColor", function (color){
    led.color(color);
  });

});


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
});

io.on('connection', function(socket){
  socket.on('changeColor', function(msg){
    board.emit('changeColor', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
