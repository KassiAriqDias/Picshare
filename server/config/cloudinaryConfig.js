const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: 'db1z6kun7',
  api_key: '594219869245985',
  api_secret: 'lVwsbou3l9NRwpeSqYigdTN_pyc',
});

module.exports = cloudinary;