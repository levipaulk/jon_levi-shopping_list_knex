require('dotenv').config();
const { DATABASE_URL_SL} = require('../config');

const knex = require('knex')({
    client: 'pg',
    connection: DATABASE_URL_SL,
    debug:true
})
