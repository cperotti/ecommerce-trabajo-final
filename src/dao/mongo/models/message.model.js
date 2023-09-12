import { Schema, model } from "mongoose";

const collection = 'messages'

const messageSchema = new Schema({
    user: String,
    message: String
})

export const messageModel = model(collection, messageSchema)