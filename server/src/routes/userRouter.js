const express = require('express');
const nodemailer = require('nodemailer');

const { User, Organization } = require('../../db/models');

const userRouter = express.Router();

async function sendMail(email, theme, text) {
  const transporter = nodemailer.createTransport({
    pool: true,
    host: 'smtp.yandex.ru',
    port: 465,
    auth: {
      user: 'ensaizer.x@yandex.ru',
      pass: 'irxqxqaobdhxcexe',
    },
  });

  const message = {
    from: 'ensaizer.x@yandex.ru',
    to: email,
    subject: theme,
    text,
  };

  const info = await transporter.sendMail(message);

  if (info.response.slice(0, 3) === '250') {
    return `Письмо успешно отправлено на адрес ${email}!`;
  }

  return `Ошибка отправки письма на адрес ${email}!`;
}

userRouter.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      include: Organization,
    });

    res.status(200).json(users);
  } catch (e) {
    res.status(500).json('User field');
  }
});

userRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = await User.findOne({ where: { id } });
    await User.destroy({ where: { id } });
    await sendMail(
      email,
      'Удаление с сайта SNP',
      'К сожалению ваша учетная запись была удалена из системы, т.к не прошла проверку службы безопасности.',
    );
    res.status(200).json(id);
  } catch (e) {
    res.status(500).json(e);
  }
});

userRouter.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    console.log(body);
    const { email } = await User.findOne({ where: { id } });
    await User.update(body, { where: { id } });
    if (body.isApproved) {
      await sendMail(
        email,
        'Доступ на сайт SNP',
        `Поздравляем, Вам дан доступ на сайт SNP, вход может быть осуществлен с помощью логина ${email} и пароля, введенного ранее.`,
      );
    }
    res.status(200).json(id);
  } catch (e) {
    res.status(500).json('User field');
  }
});

userRouter.get('/customers', async (req, res) => {
  try {
    const users = await User.findAll({ where: { roleId: 1 } });
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json('User field');
  }
});

userRouter.get('/partners', async (req, res) => {
  try {
    const users = await User.findAll({ where: { roleId: 2 } });
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json('User field');
  }
});

module.exports = userRouter;
