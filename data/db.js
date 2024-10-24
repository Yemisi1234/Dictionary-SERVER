import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = `mongodb+srv://user1234:test1234@cluster0.ffwwp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
function connectToDatabase() {
  try {
    mongoose.connect(DB_URL, {});
    console.log("Mongoose connected to " + process.env.DB_NAME);
  } catch (err) {
    console.error("Mongoose connection error: ", err);
  }
  mongoose.connection.on("connected", function () {
    console.log("Mongoose connected");
  });
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
