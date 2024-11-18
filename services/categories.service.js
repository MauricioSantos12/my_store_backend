class CategoriesService {
  constructor() {
    this.categories = [];
  }
  findOne(categoryId, productId) {
    return {
      categoryId,
      productId,
    };
  }
}

module.exports = CategoriesService;
