class MessageDto {
    constructor(message){ //reveer como viene la data
        this.user = message.user,
        this.message = message.message
    }
}

export default MessageDto;