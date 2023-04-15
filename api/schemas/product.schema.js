//este archivo tambien puede encontrarse dto.js 0 data transfer object
const Joi = require("joi");

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);//le podemos agregar un .alphanum pero esto no permite que el nombre tenga espacios
const price = Joi.number().integer().min(10);//min 10 quiere decir que en nuestro local no hay un producto menor a 10$
const image = Joi.string().uri();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
});
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image
});
const getProductSchema = Joi.object({
  id: id.required()
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
