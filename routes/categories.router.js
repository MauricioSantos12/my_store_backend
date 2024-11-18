const express = require('express');
const router = express.Router();
const CategoriesService = require('../services/categories.service');
const service = new CategoriesService();

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  const data = service.findOne(categoryId, productId);
  res.json({ data });
});

module.exports = router;
