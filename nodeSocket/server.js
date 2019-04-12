var ws = require("nodejs-websocket")

// https://github.com/sitegui/nodejs-websocket  参考资料
var server = ws.createServer(function (conn) {
	console.log("New connection")
	conn.on("text", function (str) {
		console.log("Received "+str)
		conn.sendText(str.toUpperCase()+"!!!")
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
    })
    conn.on('error', function (err) {
        console.log('err: ' + err)
    })
}).listen(8001)

console.log('已启动')