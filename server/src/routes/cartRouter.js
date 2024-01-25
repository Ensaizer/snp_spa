const express = require("express");
const { Cart, Product } = require("../../db/models");

const cartRouter = express.Router();


cartRouter.patch("/update", async (req, res) => {
    try{
        const { id, quantity, productId } = req.body;
        await Cart.update({ quantity }, { where: { userId: id, productId} });
        return res.status(200)
    } catch (e) {
        res.status(500).json(e)
    }
   
});

cartRouter.delete("/", async (req, res) => {
    try{
        const body = req.body;
        await Cart.destroy({where: {id: body} });
        res.sendStatus(200);
    } catch (e) {
        res.status(500).json(e)
    }
    
});
cartRouter.delete("/:id", async (req, res) => {
    try{
        const { id } = req.params
        await Cart.destroy({where: {id} });
        res.sendStatus(200);
    } catch (e) {
        res.status(500).json(e)
    }
});

cartRouter.get("/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const carts = await Cart.findAll({
            include: { model: Product },
            where: { userId: id}
        });
        res.status(200).json(carts);
    } catch (e) {
        res.status(500).json(e)
    }
    
});


cartRouter.post("/", async (req, res) => {
    try{
        const { body } = req;
        const result = await Cart.create(body);
        res.status(200).json(result.id);
    } catch (e) {
        res.status(500).json(e)
    }
    
});

module.exports = cartRouter;
