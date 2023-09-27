import { messageService, productService } from "../service/index.js";

export default (io) => {
    io.on('connection', socket=>{
        console.log('Nuevo cliente conectado')
    
        productService.getProducts().then((response)=>{
            socket.emit('products', response.docs )
        })
        .catch(error => console.log(error))
    
        socket.on('newProduct', dataProduct=>{
            productService.createProduct(dataProduct).then(response =>{
                socket.emit('response', response)
            })
            .catch(error => console.log(error))
        })
    
        socket.on('deleteProduct', id =>{
            productService.deleteProduct(id).then(response =>{
                socket.emit('response', response)
            })
            .catch(error => console.log(error))
        })

        messageService.getMessages().then((response)=>{
            socket.emit('messages', response)
        })
        .catch(error => console.log(error))

        socket.on('newMessage', data => {
            messageService.createMessage(data).then(()=>{
                messageService.getMessages().then(getresponse=>{
                    socket.emit('messages', getresponse)
                })
            })
            .catch(error=> console.log(error))
        })
    })
  };