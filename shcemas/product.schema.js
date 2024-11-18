const joi = require('joi');

const id = joi.number();
const name = joi.string();
const description = joi.string().alphanum();
const price = joi.number().integer();
const image = joi.string();
const isBLock = joi.boolean();

const createPoductSchame = joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
});

const updatePoductSchame = joi.object({
  name: name,
  price: price,
});

const getPoductSchame = joi.object({
  id: id.required(),
});

const deletePoductSchame = joi.object({
  id: id.required(),
});

module.exports = {
  createPoductSchame,
  updatePoductSchame,
  getPoductSchame,
  deletePoductSchame,
};
