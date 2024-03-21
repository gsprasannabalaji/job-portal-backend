require("dotenv").config();
require("./config/mongodb");
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

const routes = require('./routes');

const app = express();
// const port = 3000
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

// configure the routers
// app.use('/user/getAll', getUsersRouter);
// app.use('/user/)
app.use(routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
})