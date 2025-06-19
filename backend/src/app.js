import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { dbConnect } from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 7777;

dbConnect()
  .then(() => {
    console.log("Database Connected Successfully");
    app.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database can not be connected", err.message);
  });
