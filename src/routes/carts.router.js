import { Router } from "express";
import CartsController from "../controllers/carts.controllers.js";
import { authorizaton } from "../middlewares/passportAuthorization.middleware.js";
import { passportAuth } from "../middlewares/passportAuth.middleware.js";

const cartsController = new CartsController();

const router = Router()

router.post('/', passportAuth('jwt'), cartsController.createCart)
router.get('/:cid', passportAuth('jwt'), cartsController.getCart)
router.post('/:cid/product/:pid', passportAuth('jwt'),authorizaton('user'), cartsController.addProductToCart)
router.delete('/:cid/product/:pid', passportAuth('jwt'), authorizaton('user'), cartsController.deleteProductToCart)
router.put('/:cid', passportAuth('jwt'), authorizaton('user'), cartsController.updateCart)
router.put('/:cid/product/:pid', passportAuth('jwt'), authorizaton('user'), cartsController.updateProductToCart)
router.delete('/:cid', passportAuth('jwt'), authorizaton('user'), cartsController.deleteAllProductsToCart)
router.post('/:cid/purchase', passportAuth('jwt'),authorizaton('user'), cartsController.finalizePurchase)


export default router;