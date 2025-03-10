require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const cors = require("cors");
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//requie models
const User = require(path.join(__dirname, "models", "user-model"));

//requiring routes
const index1 = require(path.join(__dirname, "routes", "index1"));
const signup = require(path.join(__dirname, "routes", "signup"));
const login = require(path.join(__dirname, "routes", "login"));
const fetchData = require(path.join(__dirname, "routes", "fetchData"));
const addUser = require(path.join(__dirname, "routes", "add-user"));
const Research = require(path.join(__dirname, "routes", "researchwork"));
const classroute = require(path.join(__dirname, "routes", "class-route"));
const Articles = require(path.join(__dirname, "routes", "articles"));
const Workshops = require(path.join(__dirname, "routes", "workshops"));
const Others = require(path.join(__dirname, "routes", "others"));
const proctoring = require(path.join(__dirname, "routes", "proctoring"));
const users = require(path.join(__dirname, "routes", "user"));
const partb = require(path.join(__dirname, "routes", "partb"));
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    exposedHeaders: ['Authorization']
};
app.use(cors(corsOptions));


//using routes
app.use("/index", index1);
app.use("/signup", signup);
app.use("/login", login);
app.use("/fetchData", fetchData);
app.use("/add-user", addUser);
app.use("/research", Research);
app.use("/update", classroute);
app.use("/article", Articles);
app.use("/workshop", Workshops);
app.use("/others", Others);
app.use("/proc", proctoring);
app.use("/users", users);
app.use("/", partb);
// Database Connection
const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB is connected");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};


// Call the database connection function
ConnectDB();

// Routes
app.get("/logout", (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
