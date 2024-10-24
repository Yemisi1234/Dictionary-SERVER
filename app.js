import { MongoClient } from "mongodb";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const url = `mongodb+srv://user1234:test1234@cluster0.ffwwp.mongodb.net/NewDictionary?retryWrites=true&w=majority&appName=Cluster0`;
  const client = new MongoClient(url);

  try {
    await client.connect();
    const database = client.db(process.env.DB_NAME);
    const collection = database.collection("words");

    const data = JSON.parse(
      fs.readFileSync("./englishdictionary.json", "utf8")
    );

    if (!Array.isArray(data)) {
      throw new Error("Data is not an array. Please check the JSON file.");
    }

    const validData = data.filter((item) => item.word != null);

    const bulkOps = validData.map((item) => ({
      insertOne: {
        document: {
          word: item.word,
          wordtype: item.wordtype,
          definition: item.definition,
          searchCount: 0,
        },
      },
    }));

    if (bulkOps.length > 0) {
      const result = await collection.bulkWrite(bulkOps, { ordered: false });
      console.log(`${result.insertedCount} documents inserted.`);
    } else {
      console.log("No valid documents to insert.");
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
