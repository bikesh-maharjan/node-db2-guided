const knex = require("knex");
const knexfile = require("../knexfile");
const environment = process.env.NODE_ENV || "development";
const config = knexfile[environment];
// const config = knexfile.environment; <-- can't use this way because the environment is not deffined.
module.exports = knex(config);
