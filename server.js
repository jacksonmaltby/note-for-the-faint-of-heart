const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

let notes = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/assets/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/assets/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const newNote = {
    id: notes.length + 1,
    title: req.body.title,
    text: req.body.text,
  };
  notes.push(newNote);
  res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
