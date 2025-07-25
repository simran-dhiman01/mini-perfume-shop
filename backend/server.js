const express = require('express');
const cors = require('cors')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
require('dotenv').config();

const app = express();

//middleware 
app.use(cors());
app.use(express.json());

connectDB()

app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
