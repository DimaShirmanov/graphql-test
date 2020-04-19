const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();
const config = global.config = require('../config.json');
require('../db');

global.mock = require('../mock.json');

Promise.all([
	db.engine.sync()
]).then(_ => {

	app.use('/graphql', graphqlHTTP({
		schema: require('../schema/schema'),
		graphiql: true
	}));

	app.listen(config.port, err => {
		err ? console.log(err) : console.log('Server online');
	});
});
