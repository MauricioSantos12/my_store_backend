const express = require('express');
const router = express.Router();
const ProductsService = require('../services/product.service');
const service = new ProductsService();
const validatorHandler = require('../middlewares/validator.handler');
const {
  createPoductSchame,
  getPoductSchame,
  updatePoductSchame,
} = require('../shcemas/product.schema');

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json({ products, length: products.length });
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get(
  '/:id',
  validatorHandler(getPoductSchame, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      if (product) {
        res.status(200).json(product);
      }
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createPoductSchame, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json({
      message: 'Product created',
      data: {
        ...newProduct,
      },
    });
  },
);

router.patch(
  '/:id',
  validatorHandler(updatePoductSchame, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedProduct = await service.update(id, body);
      res.json({
        message: 'Product updated',
        id,
        data: {
          ...body,
        },
      });
    } catch (error) {
      res.status(404).send(error.message);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(updatePoductSchame, 'parmas'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProduct = await service.delete(id);
      res.json({
        message: 'Product deleted',
        id: deletedProduct.id,
      });
    } catch (error) {
      res.status(404).send(error.message);
    }
  },
);

module.exports = router;
