const express = require("express");

const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static("public"));

app.use(express.json());

//ROUTE HANDLERS

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

//APP.LISTEN
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

/* 
1. connect the notes HTML to Index HTML
  2.require in all the applications and pages we need
  3.

2.

*/
