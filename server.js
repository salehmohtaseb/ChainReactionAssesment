require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cookieParser = require('cookie-parser');
const session = require('./app/middlewares/session');
const { httpConfig, swaggerConfig } = require("./config");

const app = express();

var corsOptions = {
  credentials: true,
  origin: `${httpConfig.host}:${httpConfig.port}`
};

app.use(cors(corsOptions));
app.use(session)
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1)

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", (req, res) => {
  res.json({ message: "Alive!" });
});

const specs = swaggerJsdoc(swaggerConfig);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

require("./app/routes")(app);

const PORT = httpConfig.port;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
