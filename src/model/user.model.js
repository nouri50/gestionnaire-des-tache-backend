const mysql = require('mysql2');
const { database } = require('../config/config');

const pool = mysql.createPool(database);
const promisePool = pool.promise();

const User = {
  findAll: async () => {
    const [rows] = await promisePool.query('SELECT * FROM users');
    return rows;
  },
  findById: async (id) => {
    const [rows] = await promisePool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },
  create: async (username, password) => {
    const [result] = await promisePool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
    return result.insertId;
  },
};

module.exports = User;
