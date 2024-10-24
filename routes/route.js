import express from "express";
import {
  searchTerm,
  addEntry,
  getTopPopularSearches,
} from "../controllers/controller.js";

const router = express.Router();

router.get("/entries/popularSearches", getTopPopularSearches);
router.get("/entries/:searchTerm", searchTerm);

router.post("/entries", addEntry);
export default router;
