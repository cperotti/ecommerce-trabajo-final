import { Router } from "express";

const router = Router()

router.post('/payment-intents', async(req,res)=>{
    
    res.send({
        status:'success',
        payload:''
    })
})

export default router