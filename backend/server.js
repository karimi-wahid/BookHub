const app = require("./src/app");
const dbConnect = require("./src/config/db");
require("dotenv").config();

dbConnect();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server running on port 5000");
});
