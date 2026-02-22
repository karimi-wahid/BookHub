const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(`${process.env.MONGO_URI}/bookHub`)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
};
module.exports = dbConnect;
