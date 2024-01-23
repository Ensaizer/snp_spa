const express = require("express");
const { Cart, Product } = require("../../db/models");

const cartRouter = express.Router();

cartRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const carts = await Cart.findAll({
        include: { model: Product },
        where: { userId: id}
    });
    res.status(200).json(carts);
});

module.exports = cartRouter;
