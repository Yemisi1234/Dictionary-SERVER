import mongoose from "mongoose";

const dictionarySchema = new mongoose.Schema(
  {
    word: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    wordtype: {
      type: String,
      required: true,
      trim: true,
    },
    definition: {
      type: String,
      required: true,
    },
    searchCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
export const DictionaryEntry = mongoose.model(
  "Word",
  dictionarySchema,
  "words"
);
