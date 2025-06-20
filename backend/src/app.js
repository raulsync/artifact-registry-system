import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { dbConnect } from "./config/db.js";
import artifactRoutes from "./routes/artifact.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 7777;

app.use("/api/auth", authRoutes);
app.use("/api/artifacts", artifactRoutes);

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
