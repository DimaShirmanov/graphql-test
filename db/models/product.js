module.exports = function (engine, Sequelize) {
    const table = engine.define('product',
        {
            name: Sequelize.STRING,
            categoryId: Sequelize.INTEGER
        },
        {
            freezeTableName: true, tableName: 'product'
        }
    );

    table.associate = function (models) {
        table.belongsTo(models.category, { foreignKey: 'categoryId', as: 'category' });
    }

    return table;
}