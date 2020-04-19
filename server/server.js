const express = require('express');
const app = express();
const config = require('../config.json');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}));

const PORT = config.port;

app.listen(PORT, err => {
	err ? console.log(err) : console.log('Server online');
});
