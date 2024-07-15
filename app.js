const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const paymentRoutes = require("./routes/paymentRoutes");
const authRoutes = require("./routes/authRoutes");
const { logger } = require("./utils/logger");

const app = express();

app.use(bodyParser.json());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Payment Gateway API",
      description: "API documentation for Payment Gateway Service",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/auth", authRoutes);
app.use("/payments", paymentRoutes);

app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).send("Internal Server Error");
});

module.exports = app;
