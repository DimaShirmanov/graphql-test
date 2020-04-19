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

global.db.getByUuid = function (table, uuid) {
    return new Promise(function (resolve, reject) {
        table.findOne({ raw: true, where: { uuid: uuid } }).then(function (data) {
            resolve(data || {});
        }).catch(function (err) {
            reject(err.errors[0].message);
        });
    });
}

global.db.findAll = function (table, query) {
    return new Promise((resolve, reject) => {
        table.findAndCountAll(query)
            .then(function (result) {
                if (Boolean(result)) {
                    resolve({ rows: result.rows, all: result.count });
                } else {
                    reject([]);
                }
            })
    });
};

global.db.put = function (table, query) {
    return new Promise(function (resolve, reject) {
        if (!query.uuid) {

            return table.create(query).then(function (result) {
                resolve(result.get());
            }).catch(function (err) {
                console.log('Error ADD: ', err);
                reject(err.toString());
            });
        }

        table.findOne({ raw: true, where: { uuid: query.uuid } })
            .then(function (result) {
                if (result) return table.update(query, { where: { uuid: query.uuid } });
                else return table.create(query);
            })
            .then(function (result) {

                if (Boolean(query.uuid)) {
                    if (result.get) {
                        resolve(query);
                    } else if (result[0] > 0) resolve(query); else reject("Invalid arguments");
                } else resolve(result.get());
            })
            .catch(function (err) {
                reject(err.message);
            });
    });
}


module.exports = global.db;