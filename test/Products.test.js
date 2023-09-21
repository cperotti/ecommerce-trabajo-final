import ProductManagerMongo from "../src/dao/mongo/product.mongo.js";
import Assert from 'assert';
import { configLocalServer } from "../src/configServer/configLocalServer.js";
import mongoose from "mongoose";

configLocalServer.connectDB()

const assert = Assert.strict

describe('Testing de Product Dao', ()=>{
    before(function(){
        this.productDao = new ProductManagerMongo();
    })
    beforeEach(function(){
        // mongoose.connection.collections.products.drop()
        this.timeout(20000)
    })
    it('El dao debe traer un producto correctamente de la base de datos', async function(){
        const result = await this.productDao.getProducts()
        assert.strictEqual(Array.isArray(result.docs), true)
    }).timeout(20000)
    it('El dao debe crear un producto correctamente en la base de datos', async function(){
        let productMock = {
            title: 'Producto prueba',
            description: 'Es un producto de prueba',
            thumbnail: '', 
            price: 100,
            stock: 37,
            code: '001',
            category: 'prueba',
            status:true
        }
        const result = await this.productDao.addProduct(productMock)
        const product = await this.productDao.getProductById(result.id)
        assert.strictEqual(typeof product, 'object')
    }).timeout(20000)
    // it('El dao debe modificar un producto correctamente de la DB', async function(){
    //     const _id = '64e028c0fe714bab2504159a'
    //     let productUpdate = {
    //         stock: 30,
    //     }
    //     const result = await this.productDao.updateProduct(_id, productUpdate)
    //     const product = await this.productDao.getProductById(_id)
    //     assert.strictEqual(product.stock, productUpdate.stock)
    // }).timeout(20000)
    // it('El dao debe eliminar un producto correctamente de la DB', async function(){
    //     const _id = '64e028c0fe714bab2504159a'
    //     const result = await this.productDao.deleteProduct(_id)
    //     assert.strictEqual(typeof result, 'object')
    // }).timeout(20000)
})