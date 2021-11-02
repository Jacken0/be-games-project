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
    SELECT reviews.*, COUNT(comments.review_id) AS comment_count
    FROM reviews
    LEFT JOIN comments
    ON reviews.review_id = comments.review_id
    WHERE reviews.review_id = $1 
    GROUP BY reviews.review_id;`, [review_id])
  .then(({ rows }) => {
    const review = rows[0];
    
    if (!review) {
      return Promise.reject({ status: 404, message: 'Review not found'})
    }
    return review;
  })
}

exports.updateReview = ({ review_id }, { inc_votes }) => {
  return db.query(`
    UPDATE reviews 
    SET votes = votes + $1
    WHERE review_id = $2
    RETURNING * ;`,
    [inc_votes, review_id])
  .then(({ rows }) => {
    console.log(rows)
    return rows[0]
  })
}

// exports.addReview = () => {

// }