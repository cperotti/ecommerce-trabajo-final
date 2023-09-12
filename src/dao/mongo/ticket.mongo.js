import { ticketModel } from "./models/ticket.model.js";

class TicketManagerMongo {
    addTicket = async(newTicket)=>{
        try{
            return await ticketModel.create(newTicket)
        }catch(error){
            return new Error(error)
        }
    }
}
export default TicketManagerMongo;