import { CartDao } from "../dao/factory.js";
import CartRepository from "../repositories/cart.repository.js";

export const cartService = new CartRepository(CartDao);