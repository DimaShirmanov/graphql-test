const {
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLID
} = require('graphql');

const {
	categoryType,
	productType,
} = require('./types');


const Query = new GraphQLObjectType({
	name: 'Query',
	fields: {
		product: {
			type: productType,
			args: { id: { type: GraphQLID } },
			resolve(_, args) {
				return global.mock.products.find(item => item.id == args.id);
			}
		},
		categorys: {
			type: categoryType,
			args: { id: { type: GraphQLID } },
			resolve(_, args) {
				return global.mock.categorys.find(item => item.id == args.id);
			}
		}
	}
});


module.exports = new GraphQLSchema({
	query: Query
});
