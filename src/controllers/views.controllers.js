import {productService, cartService, userService } from "../service/index.js";

class ViewsController {

    getProductData = async(req,res)=>{
        try {
            let {limit, sort, status, category, query,page} = req.query
            const products = await productService.getProducts(limit, sort,status, category, query, page)
            const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = products;

            const user = await userService.getUserById(req.user.id)

            if(!user.cartId && user.role === 'user'){
                await cartService.createCart({products: []}, user._id)
            }

            res.render('products',{
                status: 'success',
                payload: docs,
                userData:req.user,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                totalPages,
                prevLink: hasPrevPage ? `/views/products?page=${prevPage}&limit=${limit?limit:10}${sort ?`&sort=${sort}`:''}${category ?`&category=${category}`:''}${status ?`&status=${status}`:''}`:null,
                nextLink: hasNextPage ? `/views/products?page=${nextPage}&limit=${limit?limit:10}${sort ?`&sort=${sort}`:''}${category ?`&category=${category}`:''}${status ?`&status=${status}`:''}`: null,
                linkCarrito:`/views/carts/${user.cartId}`,
                isUser: req.user.role === 'user',
                isAdmin:req.user.role === 'admin',
            })
            
        } catch (error) {
            req.logger.error(error)
        }
    }

    getProductById = async(req, res)=>{
        try {
            let {pid} = req.params;
            let response = await productService.getProduct(pid)

            const user = await userService.getUserById(req.user.id)
    
            res.render('productId',{
                detail:response, 
                linkProductos: '/views/products',
                linkAddProductToCart:`/api/carts/${user.cartId}/product/${pid}`
            })
        } catch (error) {
            req.logger.error(error)
        }
    }

    getCartData = async(req, res)=>{
        try {
            let {cid} = req.params;
            let response = await cartService.getCart(cid)
    
            res.render('cartId',{
                cart:response, 
                hasCart: response.products.length >0,
                linkProductos: '/views/products',
                linkpurchase:`/api/carts/${cid}/purchase`
            })
        } catch (error) {
            req.logger.error(error)
        }
        
    }

    getLoginView = (req, res)=>{
        res.render('login', {})
    }

    getRegisterView = (req, res)=>{
        res.render('register', {})
    }

    getUsers = async(req, res)=>{
        let response = await userService.getUsers()

        res.render('users',{
            usersList:response, 
            hasUsers: response,
            linkProductos: '/views/products'
        })
    }

    getRealTimeProducts= async(req, res)=>{
        let title = {
            generalTitle: 'Productos en tiempo real',
            listTitle: 'Listado',
        }
        res.render('realTimeProducts', title)
    }

    getChat = async(req, res)=>{
        res.render('chat',{})
    }
}

export default ViewsController;