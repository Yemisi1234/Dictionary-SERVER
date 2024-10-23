// import dotenv from "dotenv";
// import { MongoClient } from "mongodb";
// import { callbackify } from "util";

// dotenv.config();

// const DB_URL = `mongodb+srv://user1234:test1234@cluster0.ffwwp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
// // const DB_URL = process.env.DB_URL;
// let _connection = null;

// const mongoclientConnectWithCallback = callbackify(function callbackifyConnect(
//   url
// ) {
//   return MongoClient.connect(url);
// });

// function open() {
//   if (get() == null) {
//     mongoclientConnectWithCallback(DB_URL, function connect(err, client) {
//       if (err) {
//         console.error("DB connection failed", err);
//         return;
//       }
//       _connection = client.db(process.env.DB_NAME);
//       console.log("DB connection open");
//     });
//   }
// }

// function get() {
//   return _connection;
// }

// export { open, get };
