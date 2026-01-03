const express = require('express');
const DBconnection = require('./config/db');
const dotenv = require('dotenv').config();
const authRoutes = require('./routes/authRoutes');

DBconnection();

const app = express();

//Middleware
app.use(express.json());

//Routes
app.use("api/auth", authRoutes);

app.get("/test", (req, res) => {
  res.send("API working");
});

//Default routev 
app.get('/', (req, res) => {
  res.send('Hello Wocrld!');
});



const PORT = process.env.PORT || 4000;
//to start the server
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});