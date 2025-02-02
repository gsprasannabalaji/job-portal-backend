import express from 'express';
import initialize from './api/app.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

initialize(app);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

export default app;