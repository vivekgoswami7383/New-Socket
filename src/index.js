const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')
const {generateMessage} = require('./utils/message')
const { addUser, removeUser, getUser, getUserInRoom } = require('./utils/room')
const { connect } = require('http2')
const port = 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {

	socket.on('connect',(message)=>{
		connectCounter++
	})

	socket.on('join',({username,room}, callback)=>{

		const res = addUser({id : socket.id,username,room})
	  
		if(res.error){
		    return callback(res.error)
		}
		const user = res.user
		socket.join(user.room)

		socket.emit('welcome', generateMessage('Welcome to chat app',user.username))

		socket.broadcast.to(user.room).emit('newUser', generateMessage(`${user.username} is connected`,user.username))

		socket.on('sendMessage', (message) => {
			io.to(user.room).emit('sendMessage',generateMessage(message,user.username))
		})

})
	console.log('New Web Socket Connection');

	socket.on('disconnect', () => {
		const user= removeUser(socket.id)
		if(user){
		io.to(user.room).emit('leftUser', generateMessage(`${user.username} The Chat`))
		}
	})
})

const publicDirectory = path.join(__dirname, '../public')

app.use(express.static(publicDirectory))

server.listen(port, () => {
	console.log(`server running up`);
})
