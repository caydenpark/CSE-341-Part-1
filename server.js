// express web server
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const express = require('express');
const app = express();

const contactRoutes = require('./routes/contacts.js');

const routes = require('./routes/index.js');

app.use(express.json());
app.use('/', routes);
app.use('/contacts', contactRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 3000;

app.listen(process.env.PORT || port);
console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
