import { EError } from "../utils/CustomeError/EErrors.js";

export const errorHandler =(error, req, res, next)=>{
    switch(error.code){
        case EError.INVALID_TYPE_ERROR:
            return res.send({status:'error', error: error.name})
            break;
        case EError.DATABASE_ERROR:
            return res.send({status:'error', error: error.name})
            break;
        case EError.ROUTING_ERROR:
            return res.send({status:'error', error: error.name})
            break;

        default:
            return res.send({status:'error', error:'otro error'})
            break;
    }
}