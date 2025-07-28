import express from "express";
import path from "path";
import dotenv from "dotenv/config"
import session from "express-session"
import cookieParser from "cookie-parser";
import homeRoutes from "./route/home.js";
import mongodbConnect from "./connection.js";
const app = express();
const PORT = process.env.PORT;
const URI = process.env.URI;
mongodbConnect(URI);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: "viodageek17", 
  resave: false,
  saveUninitialized: true
}));
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use("/",homeRoutes);
app.listen(PORT,()=>{
    console.log("Server Started");
})

