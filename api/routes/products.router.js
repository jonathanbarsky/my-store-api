const express = require("express");
const ProductsService = require('./../services/product.service');
const validatorHandler = require('../api/middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema');
const router = express.Router();
const service = new ProductsService()

router.get("/", async (req, res) => {//es necesario hacerasincrono tambien
  const products = await service.find();
  res.json(products);
})
//Los end points especificos deben ir antes de los que cambian de forma dinamica, filter en este caso es tomado como un id y los ids son dinamicos, o sea que mientras no le envie algo dinamico va a tener por defecto el endPoint de filter
router.get("/filter", async (req, res) => {
  res.send("Yo soy un filter")
})
router.get("/:id",
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id)
      res.json(product)
    } catch (error) {
      next(error);//asi ejecutamos un middleware de tipo error de forma explicita
    }

  // if(id === "999"){//todos losparametros que se reciban por get, los va a enviar como un string "999"
  //     res.status(404).json({
  //       message: "Not found"
  //     })
  // } else {
  //   res.status(200).json({
  //     id,
  //     name: "Taco",
  //     price: 300,
  //   })
  // }
})

router.post("/",
validatorHandler(createProductSchema, "body"),
  async (req, res) => {
    const body = req.body;
    const newProduct = service.create(body);
    res.status(201).json(newProduct);

    // res.status(201).json({ //asi le agregamos una respuesta a un status especifico
    //   message: "created",
    //   data: body,
    // })
})
router.patch("/:id",
validatorHandler(getProductSchema, "params"),//asi ponemos un middleware uno despues del otro XD
  validatorHandler(updateProductSchema, "body"),// de forma secuencial
  async (req, res, next) => {
    try {//si todod esta bien pasa esto
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body)
      res.json(product)
    } catch (error) {
      next(error);
      // res.status(404).json({
      //   message: error.message//.message es para enviar el error donde los capturamos, en este caso en el async update(por el patch, estan conectados)
      // });
    }

})
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id)
  res.json(rta)
})

module.exports = router;
