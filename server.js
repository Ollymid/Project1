//all me consts
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { port, dbURI, env, secret } = require('./config/environment');
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const errorHandler = require('./lib/errorHandler');
const routes = require('./config/routes');
const customResponses = require('./lib/customResponses');
const authentication = require('./lib/authentication');

//setting up express app and connecting to database
const app = express();
mongoose.connect(dbURI);

//settig up views and layouts
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);

//telling app to grab static content from public folder
app.use(express.static(`${__dirname}/public`));


//middleware -  if not testing use Morgan
if(env !== 'test') app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride((req) => {
  if(req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;

    return method;
  }
}));

// SESSIONS
app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false
}));

//FLASH warnings
app.use(flash());

//authenticating the user
app.use(customResponses);
app.use(authentication);


app.use(routes);
app.use(errorHandler);

app.listen(port, () => console.log(`Express is listening on port ${port}`));
