import mongoose from "mongoose";

const dictionarySchema = new mongoose.Schema(
  {
    term: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    definitions: {
      type: [String],
      required: true,
    },
    searchCount: { type: Number, default: 0 },
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
