module.exports = function (engine, Sequelize) {
    const table = engine.define('category',
        {
            name: Sequelize.STRING,
        },
        {
            freezeTableName: true, tableName: 'category'
        }
    );

    return table;
}