const db = require('../db');
const format = require('pg-format');

const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;

  return db.query('DROP TABLE IF EXISTS comments;')
  .then(() => db.query('DROP TABLE IF EXISTS reviews;'))
  .then(() => db.query('DROP TABLE IF EXISTS categories;'))
  .then(() => db.query('DROP TABLE IF EXISTS users;'))

  .then(() => { db.query(`
    CREATE TABLE users (
      username VARCHAR PRIMARY KEY,
      name VARCHAR NOT NULL,
      avatar_url TEXT
    );`)
  })
  .then(() => { db.query(`
    CREATE TABLE categories (
      slug VARCHAR PRIMARY KEY,
      description VARCHAR
    );`)
  })
  .then(() => { db.query(`
    CREATE TABLE reviews (
      review_id SERIAL PRIMARY KEY,
      title VARCHAR NOT NULL,
      review_body TEXT,
      designer VARCHAR,
      review_img_url VARCHAR DEFAULT https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg,
      votes INT DEFAULT 0,
      category VARCHAR REFERENCES categories(slug),
      owner VARCHAR REFENENCES users(username),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`)
  })
  .then(() => { db.query(`
    CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR REFERENCES users(username),
      review_id INT REFERENCES reviews(review_id),
      votes INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      body TEXT
    );`)})

  //create users
  //create categories
  //create reviews
  //create comments

  // 1. create tables
  // 2. insert data
};

module.exports = seed;
