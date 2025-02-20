const express = require("express");
const productRoutes = require("./apis/products/routes");
const connectDB = require("./db/database");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const app = express();
const path = require("path");
const shopsRoutes = require("./apis/shops/routers");
const usersRoutes = require("./apis/users/users.routes");
const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(logger);
app.use((req, res, next) => {
  if (req.body.name === "Broccoli Soup")
    res.status(400).json({ message: "I HATE BROCCOLI!! KEEFY! " });
  else next();
});

// Passport Strategies
const { localStrategy } = require("./middleware/passport");

// Passport Setup
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// Routes
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/api/products", productRoutes);
app.use("/api/shops", shopsRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.use(errorHandler);

const PORT = 8000;
app.listen(PORT, () => console.log(`Application running on localhost:${PORT}`));
