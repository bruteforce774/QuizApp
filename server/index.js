import "dotenv/config";
import express from "express";
import { MongoClient } from "mongodb";
import he from "he";

const { MONGODB_URI, DB_NAME, PORT } = process.env;

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

app.get("/api/questions", async (req, res) => {
  try {
    if(req.query.topic === 'general') {
      // fetch from Open Trivia API
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&category=9&type=multiple",
      );
      const data = await response.json();
      const questions = data.results
        .filter((q) => !q.question.toLowerCase().includes('following'))
        .map((q) => ({
        question: he.decode(q.question),
        answer: he.decode(q.correct_answer),
      }));
      return res.json(questions);
    }
    else {
      const questions = await db.collection("questions").find({ topic: req.query.topic }).toArray();
      res.json(questions);
    }
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
