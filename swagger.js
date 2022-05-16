const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Commands API',
    description: 'This will commands for various lanaguages and Frameworks'
  },
  host: 'week5projectlake.herokuapp.com/',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

