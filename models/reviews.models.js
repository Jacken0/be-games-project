const db = require("../db");

exports.fetchCategories = () => {
  return db
    .query(
      `
    SELECT * FROM categories;`
    )
    .then(({ rows }) => rows);
};

exports.fetchReviews = ({ review_id }) => {
  return db
    .query(
      `
    SELECT 
      reviews.*, 
      COUNT(comments.review_id) AS comment_count
    FROM reviews
    LEFT JOIN comments
    ON reviews.review_id = comments.review_id
    WHERE reviews.review_id = $1 
    GROUP BY reviews.review_id;`,
      [review_id]
    )
    .then(({ rows }) => {
      const review = rows[0];
      if (!review) {
        return Promise.reject({ status: 404, message: "Review not found" });
      }
      return review;
    });
};

exports.updateReview = ({ review_id }, { inc_votes = 0 }) => {
  return db
    .query(
      `
    UPDATE reviews 
    SET votes = votes + $1
    WHERE review_id = $2
    RETURNING * ;`,
      [inc_votes, review_id]
    )
    .then(({ rows }) => {
      const review = rows[0];
      if (!review) {
        return Promise.reject({ status: 404, message: "Review not found" });
      }
      return review;
    });
};

exports.fetchAllReviews = (
  sort_by = "reviews.created_at",
  order = "desc",
  category
) => {
  if (
    ![
      "owner",
      "review_id",
      "category",
      "reviews.votes",
      "comment_count",
      "title",
      "reviews.created_at",
    ].includes(sort_by)
  ) {
    return Promise.reject({ status: 400, message: "Invalid sort query" });
  }
  if (!["asc", "desc", "ASC", "DESC"].includes(order)) {
    return Promise.reject({ status: 400, message: "Invalid order query" });
  }
  if (/\d+/.test(category)) {
    return Promise.reject({
      status: 400,
      message: "Invalid category",
    });
  }

  let queryStr = `
    SELECT 
      owner, 
      title, 
      reviews.review_id, 
      category, review_img_url, 
      reviews.created_at, reviews.votes, 
      COUNT(comments.review_id) AS comment_count
    FROM reviews
    LEFT JOIN comments
    ON reviews.review_id = comments.review_id`;

  const queryValues = [];

  if (category) {
    queryValues.push(category);
    queryStr += `
      WHERE category = $1`;
  }

  queryStr += `
    GROUP BY reviews.review_id
    ORDER BY ${sort_by} ${order}
    ;`;

  return db.query(queryStr, queryValues).then(({ rows }) => {
    if (rows.length === 0) {
      return db
        .query(
          `
      SELECT * FROM categories
      WHERE slug = $1;`,
          [category]
        )
        .then(({ rows }) => {
          if (rows.length > 0) {
            return [];
          }
          return Promise.reject({
            status: 404,
            message: "No matching category",
          });
        });
    }
    return rows;
  });
};
