
import { TicketDao } from "../dao/factory.js";
import TicketRepository from "../repositories/ticket.repository.js";

const ticketService = new TicketRepository(TicketDao)

export {ticketService}