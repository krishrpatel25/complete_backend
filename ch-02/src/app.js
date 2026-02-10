import express from "express";

import { noteModel } from "./models/note.model.js";

export const app = express();
app.use(express.json());
/*

POST /notes => Create a new note
GET /notes => Get all notes
GET /notes/:id => Get a note by ID
PUT /notes/:id => Update a note by ID
DELETE /notes/:id => Delete a note by ID

*/

app.post("/notes", async (req, res) => {
  try {
    const { title, description } = req.body;

    await noteModel.create({ title, description });

    res.status(201).json({
      message: "Note created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create note",
      error: error.message,
    });
  }
});

app.get("/notes", async (req, res) => {
  const notes = await noteModel.find();
  // find() always return array ager object apiye je finad karvano hoy jo na male to empty array [] return kare
  //findOne() single object return kare, jodi kono match na kari sake tayare null return kare

  /*
  
  find() => [ {note1}, {note2}, {note3} ] or []
  findOne() => {note} or null

   */
  res.status(200).json({
    message: "Notes retrieved successfully",
    notes: notes,
  });
});

app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  await noteModel.findOneAndDelete({ _id: id });
  res.status(200).json({
    message: "Note deleted successfully",
  });
});

app.patch("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const description = req.body.description;

  await noteModel.findOneAndUpdate({ _id: id }, { description: description });

  res.status(200).json({
    message: "Note updated successfully",
  });
});
