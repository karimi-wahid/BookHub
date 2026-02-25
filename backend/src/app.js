const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/books", require("./routes/book.routes"));

app.get("/", (req, res) => {
  res.send("BookHub API running");
});

module.exports = app;
