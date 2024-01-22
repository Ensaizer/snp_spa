const express = require("express");
const { Product } = require("../../db/models");

const productsRouter = express.Router();

productsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ where: { id: +id } });
  res.status(200).json(product);
});

productsRouter.get("/", async (req, res) => {
  const products = await Product.findAll();
  return res.status(200).json(products);
});

productsRouter.post("/", async (req, res) => {
  const { body } = req;
  const newProduct = await Product.create(body);
  return res.status(200).json(newProduct);
});

productsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Product.destroy({ where: { id } });
  return res.sendStatus(200);
});

productsRouter.patch("/:id", async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const product = await Product.update(body, { where: { id } });
  return res.status(200).json(product);
});
module.exports = productsRouter;
