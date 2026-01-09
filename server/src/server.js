const express = require('express');
const DBconnection = require('./config/db');
const dotenv = require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

DBconnection();

const app = express();

// Allow frontend origin
app.use(cors({
  origin: "http://localhost:5173", // your frontend port
  credentials: true, // optional, if you use cookies
}));

//Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log("➡️ Incoming:", req.method, req.url);
  next();
});
//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/test", (req, res) => {
  res.send("API working");
});

//Default route
app.get('/', (req, res) => {
  res.send('Hello Wocrld!');
});

const PORT = process.env.PORT || 4000;
//to start the server
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});