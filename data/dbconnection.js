import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { callbackify } from "util";

dotenv.config();

const DB_URL = process.env.DB_URL;

let _connection = null;

const mongoclientConnectWithCallback = callbackify(function callbackifyConnect(
  url
) {
  return MongoClient.connect(url);
});

function open() {
  if (get() == null) {
    mongoclientConnectWithCallback(DB_URL, function connect(err, client) {
      if (err) {
        console.error("DB connection failed", err);
        return;
      }
      _connection = client.db(process.env.DB_NAME);
      console.log("DB connection open");
    });
  }
}

function get() {
  return _connection;
}

export { open, get };
