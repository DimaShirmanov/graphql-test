const {
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLObjectType
} = require('graphql');
const id = { type: GraphQLID };
const string = { type: GraphQLString };

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
        id: id,
        name: string,
        articul: string
    })
});

const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: id,
        name: string,
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return products.filter(item => item.categoryId == parent.id);
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