import { UserDao } from "../dao/factory.js";
import UserRepository from "../repositories/user.repository.js";

export const userService = new UserRepository(UserDao);