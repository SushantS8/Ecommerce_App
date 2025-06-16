// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const app = express();
// app.use(cors());

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
     .then(() => console.log('MongoDB connected'))
     .catch((err) => console.error(err));

// Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/users', authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));