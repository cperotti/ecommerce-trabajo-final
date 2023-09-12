import {Schema, model} from "mongoose";

const collection = 'carts'

const cartSchema = new Schema({
    products: [{
        product:{
            type:Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity:Number
    }],
})

cartSchema.pre('findOne',function(){
    this.populate("products.product")
})

export const cartModel = model(collection, cartSchema)