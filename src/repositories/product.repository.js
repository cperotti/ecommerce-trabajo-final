import ProductDto from "../dto/product.dto.js";

class ProductRepository{
    constructor(dao){
        this.dao = dao
    }

    getProducts = async(limit, sort,status, category, query, page)=>{
        let result = await this.dao.getProducts(limit, sort,status, category, query, page);
        return result
    }
    getProduct = async(pid)=>{
        let result = await this.dao.getProductById(pid);
        return result
    }
    createProduct = async(newProduct)=>{
        let dataNewProduct = new ProductDto(newProduct);
        let result = await this.dao.addProduct(dataNewProduct);
        return result
    }
    updateProduct = async(pid,productReplace)=>{
        let result = await this.dao.updateProduct(pid, productReplace);
        return result
    }
    deleteProduct = async(pid)=>{
        let result = await this.dao.deleteProduct(pid);
        return result
    }

}

export default ProductRepository;