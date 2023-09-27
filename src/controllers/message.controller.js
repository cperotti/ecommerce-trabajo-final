import { messageService } from "../service/index.js"

class MessageController {
    getMessages = async(req, res)=>{
        try{
            const messages = await messageService.getMessages()
            
            res.send({
                status: 'success',
                payload: messages,
            })
        }catch (error){
            req.logger.error(error)
        }
    }

    createMessage = async(req, res)=>{
        try{
            const message= req.body;
            await messageService.createMessage(message)
    
            const messages= await messageService.getMessages()
            
            res.send({
                status: 'success',
                payload: messages,
            })
         
        }catch (error){
            req.logger.error(error)
        }
    }
}
export default MessageController;