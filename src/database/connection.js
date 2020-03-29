const knex = require('knex');
const configuratio = require('../../knexfile');

const connection = knex(configuratio.development);

module.exports = connection;