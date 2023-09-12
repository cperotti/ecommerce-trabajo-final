import { Router } from "express";
import UsersController from "../controllers/users.controller.js";
import { passportAuth } from "../middlewares/passportAuth.middleware.js";
const usersController = new UsersController();

const router = Router();

router.get('/', passportAuth('jwt'), usersController.getUsers);
router.get('/:uid', passportAuth('jwt'), usersController.getUserById);
router.put('/:uid', passportAuth('jwt'), usersController.updateUser);
router.delete('/:uid', passportAuth('jwt'),usersController.deleteUser);
router.delete('/', passportAuth('jwt'), usersController.deleteInactiveUsers);

export default router;