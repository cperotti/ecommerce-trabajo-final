import { Router } from "express";
import { generateProducts } from "../utils/generateProductsFaker.js"

const router = Router();

router.get('/mockingproducts', (req,res)=>{
    let products = []
    for (let i = 0; i < 100; i++) {
        products.push(generateProducts())       
    }
    res.send({
        status: 'success',
        payload: products
    })

})
router.get('/loggerTest',(req,res)=>{
    req.logger.warning('alerta')

    res.send({messge:'prueba logger'})
})

export default router;