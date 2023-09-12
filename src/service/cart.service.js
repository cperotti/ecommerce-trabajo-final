/*import CartManagerMongo from "../dao/mongo/cart.mongo.js";

export const cartService = new CartManagerMongo();*/

import { CartDao } from "../dao/factory.js";
import CartRepository from "../repositories/cart.repository.js";

export const cartService = new CartRepository(CartDao);