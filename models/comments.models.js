const db = require('../db');

exports.fetchComments = ({ review_id }) => {
  return db.query(`
  SELECT comment_id, votes, created_at, author, body
  FROM comments
  WHERE review_id = $1;`, [review_id]
  )
  .then(({ rows }) => {
    if (rows.length === 0) {
      return db.query(`
      SELECT * FROM reviews
      WHERE review_id = $1;`,
      [review_id]
      )
      .then(({ rows }) => {
        if (rows.length !== 0) {
          return [];
        };
        return Promise.reject({
          status: 404, message: 'review not found'
        });
      });
    };
    return rows
  });
};

exports.insertComment = ({ review_id },{ username, body }) => {
  return db.query(`
  SELECT * FROM reviews
  WHERE review_id = $1;`,
  [review_id]
  )
  .then(({ rows }) => {
    const review = rows[0];  
    if (!review) {
      return Promise.reject({ status: 404, message: 'Review not found'})
    };
    if (!username || !body) {
      return Promise.reject({ status: 400, message: 'Missing required field(s)'})
    };
    return db.query(`
    SELECT * FROM users
    WHERE username = $1;`,
    [username]
    )
    .then(({ rows }) => {
      if (typeof username !== 'string') {
        return Promise.reject({
          status: 400, message: 'Invalid username'
        })
      }
      if (rows.length === 0) {
        return Promise.reject({
          status: 404, message: 'username not found'
        });
      } else if (
        typeof body != 'string') {
          return Promise.reject({
            status: 400, message: 'Invalid body'
          });
      } else {
        return db.query(`
        INSERT INTO comments (
        author, body, review_id )
        VALUES ($1, $2, $3)
        RETURNING* ;`,
        [username, body, review_id]
      )
      .then(({ rows }) => rows[0] );
      };
    });
  });
};  

exports.removeComment = ({ comment_id }) => {
  return db.query(`
  DELETE FROM comments
  WHERE comment_id = $1
  RETURNING * ;`,
  [comment_id]
  )
  .then(({ rows }) => {
    const comment = rows[0]
    if (!comment) {
      return Promise.reject({ status: 404, message: 'comment not found'
      });
    };
    return comment
  });
};

exports.fetchAllComments = () => {
  return db.query(`
  SELECT *
  FROM comments;`)
  .then(({ rows }) => rows );
};