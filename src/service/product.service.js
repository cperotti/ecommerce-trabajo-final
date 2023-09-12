/*import ProductManagerMongo from "../dao/mongo/product.mongo.js";

export const productService = new ProductManagerMongo();*/

import { ProductDao } from "../dao/factory.js";
import ProductRepository from "../repositories/product.repository.js";

export const productService = new ProductRepository(ProductDao);