import { generateToken } from "../utils/generateTokenJwt.js"
import { userService } from "../service/user.service.js"
import { cartService } from "../service/cart.service.js"
import SessionDto from "../dto/session.dto.js"

class SessionController {
    loginUser = async(req, res)=> {
        try {
            const user = await userService.validateUser({email: req.body.email})

            if(user){
            const dataUser={
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
                last_connection: Date.now(),
            }
    
            const token = generateToken(dataUser)

            if(!user.cartId && user.role === 'user'){
                await cartService.createCart({products: []}, user._id)
            }

            await userService.updateUser({_id:user._id},{last_connection: Date.now()})
            
            res.cookie('cookieUser', token, {
                maxAge: 60*60*10000,
                httpOnly: true
            })

            res.redirect('/views/products')
        }else{
            res.send({status: 'error', error: 'falló autenticación'})
        }
            
        } catch (error) {
            req.logger.error(error)
        }
    }

    failLogin = async (req,res)=>{
        res.send({status: 'error', error: 'falló autenticación'})
    }

    registerUser = async(req,res)=>{
        try {
            let user = await userService.validateUser({email: req.body.email})
            if (user) return res.send({status:'error', error:'Ya existe usuario registrado con etos datos'})

            const newUser =  new SessionDto(req.body)

            await userService.addUser(newUser)

            res.redirect('/views/login')
        
        } catch (error) {
            req.logger.error(error)
        }
    }

    failRegister = async (req,res)=>{
        res.send({status: 'error', error: 'falló autenticación'})
    }

    githubCallback = (req,res)=> {
        req.session.passport.user = {
            _id:req.session.passport.user,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            role: req.user.email === 'adminCoder@coder.com'? "admin":'user',
        }
        res.redirect('/views/products')
    }

    logoutUser = async(req, res)=>{
       await userService.updateUser({email:req.user.email},{last_connection: Date.now()})
        req.session.destroy(err=>{
            if (err) {
                return res.send({status: 'error', error: err})
            }
            res.clearCookie('cookieUser')
            res.redirect("/views/login")
        })
    }
}

export default SessionController;