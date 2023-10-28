const express = require('express')
const app = express();
var cors = require('cors')
const port = 3001;
app.use(express.json());
app.use(cors());

const connectToMongo = require('./db');
// here are some available routes
app.use('/api/auth', require ('./routes/auth'));
app.use('/api/notes', require ('./routes/notes'));
app.listen(port, () => {
   
  console.log(`NoteWell  running on port ${port}`)
})

connectToMongo();