const {
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLID
} = require('graphql');

const {
	categoryType,
	productType,
} = require('./types');

const { models } = global.db;

const Query = new GraphQLObjectType({
	name: 'Query',
	fields: {
		product: {
			type: productType,
			args: { id: { type: GraphQLID } },
			resolve(_, args) {
				return models.product.findOne({ raw: true, where: { id: args.id } });
			}
		},
		categorys: {
			type: categoryType,
			args: { id: { type: GraphQLID } },
			resolve(_, args) {
				return models.category.findOne({ raw: true, where: { id: args.id } })
			}
		}
	}
});


module.exports = new GraphQLSchema({
	query: Query
});
