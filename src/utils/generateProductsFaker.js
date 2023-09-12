import { faker } from "@faker-js/faker"

export const generateProducts= ()=>{
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        category: faker.commerce.department(),
        stock: faker.string.numeric(),
        description: faker.commerce.productDescription(),
        id: faker.database.mongodbObjectId(),
        code: faker.string.alphanumeric(5),
        image: faker.image.url(),
        status: true
    }
}
