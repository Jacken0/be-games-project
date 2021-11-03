const db = require('../db');

exports.fetchComments = ({ review_id }) => {
  return db.query(`
  SELECT comment_id, votes, created_at, author, body
  FROM comments
  WHERE review_id = $1;`, [review_id])
  .then(({ rows }) => {
    console.log(rows,'model')
    return rows
  })
}