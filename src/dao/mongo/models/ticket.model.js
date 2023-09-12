import { Schema, model } from "mongoose";

const collection = 'tickets'

const ticketSchema = new Schema({
    code:{
        type: String,
        unique: true,
        require: true,
    },
    purchase_datetime:{
        type: Date,
        require: true,
        default: Date.now()
    },
    amount:{
        type: Number,
        require: true,
    },
    purchaser:{
        type: String,
        require: true,
    }
})

export const ticketModel = model(collection, ticketSchema);