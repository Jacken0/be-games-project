const db = require('../db');

exports.fetchComments = ({ review_id }) => {
  return db.query(`
  SELECT comment_id, votes, created_at, author, body
  FROM comments
  WHERE review_id = $1;`, [review_id])
  .then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({
        status: 200, message: 'No comments for this review yet, post now to be the first!'
      })
    }
    return rows
  })
}