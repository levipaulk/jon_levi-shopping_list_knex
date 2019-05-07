require('dotenv').config();

module.exports = {
    DATABASE_URL: process.env.DB_URL || 'postgress://localhost/knex-practice'
};