import { Router } from "express";
import passport from "passport";
import SessionController from "../controllers/session.controller.js";
import { passportAuth } from "../middlewares/passportAuth.middleware.js";
import { authorizaton } from "../middlewares/passportAuthorization.middleware.js";
import CurrentDto from "../dto/current.dto.js";

const sessionController = new SessionController()

const router = Router();

router.post('/login', /*passport.authenticate('login', {failureRedirect:'/api/session/faillogin'})*/ sessionController.loginUser)

router.get('/faillogin', sessionController.failLogin)

router.post('/register', /*passport.authenticate('register', {successRedirect:'/views/login', failureRedirect: '/api/session/failregister'})*/ sessionController.registerUser)

router.get('/failregister', sessionController.failRegister)

router.get('/github', passport.authenticate('github', {scope: ['user:email']}),()=>{})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/views/login'}),sessionController.githubCallback)

router.get('/logout', passportAuth('jwt'),sessionController.logoutUser)

router.get('/current', 
        passportAuth('jwt'), 
        authorizaton('user'),
        (req, res)=> {
            const dataUser = new CurrentDto(req.user)
            res.send(dataUser)
        })


export default router;