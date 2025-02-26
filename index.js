const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const dbConnect = require("./dbConnection/dbConnect");
const apartmentsRouter = require("./modules/apartments/apartments.route");
const userRouter = require("./modules/user/user.route");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: ["http://localhost:5173","https://rent-easy-building-management.web.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// connect to database
dbConnect();

// jwt token create
app.post("/jwt", async (req, res) => {
  const { userEmail } = req.body;
  // make the token
  const token = jwt.sign({ userEmail }, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "5h",
  });
  //  set http only cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // sameSite: "none",
  });
  //  send response
  res.json({ message: "Login successful" });
});

// delete jwt token cookie
app.post("/remove-jwt", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // sameSite: "none",
  });

  res.json({ message: "Logout successful" });
});

// routes
app.use("/rent-easy/apartments", apartmentsRouter);
app.use("/rent-easy/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
