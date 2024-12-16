const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: ['http://localhost:3000'], // frontend URL
    methods: ['GET', 'POST']
  }));
  
app.use(express.json());



const authRoutes = require('./routes/auth');
const newsRoutes = require('./routes/news');

app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);


// Подключение к базе данных
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
