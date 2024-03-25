import express from 'express';
import initializeRoutes from "./routes/index.js";
import mongoose from "mongoose";
import path from "path";

const initialize = (app) => {
    app.use(express.json());
    app.use(express.urlencoded());
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    app.use('/api/images', express.static(path.join(__dirname, "./images")));
    mongoose.connect(process.env.MONGO_URL);
    initializeRoutes(app);
}

export default initialize;