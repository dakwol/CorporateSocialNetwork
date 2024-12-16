const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const router = express.Router();

// Регистрация
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    console.log('Received data:', req.body);  // Логируем данные, пришедшие на сервер
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Hashed password:', hashedPassword);  // Логируем хешированный пароль
  
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      console.log('User saved:', newUser);  // Логируем, что пользователь сохранён в БД
  
      res.status(201).json({ message: 'User registered' });
    } catch (err) {
      console.error('Error registering user:', err);  // Логируем ошибку
      res.status(500).json({ error: 'Error registering user', details: err.message });
    }
  });
  
// Логин
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log('Received data:', req.body);  // Логируем данные, пришедшие на серве
  if (!user) return res.status(400).send('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  console.log('isMatch:', isMatch);  // Логируем данные, пришедшие на серве
  if (!isMatch) return res.status(400).send('Invalid credentials');

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });

});

module.exports = router;

// Получение данных пользователя
router.get('/user', async (req, res) => {
  // Получаем токен из заголовков запроса
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Извлекаем токен из заголовка

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    // Проверяем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Декодируем токен
    console.log('Decoded token:', decoded);  // Логируем декодированный токен

    // Ищем пользователя в базе данных
    const user = await User.findById(decoded.userId).select('-password'); // Не возвращаем пароль
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Отправляем данные пользователя
    res.json({
      avatar: user.avatar,  // Предположим, что у пользователя есть аватар
      name: user.username,
      status: user.status,  // Предположим, что у пользователя есть статус
    });
  } catch (err) {
    console.error('Error fetching user data:', err);  // Логируем ошибку
    res.status(400).send('Invalid token');
  }
});
