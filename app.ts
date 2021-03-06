import express from 'express';
import path from 'path';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';
import articleRoutes from './routes/articles';

// ENV CONFIG
dotenv.config();

// Express
const app = express();

// CORS
app.use(cors());


// Routes

// Middleware
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/articles", articleRoutes);

app.use("/users", (req, res, next) => {
    console.log("Users middleware");
    next();
});

// Routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", (req, res) => {
    res.send("Users!");
});

const MONGO_URI = process.env.MONGO_URI as string;

mongoose.connect(
    MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to DB")
);

app.use("/static", express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
