const swaggerAutogen  = require('swagger-autogen');

const doc = {
  info : {
    title: 'My API',
    description: 'REST API for CRUD operations using express.js',
  },
  host : 'localhost:3000',
  schemes : ['http'],
}

const outputFile = './swagger-output.json';
const routes = ['./app.js','./model/*.js'];

swaggerAutogen(outputFile, routes, doc).then(() => {
  require('./app.js'); // Your project's root file
});