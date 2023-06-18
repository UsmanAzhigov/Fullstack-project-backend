import express from "express";

import mongoose from "mongoose";

import { loginValidation, registerValidation } from "./validations/auth.js";

import checkAuthMe from "./utils/checkAuthMe.js ";
import { getMe, login, register } from "./controller/UserController.js";

mongoose
  .connect(
    "mongodb+srv://azigovusman:qwerty123@fullstack-project.nsv43en.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("mongodb connection");
  })
  .catch((err) => console.log(err, "mongodb not connected"));

const app = express(); //помещаем веб-сервер в app
app.use(express.json()); // читает json формат
app.post("/auth/login", login, loginValidation);
app.post("/auth/register", registerValidation, register);
app.get("/auth/me", checkAuthMe, getMe);
app.get("/", (req, res) => {
  res.send("Привет мир");
});
app.listen(5555, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server working");
}); //проверка сервера на работу
