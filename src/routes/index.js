import { Router } from 'express';
import productsRouter from '../routes/products.router.js';
import cartsRouter from '../routes/carts.router.js';
import viewsRouter from '../routes/views.router.js';
import sessionRouter from '../routes/session.router.js';
import othersRouter from '../routes/other.router.js';
import userRouter from '../routes/users.router.js';
import paymentsRouter from '../routes/payment.router.js';

const router = Router();

router.use('/api/products', productsRouter);
router.use('/api/carts', cartsRouter);
router.use('/api/users', userRouter)
router.use('/views', viewsRouter);
router.use('/api/session', sessionRouter);
router.use('/others', othersRouter);
router.use('/api/payments', paymentsRouter)

export default router;