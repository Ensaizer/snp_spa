const express = require("express");
const { Op } = require("sequelize");
const { Product } = require("../../db/models");

const productsRouter = express.Router();



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

productsRouter.get('/search', async (req, res) => {
  try {
    const { input } = req.query;
    const products = await Product.findAll({
      where: {article: {
                [Op.iLike]: `%${input}%`,
              },
      },
    });
    setTimeout(() => res.json(products), 1000);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

productsRouter.get("/", async (req, res) => {
  const products = await Product.findAll();
  return res.status(200).json(products);
});
productsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ where: { id: +id } });
  res.status(200).json(product);
});

module.exports = productsRouter;
