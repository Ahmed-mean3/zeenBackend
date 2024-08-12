const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/zeenPrefillRouter");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Server Started");
});

// Make sure to include this route to handle other routes
app.get("*", (req, res) => {
  res.status(404).send("Not Found");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Database Connected Successfully and server is listening on this port ${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
