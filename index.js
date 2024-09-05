const express = require('express');
const port = 8000;
const app = express();

const connectDatabase = require('./db/db'); 
require('dotenv').config(); 
connectDatabase();
app.use(express.urlencoded())
app.use("/user",require("./router/router"))
app.listen(port, (err) => {
  if (err) {
    console.log('Error starting server:', err);
  } else {
    console.log('Server connected on port', port);
  }
});
