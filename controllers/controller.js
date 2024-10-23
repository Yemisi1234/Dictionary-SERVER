import { DictionaryEntry } from "../model/dictionary-model.js";
export const searchTerm = async (req, res) => {
  try {
    const term = req.params.term.toLowerCase();
    const entry = await DictionaryEntry.findOne({ term });

    if (!entry) {
      return res.json({ term, definitions: ["No definition found."] });
    }

    if (!popularSearches.includes(term)) {
      popularSearches.push(term);
    }

    res.json(entry);
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addEntry = async (req, res) => {
  try {
    const { term, definitions } = req.body;

    const newEntry = new DictionaryEntry({
      term: term.toLowerCase(),
      definitions,
    });

    await newEntry.save();
    res.status(201).json({ message: "Entry added successfully!" });
  } catch (error) {
    console.error("Add Entry Error:", error);
    res.status(500).json({ error: "Error adding entry" });
  }
};

export const getPopularSearches = async (req, res) => {
  try {
    console.log("step1");
    const result = await DictionaryEntry.find();
    console.log("step2");
    return res.status(200).json(result);
  } catch (error) {
    console.log("step3");
    console.error("Error fetching popular searches:", error);
    res.status(500).json({ error: "Failed to fetch popular searches" });
  }
};
