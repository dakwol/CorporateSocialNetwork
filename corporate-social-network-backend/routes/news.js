const express = require('express');
const News = require('../model/News');
const router = express.Router();

// Получение всех новостей
router.get('/', async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (err) {
    res.status(500).send('Error fetching news');
  }
});

// Добавление новости
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  const newNews = new News({ title, content });

  try {
    await newNews.save();
    res.status(201).send('News added');
  } catch (err) {
    res.status(500).send('Error adding news');
  }
});

// Удаление новости
router.delete('/:id', async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.send('News deleted');
  } catch (err) {
    res.status(500).send('Error deleting news');
  }
});

module.exports = router;
