import userDetailsRouter from './user-details-route.js';

const initializeRoutes = (app) => {
    app.use('/user', userDetailsRouter);
}

export default initializeRoutes;