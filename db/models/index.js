const Sequlize = require('sequelize');


module.exports = function (engine) {
    const models = {
        category: require('./category')(engine, Sequlize),
        product: require('./product')(engine, Sequlize)
    };

    Object.keys(models).forEach(function (modelName) {
        if ("associate" in models[modelName]) {
            models[modelName].associate(models);
        }
    });

    return models;
}