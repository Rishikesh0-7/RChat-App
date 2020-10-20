const socket  = io('http://localhost:3000')
const form = document.getElementById('send-container')
const messageInput = document.getElementById('input')
const messageContainer = document.querySelector('.container')


const appendthemsg = (message,position) =>{
    const messageElement = document.createElement('div')
    messageElement.innerHTML = message
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
}


form.addEventListener('submit' , (e)=>{
    e.preventDefault()
    const message = messageInput.value
    appendthemsg(`You : ${message}` , 'message-right')
    swal("Successfull..!!", "Message has been sent", "success");
    socket.emit('send-msg',message)
    messageInput.value = " "
})

const name = prompt("Enter your name to join")
swal("Joined", `You have joined the chat as ${name}`, "success")
socket.emit('new-user-joined',name)

socket.on('user-joined',name=>{
    appendthemsg(`${name} has joined the chat`,'message-center')
    swal("New User.!!", `${name} has joined the chat`, "success");
})

socket.on('recieve-msg' , data=>{
    appendthemsg(`${data.name} : ${data.message} ` , 'message-left')
    swal("Message Recieved", `You have a message from ${data.name}`, "info")
})

socket.on('left' , name=>{
    appendthemsg(`${name} has left the chat`, 'message-center')
    swal("Oopps...", `${name} has left the chat`, "error");
})