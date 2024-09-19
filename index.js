const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

// No usar app.listen() en entornos sin servidor (Vercel)
connectDB().then(() => {
    console.log("Connected to DB ***");
});

module.exports = app;
