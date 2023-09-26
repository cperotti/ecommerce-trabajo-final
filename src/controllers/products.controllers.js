
import { productService } from "../service/index.js";
import { EError } from "../utils/CustomeError/EErrors.js";
import CustomError from "../utils/CustomeError/customError.js";
import { generatePoductErrorInfo } from "../utils/CustomeError/info.js";

class ProductsController {
    getProducts = async(req, res)=>{
        try{
            let {limit, sort, status, category, query,page} = req.query
            const products = await productService.getProducts(limit, sort,status, category, query, page)
            const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = products;
    
            res.send({
                status: 'success',
                payload: docs,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                totalPages,
                prevLink: hasPrevPage ? `/api/products?page=${prevPage}&limit=${limit?limit:10}${sort ?`&sort=${sort}`:''}${category ?`&category=${category}`:''}${status ?`&status=${status}`:''}`:null,
                nextLink: hasNextPage ? `/api/products?page=${nextPage}&limit=${limit?limit:10}${sort ?`&sort=${sort}`:''}${category ?`&category=${category}`:''}${status ?`&status=${status}`:''}`: null
            })
    
        }catch(error){
            req.logger.error(error)
        }
    }
    
    getProduct = async(req,res)=>{
        try{
            let {pid} = req.params
            
            let response = await productService.getProduct(pid)
            res.send({
                status:'success',
                payload: response,
            })
        }catch(error){
            req.logger.error(error)
        }
    }

    createProduct = async(req, res, next)=>{
        try{
            const newProduct = req.body;

            const auxProduct = {
                ...newProduct,
                createBy: req.user.id
            }

            if(!newProduct.title || !newProduct.code || !newProduct.price || !newProduct.category || !newProduct.description || !newProduct.stock || !newProduct.status){
                CustomError.createError({
                    name: 'Creación de producto',
                    cause: generatePoductErrorInfo(newProduct),
                    message: 'Error al crear un producto',
                    code: EError.INVALID_TYPE_ERROR
                })
            }

            let response = await productService.createProduct(auxProduct)
                
            res.send({
                status:'Success',
                payload: response,
            })
    
        }catch(error){
            req.logger.error(error)
            next(error)
        }
    }
    
    updateProduct = async(req, res)=>{
        try{
            let productReplace = req.body
            let {pid} = req.params
        
            let response = await productService.updateProduct(pid,productReplace)
            res.send({
                status: 'success',
                payload: response,
            })
        }catch (error){
            req.logger.error(error)
        }
    }
    
    deleteProduct = async(req, res)=>{
        try {
            let {pid} = req.params
        
            let response = await productService.deleteProduct(pid)
            res.send({
                status:'success',
                payload: response,
            })
        } catch (error) {
            req.logger.error(error)
        }
    }
}

export default ProductsController;
