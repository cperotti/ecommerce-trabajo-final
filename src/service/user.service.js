/*import UserManagerMongo from "../dao/mongo/user.mongo.js";

export const userService = new UserManagerMongo();*/

import { UserDao } from "../dao/factory.js";
import UserRepository from "../repositories/user.repository.js";

export const userService = new UserRepository(UserDao);