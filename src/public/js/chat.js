console.log('Socket')
const socket = io()

let user = document.getElementById('user');
let message = document.getElementById('message');
let formMessage = document.querySelector('#formMessage');

socket.on('messages', data => {
    let messagesList = document.getElementById('messages')
    let messages = ''
    data.forEach(({user, message}) => {
        messages += `<li class="list-group-item">${user} dice: ${message}</li>`
    })
    messagesList.innerHTML = messages
})
formMessage.addEventListener('submit', evento=>{
    evento.preventDefault()
    socket.emit('newMessage', {
        user: user.value,
        message:message.value,
    })

    user.value = ''
    message.value= ''

})
