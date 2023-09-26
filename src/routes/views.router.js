import {Router} from 'express';
import { passportAuth } from '../middlewares/passportAuth.middleware.js';
import { authorizaton } from '../middlewares/passportAuthorization.middleware.js'
import ViewsController from '../controllers/views.controllers.js';

const viewsController = new ViewsController();

const router = Router();

router.get('/messages', viewsController.getMessages)
router.post('/messages', passportAuth('jwt'), authorizaton('user'), viewsController.createMessage)
router.get('/products', passportAuth('jwt'),viewsController.getProductData)
router.get('/products/:pid', viewsController.getProductById)
router.get('/carts/:cid', passportAuth('jwt'), authorizaton('user'), viewsController.getCartData)
router.get('/login', viewsController.getLoginView)
router.get('/register', viewsController.getRegisterView)
router.get('/users', passportAuth('jwt'), authorizaton('admin'), viewsController.getUsers)

export default router;