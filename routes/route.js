import express from "express";
import {
  searchTerm,
  addEntry,
  getPopularSearches,
} from "../controllers/controller.js";

const router = express.Router();

router.get("/entries/popularSearches", getPopularSearches);
router.get("/entries/:searchTerm", searchTerm);

router.post("/entries", addEntry);
export default router;
