import { Router } from "express";
import ProductsController from "../controllers/products.controllers.js";
import { authorizaton } from "../middlewares/passportAuthorization.middleware.js";
import { passportAuth } from "../middlewares/passportAuth.middleware.js";

const productsController = new ProductsController();

const router = Router();

router.get('/', passportAuth('jwt'), productsController.getProducts)

router.get('/:pid', passportAuth('jwt'), productsController.getProduct)

router.post('/', passportAuth('jwt'), authorizaton('admin'), productsController.createProduct)

router.put('/:pid', passportAuth('jwt'), authorizaton('admin'), productsController.updateProduct)

router.delete('/:pid', passportAuth('jwt'), authorizaton('admin'), productsController.deleteProduct)

export default router;