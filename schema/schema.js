const {
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLID
} = require('graphql');

const {
	categoryType,
	productType,
	products,
	categorys
} = require('./types');


const Query = new GraphQLObjectType({
	name: 'Query',
	fields: {
		product: {
			type: productType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return products.find(item => item.id == args.id);
			}
		},
		categorys: {
			type: categoryType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return categorys.find(item => item.id == args.id);
			}
		}
	}
});


module.exports = new GraphQLSchema({
	query: Query
});
