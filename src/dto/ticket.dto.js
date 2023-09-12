class TicketDto {
    constructor(ticket){
        this.code= ticket.code,
        this.amount = ticket.amount,
        this.purchaser= ticket.purchaser
    }
}

export default TicketDto;