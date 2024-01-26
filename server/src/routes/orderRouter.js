const express = require('express');
const { Order, Entry, Cart, Product, User } = require('../../db/models');
const order = require('../../db/models/order');

const orderRouter = express.Router();

orderRouter.post('/', async (req, res) => {
  try {
    const { body } = req;
    let order = await Order.create(body);

    order = order.get();

    let result = await Cart.findAll({
      where: { userId: order.userId },
      include: {
        model: Product,
        attributes: ['price', 'stock', 'id'],
      },
    });
    const user = await User.findOne({ where: { id: order.userId } });
    result = result.map((item) => item.get());
    const destroyIds = result.map((item) => item.id);
    const newStocks = result.map((item) => ({
      id: item.productId,
      stock: item.Product.stock - item.quantity,
    }));
    console.log(newStocks);
    await Product.bulkCreate(newStocks, { updateOnDuplicate: ['stock'] });
    // Promise.all(newStocks.map((item) => Product.update(item, { where: { id: item.id } })));
    let entries = result.map((item) => ({
      ...item,
      price: (item.Product.price * (100 - user.discount)) / 100,
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
    res.status(500).json(e);
  }
});

orderRouter.get('/', async (req, res) => {
  try {
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
    res.status(500).json(e);
  }
});

orderRouter.patch('/:id', async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    console.log(body);
    const entry = await Order.update({ status: body.newStatus }, { where: { id } });
    return res.status(200).json(entry);
  } catch (e) {
    res.status(500).json(e);
  }
});
module.exports = orderRouter;
