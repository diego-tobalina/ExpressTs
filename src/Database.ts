const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        require: true,
        rejectUnauthorized: false
    }
});
const connect = async () => {
    await sequelize.authenticate()
        .then(r => console.log(`Connection has been established successfully.`))
        .catch(e => console.error(`Unable to connect to the database: ${e}`));
    await sequelize.sync({force: false, alter: true})
        .then(r => console.log("All models were synchronized successfully."))
        .catch(e => console.error(`Error in the model synchronization: ${e}`));

}


export {sequelize, connect};
