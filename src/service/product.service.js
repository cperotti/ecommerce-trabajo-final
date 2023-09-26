import { ProductDao } from "../dao/factory.js";
import ProductRepository from "../repositories/product.repository.js";

export const productService = new ProductRepository(ProductDao);