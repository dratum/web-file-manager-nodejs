dotenv.config();
import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import router from "./routers/router.js";
import { customCors } from "./middleware/cors.js";

const app = express();

app.use(customCors);
app.use(express.json());
app.use(morgan("tiny"));

app.use(express.static("public"));
app.use("/api", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Сервер запущен. Порт:", PORT);
});
