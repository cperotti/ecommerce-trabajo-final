class CurrentDto {
    constructor(user){
        this.first_name = user.first_name,
        this.last_name = user.last_name,
        this.email = user.email,
        this.role = user.role,
        this.date_of_birth = user.date_of_birth
    }
}

export default CurrentDto;