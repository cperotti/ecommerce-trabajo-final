import MessageDto from "../dto/message.dto.js";

class MessageRepository{
    constructor(dao){
        this.dao = dao
    }

    getMessages = async()=>{
        let result = await this.dao.getMessages();
        return result
    }
    createMessage = async(message)=>{
        let dataNewMessage = new MessageDto(message)
        let result = await this.dao.addMessage(dataNewMessage)
        return result
    }
}

export default MessageRepository;