const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs')
const notes = require('./db/db.json');
const uuidv1 = require("uuidv1");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.get('/api/notes', (req, res) => {res.json(notes)});


app.post('/api/notes', (req, res) => {
  console.log(req.body);

  notes.push({
    title: req.body.title,
    text:req.body.text,
    id:uuidv1()
  });
  fs.writeFileSync("./db/db.json", JSON.stringify(notes),"utf-8");
  res.json(notes);

});




app.delete("/api/notes/:id", (req, res) => {
  // console.log(notes)
  let temp = notes.filter((n) => n.id !== req.params.id);

fs.writeFileSync("./db/db.json", JSON.stringify(temp),"utf-8");
res.json(temp);
console.log(temp);
});

app.get('/', (req, res) => {res.sendFile(path.join(__dirname, "./public/index.html"));});
app.get('/notes', (req, res) => {res.sendFile(path.join(__dirname, "./public/notes.html"));});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));