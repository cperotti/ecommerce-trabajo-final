import fs from 'fs'

export default class CartsManager {
    constructor(path){
        this.path=path;
    }

    createFile = async() => {
        try{
            let cartsJson = JSON.stringify([], null, 2)
            await fs.promises.writeFile(this.path, cartsJson, 'utf-8')
            return 'Archivo creado con éxito'
        }
        catch (error){
            req.logger.error(error)
        }
    }

    addCart = async() =>{
        try{
            const cartsParse = await this.getCarts();

            const idCart = cartsParse.length === 0 ? 1 : cartsParse[cartsParse.length-1].id +1
            cartsParse.push({id: idCart, products:[]})

            let cartsJson = JSON.stringify(cartsParse, null, 2)
            await fs.promises.writeFile(this.path, cartsJson, 'utf-8')

            return 'Carrito agregado exitosamente'
        }
        catch (error) {
            req.logger.error(error)
        }
    }

    getCarts = async() =>{
        try{
            let dataFile =  await fs.promises.readFile( this.path, 'utf-8')
            const productsParse = await JSON.parse(dataFile);
            return productsParse
        }
        catch (error){
            req.logger.error(error)
        }
    }

    getCartById = async(id) =>{
        try{
            const cartsParse = await this.getCarts()

            const cartSearch = cartsParse.find(cart => cart.id === id)
            if(cartSearch){
                return cartSearch.products
            }else{
                return "Not found"
            }
        }
        catch (error){
            req.logger.error(error)
        }
    }

    addProductToCart = async(cartId, productId) =>{
        try{
            const cartsParse = await this.getCarts()

            //reveer como hacerlo
            const addProducts = cartsParse.map((cart)=>{
                if(cart.id === cartId){
                    if(cart.products.length === 0){
                        return{
                            ...cart,
                            products: [{product: productId, quantity: 1}]
                        }
                    }else{
                        const productSearch = cart.products.find(prod => prod.product === productId);

                        if(productSearch){
                            return{
                                ...cart,
                                products: cart.products.map((prod)=>{
                                    if(prod.product === productId){
                                        return{
                                            ...prod,
                                            quantity: prod.quantity + 1
                                        }
                                    }
                                    return prod
                                })
                            }
                        }else{
                            return{
                                ...cart,
                                products: [...cart.products, {product: productId, quantity:1}]
                            }
                        }

                        
                    }
                }
                return cart
            })

            let productsJson = JSON.stringify(addProducts, null, 2)
            await fs.promises.writeFile(this.path, productsJson, 'utf-8')

            return 'Producto Agregado exitosamente'
    
        }
        catch (error) {
            req.logger.error(error)
        }
    }

}