const express = require('express');
const { Order, Entry, Cart, Product } = require('../../db/models');
const order = require('../../db/models/order');

const orderRouter = express.Router();

orderRouter.post('/', async (req, res) => {
  try{
    const { body } = req;
    let order = await Order.create(body);
    order = order.get();
    
    let result = await Cart.findAll({
      where: { userId: order.userId },
      include: {
        model: Product,
        attributes: ['price'],
      },
    });
    
    result = result.map((item) => item.get());
    const destroyIds = result.map((item) => item.id);
    let entries = result.map((item) => ({
      ...item,
      price: item.Product.price,
    }));
    
    entries = entries.map((item) => {
      delete item.Product;
      delete item.createdAt;
      delete item.updatedAt;
      item.orderId = order.id;
      return item;
    });
    await Entry.bulkCreate(entries, { returning: true });
    await Cart.destroy({ where: { id: destroyIds } });
    res.sendStatus(200);
  } catch (e) {
    res.status(500).json(e)
  }
 
});

orderRouter.get('/', async (req, res) => {
  try{
    const orders = await Order.findAll({
      include: {
        model: Entry,
        include: {
          model: Product,
        },
      },
    });
    res.json(orders);
  } catch (e) {
    res.status(500).json(e)
  }
});

orderRouter.get('/:userId', async (req, res) => {
  try{
    const orders = await Order.findAll({where: {userId: req.params.userId},
      include: {
        model: Entry,
        include: {
          model: Product,
        },
      },
    });
    res.json(orders);
  } catch (e) {
    res.status(500).json(e)
  }
});

module.exports = orderRouter;
