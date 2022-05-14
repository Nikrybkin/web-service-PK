'use strict';

const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const customerRoutes = require('./routes/customerRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', customerRoutes.routes, deliveryRoutes.routes, productRoutes.routes, orderRoutes.routes)

app.listen(config.port, () => console.log('Server is listening on http://localhost:' + config.port))