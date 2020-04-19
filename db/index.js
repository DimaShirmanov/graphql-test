const Sequelize = require('sequelize');
const initModels = require('./models');
const engine = new Sequelize(global.config.db.connection, {
    logging: false
});

global.db = {
    engine: engine,
    Sequelize: Sequelize,
    models: initModels(engine)
};

db.engine.sync();

module.exports = global.db;