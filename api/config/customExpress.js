const express = require('express');
//const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const controller = require('../controllers/microservice-controller');

module.exports = function() {
	var app = express();

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(expressValidator());
	
	controller(app);

	/*consign()
		.include('controllers')
		.then('repository')
		.into(app);*/

	return app;
};
