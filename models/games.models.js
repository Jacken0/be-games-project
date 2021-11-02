const db = require('../db');

exports.fetchCategories = () => {
  return db.query(`
    SELECT * FROM categories;`)
  .then(({ rows }) => {
    return rows;
  })
}
exports.fetchReviews = ({ review_id }) => {
  console.log(review_id, 'TEST')
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

// COUNT(comments) AS comment_count

// -- LEFT JOIN comments
//     -- ON reviews.review_id = comments.review_id

//-- GROUP BY review.review_id