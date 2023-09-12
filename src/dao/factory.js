import { configServer } from "../configServer/configServer.js";
import ProductManagerMongo from "./mongo/product.mongo.js";
import CartManagerMongo from "./mongo/cart.mongo.js";
import UserManagerMongo from "./mongo/user.mongo.js";
import MessageManagerMongo from "./mongo/message.mongo.js";
import ProductManager from './fileSystem/ProductManager.js'
import CartsManager from "./fileSystem/CartManager.js";
import TicketManagerMongo from "./mongo/ticket.mongo.js";

let UserDao
let ProductDao
let CartDao
let MessageDao
let TicketDao

switch (configServer.persistence){
    case 'MONGO':
        //mongo conection
        configServer.connectDB()
        const userMongo = new UserManagerMongo();
        const productMongo = new ProductManagerMongo();
        const cartMongo = new CartManagerMongo();
        const messageMongo = new MessageManagerMongo();
        const ticketMongo = new TicketManagerMongo();

        UserDao = userMongo
        ProductDao = productMongo
        CartDao = cartMongo
        MessageDao = messageMongo
        TicketDao = ticketMongo

        break;
    case 'FILE':
        //file conection
        const productFile = new ProductManager();
        const cartFile = new CartsManager();

        ProductDao = productFile
        CartDao = cartFile
        break;
    case 'MEMORY':
        //memory conection
        break;

    default:
        break;
}

export {UserDao, ProductDao, CartDao, MessageDao, TicketDao}