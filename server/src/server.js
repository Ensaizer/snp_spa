const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const productsRouter = require("./routes/productsRouter");
const tokensRouter = require("./routes/tokensRouter");
const authRouter = require("./routes/authRouter");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/products", productsRouter);
app.use("/api/tokens", tokensRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
