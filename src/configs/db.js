const {Sequelize} = require('sequelize')
const env=require("./env")

const db=new Sequelize(env.DB_NAME,env.DB_USER,env.DB_PASS,{
    logging:false,
    host:env.DB_HOST,
    dialect:"mysql",
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
})

module.exports = db