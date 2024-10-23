import express from "express";
import {
  searchTerm,
  addEntry,
  getPopularSearches,
} from "../controllers/controller.js";

const router = express.Router();

router.get("/search/:term", searchTerm);

router.post("/entry", addEntry);

router.get("/popular", getPopularSearches);

export default router;
