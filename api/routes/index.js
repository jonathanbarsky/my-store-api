const express = require("express");
const productsRouter = require("./products.router");
const categoriesRouter = require("./categories.router");
const userRouter = require("./user.router");

function routerApi(app){
  const router = express.Router();
  app.use("/api/v1", router);//asi seria la ruta raiz que asignammos
  router.use("/products", productsRouter);
  router.use("/categories", categoriesRouter);
  router.use("/users", userRouter);
}

module.exports = routerApi;
