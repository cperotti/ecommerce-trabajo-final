import UserDto from "../dto/user.dto.js";
import { userService } from "../service/index.js";

class UsersController {
    getUsers = async(req, res)=>{
        try {
            const response = await userService.getUsers();

            const modifyResponse = response.map(user=>{
                return new UserDto(user);
            })

            res.send({
                status: 'success',
                payload: modifyResponse,
            })
            
        } catch (error) {
            req.logger.error(error)
        }
    }

    getUserById = async(req, res)=>{
        try {
            let {uid} = req.params;
            const response = await userService.getUserById(uid)

            res.send({
                status:'success',
                payload: response,
            })

        } catch (error) {
            req.logger.error(error)
        }
    }

    updateUser = async(req, res)=>{
        try {
            let {uid} = req.params;
            let dataReplace = req.body;
            let response = await userService.updateUser({_id:uid}, dataReplace)
            res.send({
                status:'success',
                payload: response,
            })
            
        } catch (error) {
            req.logger.error(error)
        }
    }

    deleteUser = async(req, res)=>{
        try {
            let {uid} = req.params
        
            let response = await userService.deleteUser(uid);

            res.send({
                status:'success',
                payload: response,
            })
            
        } catch (error) {
            req.logger.error(error)
        }
    }

    deleteInactiveUsers = async(req, res)=>{
        try {
            let response = await userService.deleteInactiveUsers();
            res.send({
                status: 'success',
                payload: response
            })
            
        } catch (error) {
            req.logger.error(error)
        }
    }
}

export default UsersController;