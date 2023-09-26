class CartRepository{
    constructor(dao){
        this.dao = dao
    }

    createCart = async(newCart, uid)=>{
        let result = await this.dao.addCart(newCart, uid);
        return result
    }

    getCart = async(cid)=>{
        let result = await this.dao.getCartById(cid);
        return result
    }

    addProductToCart = async(cid, pid)=>{
        let result = await this.dao.addProductToCart(cid,pid);
        return result
    }

    deleteProductToCart = async(cid, pid)=>{
        let result = await this.dao.deleteProductToCart(cid, pid);
        return result
    }

    updateCart = async(cid, dataCart)=>{
        let result = await this.dao.updateCart(cid, dataCart);
        return result
    }

    updateProductToCart = async(cid, pid, dataUpdate)=>{
        let result = await this.dao.updateCartProduct(cid,pid,dataUpdate);
        return result
    }

    deleteAllProductsToCart = async(cid)=>{
        let result = await this.dao.deleteAllProducts(cid);
        return result
    }

    finalizePurchase = async(cid,dataUser)=>{
        let result = await this.dao.finalizePurchase(cid, dataUser);
        return result
    }
}

export default CartRepository;