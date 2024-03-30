import swaggerAutogen from 'swagger-autogen';

const doc = {
  info : {
    title: 'User Management',
    description: 'REST API for CRUD operations to manage users data using express.js',
  },
  host : 'localhost:3000',
  schemes : ['http'],
}

const outputFile = './swagger-output.json';
const routes = ['./api/routes/index.js', './api/model/*.js'];

swaggerAutogen(outputFile, routes, doc).then(async() => {
  await import('./server.js');
});