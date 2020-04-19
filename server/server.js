const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');

const schema = require('../schema/schema');
const config = require('../config.json');

global.mock = require('../mock.json');

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}));

const PORT = config.port;

app.listen(PORT, err => {
	err ? console.log(err) : console.log('Server online');
});
