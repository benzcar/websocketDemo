// https://socket.io/get-started/chat/ 参考资料
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var userNum = 0 

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	userNum++
	socket.nickname = 'user' + userNum
	io.emit('enter', socket.nickname + ' 进入')

	socket.on('message', function(msg){
		console.log('message: ' + msg);
	    io.emit('message', socket.nickname + '  say： ' + msg);
	});

	socket.on('disconnect', function(){
	    io.emit('leave', socket.nickname + '  left ');
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});