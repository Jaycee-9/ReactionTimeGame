import express from "express";
import connectToDb from "./db/index.js";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/routes.js";
const PORT = process.env.PORT || 8000;
const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/", router);

app.get("/", (req, res) => {
  res.json("server is running...!");
});

Promise.all([connectToDb()])
  .then(() => app.listen(PORT, () => console.log(`${PORT} server is running`)))
  .catch((error) => {
    console.error(`Mongo DB atlas error : ${error}`);
    process.exit();
  });
