/*import MessageManagerMongo from "../dao/mongo/message.mongo.js";

export const messageService = new MessageManagerMongo();*/

import { MessageDao } from "../dao/factory.js";
import MessageRepository from "../repositories/message.repository.js";

export const messageService = new MessageRepository(MessageDao);