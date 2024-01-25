const express = require("express");
const { Cart, Product } = require("../../db/models");

const cartRouter = express.Router();


cartRouter.patch("/update", async (req, res) => {
    const { id, quantity, productId } = req.body;
    await Cart.update({ quantity }, { where: { userId: id, productId} });
    return res.status(200)
});

cartRouter.delete("/", async (req, res) => {
    const body = req.body;
    await Cart.destroy({where: {id: body} });
    res.sendStatus(200);
});
cartRouter.delete("/:id", async (req, res) => {
    const { id } = req.params
    await Cart.destroy({where: {id} });
    res.sendStatus(200);
});

cartRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const carts = await Cart.findAll({
        include: { model: Product },
        where: { userId: id}
    });
    res.status(200).json(carts);
});


cartRouter.post("/", async (req, res) => {
    const { body } = req;
    await Cart.create(body);
    res.sendStatus(200);
});

module.exports = cartRouter;
