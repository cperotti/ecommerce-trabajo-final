import { messageService, productService, cartService, userService } from "../service/index.js";

class ViewsController {
    getMessages = async(req, res)=>{
        try{
            const messages = await messageService.getMessages()
            let data = {
                title: 'Mensajes',
                messages,
                hasMessages: messages.length > 0
            }
            res.render('chat', data)
        }catch (error){
            req.logger.error(error)
        }
    }

    createMessage = async(req, res)=>{
        try{
            const message= req.body;
            await messageService.createMessage(message)
    
            const messages = await messageService.getMessages()
            let data = {
                title: 'Mensajes',
                messages,
                hasMessages: messages.length > 0
            }
    
            res.render('chat', data)
         
        }catch (error){
            req.logger.error(error)
        }
    }

    getProductData = async(req,res)=>{
        try {
            let {limit, sort, status, category, query,page} = req.query
            const products = await productService.getProducts(limit, sort,status, category, query, page)
            const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = products;

            const cart = await userService.getUserById(req.user.id)
    
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
                linkCarrito:`/views/carts/${cart.cartId}`,
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
    
            res.render('productId',{
                detail:response, 
                linkProductos: '/views/products'
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
                linkProductos: '/views/products'
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
}

export default ViewsController;