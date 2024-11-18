const { faker } = require('@faker-js/faker');
const { Boom } = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 30;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: index + 1,
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBLock: faker.datatype.boolean(),
      });
    }
  }

  async create(body) {
    const newProduct = {
      id: this.products.length + 1,
      ...body,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });
  }

  async findOne(id) {
    const product = this.products.find((p) => p.id === parseInt(id));
    if (product) {
      if (product.isBLock) {
        throw Boom.conclict('Product is blocked');
      }
      return product;
    } else {
      throw Boom.notFound('Product not found');
    }
  }

  async update(id, body) {
    const index = this.products.findIndex((p) => p.id === parseInt(id));
    if (index === -1) {
      throw Boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...body,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((p) => p.id === parseInt(id));
    if (index === -1) {
      throw Boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return this.products[index];
  }
}

module.exports = ProductsService;
