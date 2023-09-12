class ProductDto {
    constructor(product){
        this.title=product.title,
        this.description= product.description,
        this.thumbnail= product.thumbnail,
        this.price= product.price,
        this.stock= product.stock,
        this.code= product.code,
        this.category = product.category,
        this.status= product.status ? product.status : true
        this.createBy = product.createBy
    }
}

export default ProductDto;