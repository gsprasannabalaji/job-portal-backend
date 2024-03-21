const swaggerAutogen  = require('swagger-autogen');

const doc = {
  info : {
    title: 'User Management',
    description: 'REST API for CRUD operations to manage users data using express.js',
  },
  host : 'localhost:3000',
  schemes : ['http'],
}

const outputFile = './swagger-output.json';
const routes = ['./app.js','./model/*.js'];

swaggerAutogen(outputFile, routes, doc).then(() => {
  require('./app.js'); // Your project's root file
});