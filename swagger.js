const express = require('express');

const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const host = '127.0.0.1';
const port = 7709;

app.listen(port, host, () => {
  console.log(`Swagger on http://${host}:${port}/api-docs`);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
