const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  const { limit, offset} = req.query;//al ser query parameters usamos .query en ves de .params
  if(limit && offset){
    res.json({
      limit,
      offset,
    });
  } else {
    res.send("No hay query parameters");
  }
})
router.get("/products/:productId", (req, res) => {
  const{ user, productId } = req.params;
  res.json({
    user,
    productId,
  })
})

module.exports = router;
