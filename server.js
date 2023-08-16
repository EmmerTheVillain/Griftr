//package dependencies
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');

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

//establishes session object storage and cookies and connects to SequalizeStore
const sess = {
    secret: 'secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

//sets up express-session
app.use(session(sess));

// app.engine('handlebars', expbs({defaultLayout: 'main', layoutsDir: 'views/layouts'}));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/images", express.static(path.join(__dirname, "/public/images")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});