
class UserRepository{
    constructor(dao){
        this.dao = dao
    }

    getUsers = async()=>{
        let result = await this.dao.getUsers();
        return result
    }

    getUserById = async(uid)=>{
        let result = await this.dao.getUserById(uid);
        return result
    }

    validateUser = async(data)=>{
        let result = await this.dao.validateUser(data);
        return result
    }

    addUser = async(newUser)=>{
        let result = await this.dao.addUser(newUser);
        return result
    }

    updateUser = async(dataFindUser, dataReplace)=>{
        let result = await this.dao.updateUser(dataFindUser, dataReplace);
        return result
    }

    deleteUser = async(uid)=>{
        let result = await this.dao.deleteUser(uid);
        return result
    }

    deleteInactiveUsers = async()=>{
        let result = await this.dao.deleteInactiveUsers();
        return result
    }

}

export default UserRepository;