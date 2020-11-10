require('dotenv').config()
module.exports = {
    db: process.env.DB_DATABASE,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    host:process.env.DB_HOST,
    dialect:process.env.DB_DIALECT

}