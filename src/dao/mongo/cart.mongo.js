import { cartModel } from "./models/cart.model.js"
import { productModel } from "./models/product.model.js"
import { ticketModel } from "./models/ticket.model.js"
import {v4 as uuidv4} from "uuid"
import { userModel } from "./models/user.model.js"

class CartManagerMongo {
    addCart = async(newCart, uid)=>{
        try {
            const cart = await cartModel.create(newCart)
            await userModel.updateOne({_id: uid}, {cartId: cart._id})
            return cart
        } catch (error) {
            return new Error(error)
        }
    }
    getCarts = async()=>{
        try {
            return await cartModel.find()
        } catch (error) {
            return new Error(error)
        }
    }
    getCartById = async(cid)=>{
        try {
            return await cartModel.findOne({_id:cid}).lean()
        } catch (error) {
            return new Error(error)
        }
    }
    addProductToCart = async(cid, pid)=>{
        try {
            const findCart = await cartModel.find({_id: cid})
            const hasProduct = findCart[0].products.find(el => el.product.toString() === pid)
            if(findCart.length > 0){
                if(hasProduct){
                    return await cartModel.updateOne({_id: cid, "products.product": pid}, {$inc: {"products.$.quantity": 1}})
                }else{
                    return await cartModel.updateOne({_id: cid}, {$push:{products:{product: pid, quantity: 1}}})
                }
            }else{
                return 'No exite un carrito con ese id'
            }
        } catch (error) {
            return new Error(error)
        }
    }

    deleteProductToCart = async(cid, pid)=>{
        try {
            const findCart = await cartModel.find({_id: cid})
            const hasProduct = findCart[0].products.find(el => el.product.toString() === pid)
            if(findCart.length > 0){
                if(hasProduct){
                    return await cartModel.updateOne({_id: cid}, {$pull: {products: {product: pid}}})
                }else{
                    return 'no encontramos un producto con ese id en el carrito'
                }
            }else{
                return 'No exite un carrito con ese id'
            }
        } catch (error) {
            return new Error(error)
        }
    }

    updateCart = async(cid, dataCart)=>{
        try {
            const findCart = await cartModel.find({_id: cid})
            if(findCart.length > 0){
                return await cartModel.updateOne({_id: cid}, {$set:{products:dataCart}})
            }else{
                return 'No exite un carrito con ese id'
            }
            
        } catch (error) {
            return new Error(error)
        }
    }

    updateCartProduct = async(cid, pid, dataUpdate)=>{
        try {
            const findCart = await cartModel.find({_id: cid})
            const hasProduct = findCart[0].products.find(el => el.product.toString() === pid)
            if(findCart.length > 0){
                if(hasProduct){
                    return await cartModel.updateOne({_id: cid, "products.product": pid}, {$set: {"products.$.quantity": dataUpdate.quantity}})
                }else{
                    return 'no encontramos un producto con ese id en el carrito'
                }
            }else{
                return 'No exite un carrito con ese id'
            }
            
        } catch (error) {
            return new Error(error)
        }
    }

    deleteAllProducts = async(cid)=>{
        try {
            const findCart = await cartModel.find({_id: cid})
            if(findCart.length > 0){
                return await cartModel.updateOne({_id: cid}, {$set:{products:[]}})
            }else{
                return 'No exite un carrito con ese id'
            }
            
        } catch (error) {
            return new Error(error)
        }
    }

    finalizePurchase = async(cid, dataUser)=>{
        try {
            const cartById = await cartModel.findOne({_id: cid}).lean()
            const noComprado = []

            cartById.products.map(async (dataCart)=>{
                const product = dataCart.product
                const quantity = dataCart.quantity
                const stock = dataCart.product.stock

                if(quantity <= stock){
                    dataCart.product.stock -= quantity
                    await productModel.updateOne({_id: product._id}, dataCart.product)
                }else{
                    noComprado.push(product._id)
                }
            })

            const amount = cartById.products.filter((prod)=> !noComprado.includes(prod._id)).reduce((suma, data)=>{
                return suma += data.product.price * data.quantity
            },0)

            if(noComprado.length > 0){
                const keepProducts = cartById.products.filter((prod)=> noComprado.includes(prod._id))
                await updateCart(cid, keepProducts)

            }else{
                await cartModel.deleteOne({_id: cid})
                await userModel.updateOne({_id: dataUser.id}, {cartId: null})
            }

            return await ticketModel.create({
                code: uuidv4(),
                amount,
                purchaser: dataUser.email
            })

        } catch (error) {
            return new Error(error)
        }
    }
}

export default CartManagerMongo;