const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const AiRoutes = require('./routes/ai.routes');
const cors = require('cors');
const allowedOrigins = [
  "https://reviewer-ten.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));
app.use(express.json());
app.use('/ai', AiRoutes);

app.get("/",(req, res) => {
  res.send("Hello World!");
});

module.exports = app;