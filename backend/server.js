const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const { setupSwagger } = require('./swagger');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // your frontend origin
}));

app.use(express.json()); // For JSON requests

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Swagger docs
setupSwagger(app);

const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', authRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handlers
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.error(err));
