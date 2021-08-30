const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 3001;
const app = express();
const util = require("util");
const { v4: uuidv4 } = require("uuid");

//MIDDLEWARE
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

//ROUTE HANDLERS

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

//APP.LISTEN

// Function to write data to the JSON file given a destination and some content

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

// Function to read data from a given a file and append some content
const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

// GET Route for retrieving all the notes
app.get("/api/notes", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile(path.join(__dirname, "/db/db.json"), "utf8").then((data) =>
    res.json(JSON.parse(data))
  );
});

// POST Route for a new UX/UI tip
app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a notes`);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, path.join(__dirname, "/db/db.json"));
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding Note");
  }
});

app.delete("/api/notes/:ID", (req, res) => {
  req.params.ID;
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
