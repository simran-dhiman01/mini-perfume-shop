const mongoose = require('mongoose')
const Product = require('./../models/Product')
const products = require('./../data/products')
const dotenv = require('dotenv')
const connectDB = require('./../config/db')

dotenv.config();
connectDB();

const importData = async () => {
  await Product.deleteMany();
  await Product.insertMany(products);
  console.log("Mock data seeded");
  process.exit();
};

importData();
