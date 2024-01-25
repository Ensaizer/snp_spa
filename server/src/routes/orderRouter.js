const express = require("express");
const { Order, Entry, Cart, Product } = require("../../db/models");

const orderRouter = express.Router();

orderRouter.post("/", async (req, res) => {
    const body = req.body;
    let order = await Order.create(body);
    order = order.get();
    
    let result = await Cart.findAll({
        where:{userId: order.userId},
        include:{
            model: Product,
            attributes: ['price']
        }
    });
    
    result = result.map(item => item.get());
    const destroyIds = result.map(item => item.id);
    let entries = result.map(item => {
        return {
            ...item,
            price: item.Product.price
        }
    });
    
    entries = entries.map((item) =>{
        delete item.Product;
        delete item.createdAt;
        delete item.updatedAt;
        item.orderId = order.id;
        return item
    });
    await Entry.bulkCreate(entries, {returning: true});
    await Cart.destroy({where: {id: destroyIds}});
    res.sendStatus(200)
});

module.exports = orderRouter;
