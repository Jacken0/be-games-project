const db = require('../db');

exports.fetchCategories = () => {
  return db.query(`
    SELECT * FROM categories;`)
  .then(({ rows }) => {
    return rows;
  })
}