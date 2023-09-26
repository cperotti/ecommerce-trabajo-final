import __dirname from "../utils.js";
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition:{
        openapi:'3.0.1',
        info:{
            title:'Documentación de ecommerce',
            description:'Esta es la documentación de ecommerce',
        }
    }, 
    apis:[`${__dirname}/docs/**/*.yaml`]
}

export const specs = swaggerJSDoc(swaggerOptions)
