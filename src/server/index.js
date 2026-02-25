import "dotenv/config";
import express from "express";
import { MongoClient } from "mongodb";
import path from "path";
import { fileURLToPath } from "url";

const { MONGODB_URI, DB_NAME = "quiz", PORT = 3000 } = process.env;

if (!MONGODB_URI) {
  console.error(
    "MONGODB_URI is not set. Create a .env file with your connection string.",
  );
  process.exit(1);
}

const client = new MongoClient(MONGODB_URI);
const app = express();

app.use(express.json());

let db;

app.get("/api/questions", async (_req, res) => {
  try {
    const questions = await db.collection("questions").find().toArray();
    res.json(questions);
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

try {
  await client.connect();
  db = client.db(DB_NAME);
  console.log(`Connected to MongoDB database "${DB_NAME}"`);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} catch (error) {
  console.error("Failed to connect to MongoDB:", error);
  process.exit(1);
}
