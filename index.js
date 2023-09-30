const express = require('express');
require('dotenv').config({ path: '.env.local' });
const app = express();
const port = process.env.portno;
const cors = require('cors');
app.use(express.json());
app.use(cors());

const connectToDatabase = require('./db.js');
connectToDatabase() 
  .then(({links}) => {
    app.use ('/api/link', require('./routes/link')(links));
    
  })
  .catch(error => {
    console.error('Error:', error);
  });

app.get('/', (req, res) => {
    console.log("hello");
  res.send('Hello World');
});


app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});