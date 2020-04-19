const {
    GraphQLList,
    GraphQLObjectType
} = require('graphql');

const {
    stringType,
    idType
} = require('./typeFields');

const ProductType = new GraphQLObjectType({
    name: 'Product',
    description: 'it is a product',
    fields: () => ({
        id: idType,
        name: stringType,
        articul: stringType
    })
});

const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: idType,
        name: stringType,
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, _) {
                return global.db.getByUuid(global.db.category, {
                    where: {
                        id: parent.categoryId
                    }
                });
            }
        }
    })
});


module.exports = {
    categoryType: CategoryType,
    productType: ProductType,
};