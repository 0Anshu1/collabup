import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  console.log("Successfully connected to MongoDB.");
} catch(e) {
  console.error("Error connecting to MongoDB:", e);
}

let db = conn.db("collabup");

export default db;