var env = process.env.NODE_ENV || 'development';

if(env === "development" || env === 'test') {
  require('dotenv').config({path: '.env.cloudinary_url'}); //cloudinary config
  var config = require('./config.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  })
}