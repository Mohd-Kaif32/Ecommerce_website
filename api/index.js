const dotenv = require('dotenv');
const cloudinary = require('cloudinary');

// Load environment variables
dotenv.config({ path: './backend/config/config.env' });

// Connect Database
const connectDatabase = require('../backend/config/database');
connectDatabase();

// Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Import Express app (must be exported in backend/app.js)
const app = require('../backend/app');

// Export the app for Vercel
module.exports = app;
