import jwt from 'jsonwebtoken'

export const generateToken = (objUser) =>{
    return jwt.sign(objUser, process.env.JWT_SECRET_KEY, {expiresIn: '1d'})
}
