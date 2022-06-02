const mongoose = require("mongoose");
const apiRoutes = require("./routes/api.js");

require("dotenv").config();
const express = require("express");

console.log(process.env.ATLAS_CONNECTION_URL);

mongoose
  .connect(process.env.ATLAS_CONNECTION_URL, { useNewUrlParser: true })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

const app = express();
app.use(express.json());
app.use("/api", apiRoutes);

app.listen(process.env.PORT, () => {
  console.log("Application is started on PORT = " + process.env.PORT);
});
