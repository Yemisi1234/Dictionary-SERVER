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
    const totalCount = await DictionaryEntry.countDocuments({
      searchCount: { $gt: 4 },
    });

    const randomSkip = Math.floor(Math.random() * Math.max(totalCount - 10, 0));

    const randomSearches = await DictionaryEntry.find({
      searchCount: { $gt: 4 },
    })
      .skip(randomSkip)
      .limit(10);

    if (randomSearches.length < 10) {
      const remainingSearches = await DictionaryEntry.find()
        .sort({ searchCount: -1 })
        .limit(10 - randomSearches.length);

      const combined = [...randomSearches, ...remainingSearches];
      return res.status(200).json(combined);
    }

    res.status(200).json(randomSearches);
  } catch (error) {
    next(error);
  }
};
