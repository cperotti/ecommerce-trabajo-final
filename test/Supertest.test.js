import chai from "chai";
import supertest from "supertest";

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing de ecommerce', ()=>{
    describe('Test de productos', ()=>{
        it('El endpoint de Post /api/products debe crear un producto correctamente', async ()=>{
            const userAdminMock = {
                email: "coderadmin@admin.com",
                password: "coderadmin123",
            }
            const result = await requester.post('/api/session/login').send(userAdminMock)
            // const cookieResult = result.headers['set-cookie'][0]
            // expect(cookieResult).to.be.ok
            console.log(result)
            // const productMock = {
            //     title: 'Producto prueba',
            //     description: 'Es un producto de prueba',
            //     thumbnail: '', 
            //     price: 100,
            //     stock: 37,
            //     code: '015',
            //     category: 'prueba',
            //     status:true
            // }
            // const {statusCode, _body, ok} = await requester.post('/api/products/').send(productMock)
            // console.log(statusCode)
            // console.log(_body)
            // console.log(ok)
            // expect(_body.payload).to.have.property('_id')
        })
        
    })
})
