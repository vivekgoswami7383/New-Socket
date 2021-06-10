const socket = io()

const messages = document.getElementById('messages')
const messageTemplate = document.getElementById('messageTemplate').innerHTML
const btnSend = document.getElementById('btnSend')
const inputMessage = document.getElementById('inputMessage')

const {username, room} = Qs.parse(location.search.substr(1),{ ignoreQueryPrefix: true })
socket.emit('join',{username, room}, (error)=>{
    if(error){
        alert(error)
        location.href="/"
    }
})

socket.on('welcome', (message) => {
	console.log(message);
	const html = Mustache.render(messageTemplate, {
		message: message.text,
		time: moment(message.createdAt).format('h:mm a'),
		username : message.username
	})

	messages.insertAdjacentHTML('beforeend', html)
})

socket.on('newUser', (message) => {
	console.log(message);

	const html = Mustache.render(messageTemplate, {
		message: message.text,
		time: moment(message.createdAt).format('h:mm a'),
		username : message.username
	})

	messages.insertAdjacentHTML('beforeend', html)
})

socket.on('connect',(message)=>{
	console.log(message);
})

document.getElementById('message-form').addEventListener('submit', (e) => {

	e.preventDefault()

	btnSend.setAttribute('disabled','disabled')

	const message = document.getElementById('inputMessage').value
	socket.emit('sendMessage', message)
	btnSend.removeAttribute('disabled')

	inputMessage.value = ""
	inputMessage.focus()
})

socket.on('sendMessage', (message) => {
	console.log(message);

	const html = Mustache.render(messageTemplate, {
		message: message.text,
		time: moment(message.createdAt).format('h:mm a'),
		username : message.username
	})
	messages.insertAdjacentHTML('beforeend', html)
})

socket.on('leftUser', (message) => {
	console.log(message);

	const html = Mustache.render(messageTemplate, {
		message: message.text,
		time: moment(message.createdAt).format('h:mm a'),
		username : message.username
	})

	messages.insertAdjacentHTML('beforeend', html)
})