//package dependencies
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
//file dependencies
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');

//creates sequalize store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//express port
const app = express();
const PORT = process.env.PORT || 3001;
//creates helpers
const hbs = exphbs.create({ helpers });