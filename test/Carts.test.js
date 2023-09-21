import mongoose from 'mongoose'
import CartManagerMongo from '../src/dao/mongo/cart.mongo.js';
import chai from 'chai';
import { configLocalServer } from '../src/configServer/configLocalServer.js';

configLocalServer.connectDB()
const expect = chai.expect

describe('Testing de Cart Dao', ()=> {
    before(function () {
        this.cartDao = new CartManagerMongo();
    })
    beforeEach(function(){
        // mongoose.connection.collections.carts.drop()
        this.timeout(2000)
    })
    // it('El dao debe poder obtener todos los carts en un arreglo', async function(){
    //     const result = await this.cartDao.getCarts({})
    //     expect(result).to.be.deep.equal([])
    // }).timeout(20000)
    // it('El dao debe poder agregar un producto al carrito', async function(){
    //     const newCart= {products: []}
    //     const cart = await this.cartDao.addCart(newCart)
    //     await this.cartDao.addProductToCart(cart._id, '64e17d09550db00f0b6b7761')
    //     const cartById = await this.cartDao.getCartById(cart._id)
    //     expect(cartById.products[0].product._id.toString()).to.equal('64e17d09550db00f0b6b7761');
    // }).timeout(20000)
    // it('El dao debe poder editar un producto que ya este agregado en el carrito', async function(){
    //     const updateDataProduct = {
    //         quantity:2
    //     }
    //     await this.cartDao.updateCartProduct('64e18294494ae54cc8c2c2c6', '64e17d09550db00f0b6b7761',updateDataProduct)
    //     const cartById = await this.cartDao.getCartById('64e18294494ae54cc8c2c2c6')
    //     expect(cartById.products[0]).to.have.property('quantity', updateDataProduct.quantity)
    // }).timeout(20000)
    it('El dao debe poder eliminar un producto que ya este agregado en el carrito', async function(){
        await this.cartDao.deleteProductToCart('64e18294494ae54cc8c2c2c6','64e17d09550db00f0b6b7761' )
        const cartById = await this.cartDao.getCartById('64e18294494ae54cc8c2c2c6')
        const has_product = cartById.products.find(el=> el._id.toString() === '64e17d09550db00f0b6b7761' )
        expect(has_product).to.equal(undefined);
    }).timeout(20000)
})
