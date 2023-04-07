const express = require("express");

const router = express.Router();

// en el puerto 3000 escribir la url siguiente, pero categoryId y productId va a tener el valor que escribamos nosotros y nos lo va a mostrar en pantalla
//request.params nos permite recibir parametros y en este caso mostrarlos en pantalla
router.get("/:categoryId/products/:productId", (req, res) => {
  const{ categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  })
})


module.exports = router;
