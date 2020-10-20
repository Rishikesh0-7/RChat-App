const io = require('socket.io')(8000)
const users = {}


io.on('connect',socket=>{
    socket.on('new-user-joined',name=>{
        users[socket.id] = name
        socket.broadcast.emit('user-joined',name)
    })

    socket.on('send-msg',message=>{
        socket.broadcast.emit('recieve-msg' , {message: message , name : users[socket.id]})
    })

    socket.on('disconnect' , message=>{
        socket.broadcast.emit('left' , users[socket.id])
        delete users[socket.id]
    })
})
