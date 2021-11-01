const db = require('../db');

exports.fetchCategories = () => {
  return db.query(`
    SELECT * FROM categories;`)
  .then(({ rows }) => {
    return rows;
  })
}
exports.fetchReviews = ({ review_id }) => {
  return db.query(`
    SELECT * FROM reviews
    WHERE review_id = $1;`, [review_id])
  .then(({ rows }) => {
    return rows[0];
  })
}