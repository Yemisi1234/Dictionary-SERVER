import mongoose from "mongoose";
import { DictionaryEntry } from "../model/dictionary-model.js";

export const addEntry = async (req, res, next) => {
  try {
    const { term, definitions } = req.body;

    const newEntry = new DictionaryEntry({
      term: term.toLowerCase(),
      definitions,
    });

    await newEntry.save();
    res.status(201).json({ message: "Entry added successfully!" });
  } catch (error) {
    next(error);
  }
};

export const searchTerm = async (req, res, next) => {
  try {
    const term = req.params.searchTerm.toLowerCase();
    const entry = await DictionaryEntry.findOneAndUpdate(
      { term },
      { $inc: { searchCount: 1 } },
      { new: true }
    );

    if (!entry) {
      return res.json({
        term,
        definitions: ["No definition found."],
        searchCount: 0,
      });
    }

    res.json(entry);
  } catch (error) {
    next(error);
  }
};

export const getTopPopularSearches = async (req, res, next) => {
  try {
    const topSearches = await DictionaryEntry.find()
      .sort({ searchCount: -1 })
      .limit(10);

    res.status(200).json(topSearches);
  } catch (error) {
    next(error);
  }
};
