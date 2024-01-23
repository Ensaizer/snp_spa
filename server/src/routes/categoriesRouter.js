const express = require("express");
const { Category } = require("../../db/models");

const categoriesRouter = express.Router();

categoriesRouter.get("/", async (req, res) => {
 
  const categories = await Category.findAll({ attributes: ["id", "name"] });
  res.status(200).json(categories);
});

module.exports = categoriesRouter;
