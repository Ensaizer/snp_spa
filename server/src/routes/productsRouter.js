const express = require("express");
const { Op } = require("sequelize");
const { Product } = require("../../db/models");

const productsRouter = express.Router();

productsRouter.post("/", async (req, res) => {
  try {
    const { body } = req;
    const newProduct = await Product.create(body);
    return res.status(200).json(newProduct);
  } catch (e) {
    res.status(500).json(e);
  }
});

productsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Product.destroy({ where: { id } });
    return res.sendStatus(200);
  } catch (e) {
    res.status(500).json(e);
  }
});

productsRouter.patch("/:id", async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const product = await Product.update(body, { where: { id } });
    return res.status(200).json(product);
  } catch (e) {
    res.status(500).json(e);
  }
});

productsRouter.get("/search", async (req, res) => {
  try {
    const { input } = req.query;
    const products = await Product.findAll({
      where: {
        article: {
          [Op.iLike]: `%${input}%`,
        },
      },
    });
    return res.json(products);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

productsRouter.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json(products);
  } catch (e) {
    return res.sendStatus(500);
  }
});
productsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id: +id } });
    res.status(200).json(product);
  } catch (e) {
    return res.sendStatus(500);
  }
});

module.exports = productsRouter;
