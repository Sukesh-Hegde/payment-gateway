const app = require("./app");
const mongoose = require("mongoose");
const config = require("./config");

const PORT = process.env.PORT || 5000;

mongoose
  .connect(config.db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
