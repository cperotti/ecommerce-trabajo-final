import { sendMail } from "../../utils/sendMail.js";
import { userModel } from "./models/user.model.js";
import moment from "moment";

class UserManagerMongo {

    getUsers = async() =>{
        try {
            return await userModel.find({})
        } catch (error) {
            return new Error(error)
        }
    }

    getUserById = async(uid)=>{
        try {
            return await userModel.findOne({_id: uid})
        } catch (error) {
            return new Error(error)
        }
    }

    validateUser = async(data)=>{
        try {
            return await userModel.findOne(data); 
        } catch (error) {
            return new Error(error)
        }
    }

    existUserRegister = async(email)=>{
        try {
            return await userModel.findOne({email});
        } catch (error) {
            return new Error(error)
        }
    }

    addUser = async(newUser)=>{
        try {
            return await userModel.create(newUser)
        } catch (error) {
            return new Error(error)
        }
    }

    updateUser = async(dataFindUser, dataReplace)=>{
        try {
            return await userModel.updateOne(dataFindUser, dataReplace)
        } catch (error) {
            return new Error(error)
        }
    }

    deleteUser = async(uid)=>{
        try {
            return await userModel.deleteOne({_id: uid})
        } catch (error) {
            return new Error(error)
        }
    }

    deleteInactiveUsers = async()=>{
        try {
            let users = await this.getUsers();
            let subject = 'Ecommerce'
            let html = `<div>
                <h1>Hola!, si te llegó este mail es para informate que tu cuenta fue eliminada por pasar mas de 2 dias sin actividad</h1>
            </div>`
        
            users.map( async(u)=>{
                if(u.last_connection){
                    const ultimaConexion = moment(u.last_connection)
                    const fechaActual = moment(Date.now())
                    const tiempoInactividad = fechaActual.diff(ultimaConexion,'d')
    
                    if(tiempoInactividad > 2){
                        await sendMail(u.email, subject, html)
                        return await userModel.deleteOne({_id: u._id})
                    }
                }
            })
        } catch (error) {
            return new Error(error)
        }
    }

}

export default UserManagerMongo;