const {
    GraphQLList,
    GraphQLObjectType
} = require('graphql');

const {
    stringType,
    idType
} = require('./typeFields');

const products = [
    { id: 1, name: "Молоко", categoryId: 123 },
    { id: 2, name: "Зерновой хлеб", categoryId: 312 },
    { id: 3, name: "Мучной хлеб", categoryId: 312 },
];

const categorys = [
    {
        id: 123,
        name: 'Молочные продукты'
    },
    {
        id: 312,
        name: 'Хлеба'
    }
];

const ProductType = new GraphQLObjectType({
    name: 'Product',
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
                return global.mock.products.filter(item => item.categoryId == parent.id);
            }
        }
    })
});


module.exports = {
    categoryType: CategoryType,
    productType: ProductType,
    products,
    categorys
};