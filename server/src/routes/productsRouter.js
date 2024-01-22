const express = require('express');
const { Product } = require('../../db/models');

const productsRouter = express.Router();

productsRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const restaurants = await Product.findAll();
      return res.json(restaurants);
    } catch (error) {
      return res.status(500).json(error);
    }
  })
  .post(
    /* upload.single('img'), */ async (req, res) => {
      try {
        if (!req.body?.name) return res.status(500).json({ message: 'Empty reqbody' });
        const { name, description, img } = req.body;
        const newRestaurant = await Product.create({
          name,
          description,
          img,
        });
        return res.status(201).json(newRestaurant);
      } catch (error) {
        return res.status(500).json(error);
      }
    },
  );

productsRouter
  .route('/:id')
  .get(async (req, res) => {
    try {
      const restaurant = await Product.findByPk(req.params.id);
      return res.json(restaurant);
    } catch (error) {
      return res.status(500).json(error);
    }
  })
  .patch(async (req, res) => {
    try {
      if (!req.body?.name) return res.status(500).json({ message: 'Empty reqbody' });
      const { name, description } = req.body;

      const restaurant = await Product.findByPk(req.params.id);
      restaurant.name = name;
      restaurant.description = description;
      restaurant.save();
      return res.status(200).json(restaurant);
    } catch (error) {
      return res.status(500).json(error);
    }
  })
  .delete(async (req, res) => {
    try {
      await Product.destroy({ where: { id: req.params.id } });
      return res.sendStatus(200);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

module.exports = productsRouter;
