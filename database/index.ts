import { MongoClient } from "mongodb";

export async function connectDB() {
  try {
    const url = process.env.DATABASE_URL;
    const client = new MongoClient(url);

    await client.connect();
    console.log("🔌 Connected to the Mongo database");
    const db = client.db(process.env.DATABASE_NAME);
    return db;

  } catch (error) {
    console.log("An error occured while connecting to the Mongo database.");
    console.log("Please verify the connexion url and database name.");
    console.error(error);
  }
}
