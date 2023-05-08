import express from "express";
import mongoose from "mongoose";
import config from "./config/environment.js";
import * as useUserCtl from "./controller/userCtl.js"

const app = express();
app.use(express.json());

mongoose
  .connect(config.mongodb.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection Failed: " + err);
  });

//create
app.post(config.server.baseUrl + "/registerUser", useUserCtl.registerUser)
app.post(config.server.baseUrl + "/login", useUserCtl.login)
app.post(config.server.baseUrl + "/auth", useUserCtl.authorization)


export default app;