var ws = require("nodejs-websocket")
var PORT = 9000
var userNum = 0

// https://github.com/sitegui/nodejs-websocket  参考资料
var server = ws.createServer(function (conn) {
	console.log("New connection")
	userNum++
	conn.nickname = 'user' + userNum
	var mes = {
		type: 'enter',
		data: conn.nickname + ' 进入'
	}
	broadcast(JSON.stringify(mes))
	// 接收到信息
	conn.on("text", function (str) {
		console.log("Received "+str)
		var mes = {
			type: 'message',
			data: conn.nickname + '  say： ' + str
		}
		broadcast(JSON.stringify(mes))
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
		var mes = {
			type: 'leave',
			data: conn.nickname + '离开'
		}
		broadcast(JSON.stringify(mes))
    })
    conn.on('error', function (err) {
        console.log('err: ' + err)
    })
}).listen(PORT)

console.log('已启动')

function broadcast (str) {
	server.connections.forEach((item) => {
		item.sendText(str)
	})
}