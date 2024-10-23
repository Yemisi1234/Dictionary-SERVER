import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DB_URL, {});
    console.log("Mongoose connected to " + process.env.DB_NAME);
  } catch (err) {
    console.error("Mongoose connection error: ", err);
  }

  mongoose.connection.on("disconnected", function () {
    console.log("Mongoose disconnected");
  });

  mongoose.connection.on("error", function (err) {
    console.error("Mongoose connection error: " + err);
  });

  process.on("SIGINT", async function () {
    try {
      await mongoose.connection.close();
      console.log(
        process.env.SIGINT_MESSAGE ||
          "Mongoose connection closed due to application termination."
      );
      process.exit(0);
    } catch (err) {
      console.error("Error closing mongoose connection:", err);
      process.exit(1);
    }
  });
}

export { connectToDatabase };
