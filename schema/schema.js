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
				return global.db.findAll(global.db.models.product, {
					where: {
						id: args.id
					}
				})
			}
		},
		categorys: {
			type: categoryType,
			args: { id: { type: GraphQLID } },
			resolve(_, args) {
				return global.db.findAll(global.db.models.category, {
					where: {
						id: args.id
					}
				})
			}
		}
	}
});


module.exports = new GraphQLSchema({
	query: Query
});
