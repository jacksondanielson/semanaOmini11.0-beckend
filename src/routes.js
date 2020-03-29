const express = require('express');

const OngController = require('./controller/OrgController');
const IcidentsController = require('./controller/IcidentesController');
const ProfileController = require('./controller/ProfileController');
const SessionController = require('./controller/SessionController');

const routes = express.Router();

routes.post('/session', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/icidents', IcidentsController.index);
routes.post('/icidents', IcidentsController.create);
routes.delete('/icidents/:id', IcidentsController.delete);

module.exports = routes;