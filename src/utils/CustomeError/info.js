export const generatePoductErrorInfo = (product) => {
    return `One or more propieties ware incomplete or not valid.
    listado de requerimientos de propiedades del user:
    * title: needs to a String, recived ${product.title}
    * description: needs to a String, recived ${product.description}
    * price: needs to a Number, recived ${product.price}
    * stock: needs to a Number, recived ${product.stock}
    * category: needs to a String, recived ${product.category}
    * status: needs to a Boolean, recived ${product.status}
    * code: needs to a String, recived ${product.code}
    `
}
