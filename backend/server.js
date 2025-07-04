const express = require("express");
const dotenv = require("dotenv");
const { MongoClient, ObjectId } = require("mongodb");
const bodyparser = require("body-parser");
const cors = require("cors");

dotenv.config();

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "passnest";

const app = express();
const port = 3000;
app.use(bodyparser.json());
app.use(cors());

client.connect();

//Get all the passwords
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

//Save a password
app.post("/", async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  try {
    const result = await collection.insertOne(password);
    const insertedDocument = { _id: result.insertedId, ...password };
    res.status(201).json(insertedDocument);
  } catch (error) {
    console.error("Error inserting password:", error);
    res
      .status(500)
      .json({
        message: "Failed to save password to database",
        error: error.message,
      });
  }
});

//Update an existing password by ID
app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");

  // --- ADD CONSOLE LOGS HERE ---
  console.log("Backend: PUT request received for ID:", id);
  console.log("Backend: Data to update with:", updatedData);

  try {
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    // --- ADD CONSOLE LOGS HERE ---
    console.log("Backend: updateOne result:", result);

    if (result.matchedCount === 0) {
      console.log("Backend: No document matched for ID:", id);
      return res
        .status(404)
        .json({ success: false, message: "Password not found" });
    } // Optionally, fetch the updated document to send it back

    const updatedDoc = await collection.findOne({ _id: new ObjectId(id) });
    // --- ADD CONSOLE LOGS HERE ---
    console.log("Backend: Fetched updated document:", updatedDoc);

    res.status(200).json(updatedDoc); // Send the actual updated document
  } catch (error) {
    console.error("Backend: Error updating password:", error);
    res
      .status(500)
      .json({ message: "Failed to update password", error: error.message });
  }
});

//Delete a password by id
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  res.send({ success: true, result: result });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
