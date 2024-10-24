import dotenv from "dotenv";
import express, { urlencoded } from "express";
import cors from "cors";
import router from "./routes/route.js";
import { connectToDatabase } from "./data/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
await connectToDatabase();

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    error: "An internal server error occurred",
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
