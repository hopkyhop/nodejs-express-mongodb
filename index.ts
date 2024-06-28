import express from "express";
import mongoose from "mongoose";
import router from "./router";
import fileUpload from "express-fileupload";

const PORT = 5050;
const DB_URL =
  "mongodb+srv://user:user@cluster0.c4kxhzl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//экземпляр приложения
const app = express();
//middleware для обработки загрузки файлов
app.use(fileUpload({}));
//middleware для обслуживания статических файлов
app.use(express.static("static"));
//middleware для обработки JSON-тела запроса
app.use(express.json());
//middleware для монтирования роутера
app.use("/api", router);
//middleware для парсинга URL-кодированного тела запроса
app.use(express.urlencoded({ extended: true }))

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}
startApp();
