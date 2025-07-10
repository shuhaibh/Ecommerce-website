require("dotenv").config();

const express = require("express");
const app = express();
const router = require("./routes/index");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi Muhammad Shuhaibh");
});

connectDB()
  .then(() => console.log("DB connected..."))
  .catch((err) => console.log(error));

app.use("/api", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
