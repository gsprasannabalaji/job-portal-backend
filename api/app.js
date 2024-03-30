import express from 'express';
import initializeRoutes from "./routes/index.js";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const swaggerFile = require("../swagger-output.json");

const initialize = (app) => {
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(cors());
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    app.use('/api/images', express.static(path.join(__dirname, "./images")));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
    mongoose.connect(process.env.MONGO_URL);
    initializeRoutes(app);
}

export default initialize;