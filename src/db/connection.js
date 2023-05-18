const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'db',
  user: 'root',
  password: 'password',
  database: 'TalkerDB',
  port: 3306,
});

module.exports = connection;