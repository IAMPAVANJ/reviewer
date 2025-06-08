const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const AiRoutes = require('./routes/ai.routes');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/ai', AiRoutes);

app.get("/",(req, res) => {
  res.send("Hello World!");
});

module.exports = app;