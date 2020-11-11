require('dotenv').config()
module.exports = {
    db: process.env.DB_DATABASE,
    dialect:process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
}