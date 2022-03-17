// general imports
const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");

//import helper functions
const helpers = require("./utils/helpers");

// import handlebars
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });

// import express-sessions
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require("connect-session-sequelize")(session.Store);

// session
const sess = {
  secret: "super super secret",
  cookie: { originalMaxAge: 600000 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// use all that
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
// use handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//use the routes
app.use(routes);

// GO!
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
