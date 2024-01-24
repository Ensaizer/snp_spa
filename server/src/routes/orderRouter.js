const express = require("express");
const { Order, Entry, Cart, Product } = require("../../db/models");

const orderRouter = express.Router();

orderRouter.post("/", async (req, res) => {
    const body = req.body;
    const order = await Order.create(body)
    if(order){
        return res.status(200).json(order)
    }
    // const result = Cart.findAll({ where:{userId: order.userId} })
    // console.log(result)
    // const entry = Entry.cre
});

module.exports = orderRouter;
