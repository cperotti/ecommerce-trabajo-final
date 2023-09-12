import {connect} from "mongoose";

let url = 'mongodb://127.0.0.1:27017/ecommerce'

export const configLocalServer = {
    connectDB:()=>{
        connect(url)
        console.log('Base de datos conectada')
    }
}