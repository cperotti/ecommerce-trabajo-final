import TicketDto from "../dto/ticket.dto.js"

class TicketRepository{
    constructor(dao){
        this.dao = dao
    }

    createTicket = async(ticket)=>{
        let dataNewTicket = new TicketDto(ticket)
        let result = await this.dao.addTicket(dataNewTicket)
        return result
    }
}

export default TicketRepository;