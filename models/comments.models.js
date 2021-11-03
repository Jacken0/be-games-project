const db = require('../db');

exports.fetchComments = ({ review_id }) => {
  return db.query(`
  SELECT comment_id, votes, created_at, author, body
  FROM comments
  WHERE review_id = $1;`, [review_id])
  .then(({ rows }) => {
    if (rows.length === 0) {
      return db.query(`
      SELECT * FROM reviews
      WHERE review_id = $1;`,
      [review_id]
      )
      .then(({ rows }) => {
        if (rows.length !== 0) {
          return Promise.reject({
            status: 200, message: 'No comments for this review yet, post now to be the first!'
          })
        }
        return Promise.reject({
          status: 404, message: 'review not found'
        })
      })     
    }
    return rows
  })
}

exports.insertComment = ({ review_id },{ username, body }) => {
  return db.query(`
  INSERT INTO comments (
    author, body, review_id )
    VALUES ($1, $2, $3)
    RETURNING* ;`,
    [username, body, review_id]
  )
  .then(({ rows }) => {
    console.log(rows)
    return rows[0]
  })
}