import userDetailsRouter from './user-details-route.js';
import jobsRouter from './jobs-route.js';
import cookieRouter from './cookie-route.js';

const initializeRoutes = (app) => {
    app.use('/user', userDetailsRouter);
    app.use('/create', jobsRouter);
    app.use('/get', jobsRouter);
    app.use('/validate', cookieRouter);
}

export default initializeRoutes;