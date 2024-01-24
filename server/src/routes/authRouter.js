const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const { User, Organization } = require('../../db/models');
const generateTokens = require('../utils/generateTokens');
const jwtConfig = require('../config/jwtConfig');
const cookiesConfig = require('../config/cookiesConfig');
const verifyRefreshToken = require('../middlewares/verifyRefreshToken');

const authRouter = express.Router();

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

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: 'Invalid password' });

    if (!user.isApproved) return res.status(400).json({ message: 'User is not approved' });
    const plainUser = user.get();
    delete plainUser.password;
    const { accessToken, refreshToken } = generateTokens({
      user: plainUser,
    });
    return res
      .cookie(jwtConfig.refresh.name, refreshToken, cookiesConfig.refresh)
      .status(200)
      .json({ accessToken, user: plainUser });
  } catch (error) {
    return res.status(500).json(error);
  }
});

authRouter.post('/registration', async (req, res) => {
  try {
    const { email, password, name, userType, phone, deliveryAddress, ...rest } = req.body;
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name,
        password: await bcrypt.hash(password, 10),
        userType,
        phone,
        deliveryAddress,
      },
    });
    if (!created) return res.status(400).json({ message: 'Email already exists' });

    if (rest.orgName) {
      rest.userId = user.id;
      await Organization.create(rest);
    }

    await sendMail(
      email,
      'Регистрация на сайте SNP',
      'Ваши данные отправлены на проверку, после проверки службы безопасности Вам поступит email, с доступом к сайту',
    );
    if (user) return res.status(200).json({ message: 'User created' });
  } catch (error) {
    return res.status(500).json(error);
  }
});

authRouter.get('/logout', (req, res) => {
  res.clearCookie(jwtConfig.refresh.name).sendStatus(200);
});

authRouter.get('/check', verifyRefreshToken, (req, res) => {
  res.json({ user: res.locals.user, accessToken: '' });
});

module.exports = authRouter;
