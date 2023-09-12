import {Schema, model} from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = 'products'

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: String, 
    price: {
       type: Number, 
       required: true,
    },
    stock: {
       type: Number, 
       required: true,
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    status:{
        type: Boolean,
        required: true,
    },
    createBy:{
        type: String
    }
})

productSchema.plugin(mongoosePaginate)

export const productModel = model(collection, productSchema);
