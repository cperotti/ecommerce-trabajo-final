import { Router } from "express";
import UsersController from "../controllers/users.controller.js";
import { passportAuth } from "../middlewares/passportAuth.middleware.js";
import { authorizaton } from "../middlewares/passportAuthorization.middleware.js";

const usersController = new UsersController();

const router = Router();

router.get('/', passportAuth('jwt'), usersController.getUsers);
router.get('/:uid', passportAuth('jwt'), usersController.getUserById);
router.put('/:uid', passportAuth('jwt'), authorizaton('admin'), usersController.updateUser);
router.delete('/:uid', passportAuth('jwt'),authorizaton('admin'),usersController.deleteUser);
router.delete('/', passportAuth('jwt'),authorizaton('admin'), usersController.deleteInactiveUsers);

export default router;