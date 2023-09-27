import { Router } from "express";
import { passportAuth } from "../middlewares/passportAuth.middleware.js";
import { authorizaton } from "../middlewares/passportAuthorization.middleware.js";
import MessageController from "../controllers/message.controller.js";

const messageController = new MessageController();

const router = Router();

router.get('/messages', messageController.getMessages)
router.post('/messages', passportAuth('jwt'), authorizaton('user'), messageController.createMessage)

export default router;