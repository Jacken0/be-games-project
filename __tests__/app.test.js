const db = require('../db/index.js');
const app = require('../app');
const request = require('supertest');

const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('app', () => {
  test("status: 404, invalid URL message", () => {
		return request(app)
			.get("/invalid")
			.expect(404)
			.then(({ body }) => {
				expect(body.message).toBe("Invalid URL");
			});
	});

  describe('/api/categories', () => {
    describe('GET', () => {
      test('status: 200, responds with an array of category objects', () => {
        return request(app)
        .get('/api/categories')
        .expect(200)
        .then(({ body }) => {
          const { categories } = body;
          expect(categories).toBeInstanceOf(Array);
          expect(categories).toHaveLength(4);
          categories.forEach((category) => {
            expect(category).toMatchObject({
              slug: expect.any(String),
              description: expect.any(String),
            })
          })
        })
      })
    })
  })

  describe('/api/reviews/:review_id', () => {
    describe('GET', () => {
        test('status: 200, responds with single review', () => {
          return request(app)
          .get('/api/reviews/1')
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual({
              review: {
                review_id: 1,
                title: 'Agricola',
                designer: 'Uwe Rosenberg',
                owner: 'mallionaire',
                review_img_url:
                  'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                review_body: 'Farmyard fun!',
                category: 'euro game',
                created_at: "2021-01-18T10:00:20.514Z",
                votes: 1,
                comment_count: '0'
              }
            })
          })
        })
        test('status: 400, Invalid data type', () => {
          return request(app)
          .get('/api/reviews/not_a_number')
          .expect(400)
          .then(({ body }) => {
            expect(body.message).toBe('Invalid input data')
          })
        })
        test('status: 404, Review not found', () => {
          return request(app)
          .get('/api/reviews/5555') // Number out of range
          .expect(404)
          .then(({ body }) => {
            expect(body.message).toBe('Review not found')
          })
        })
    })

    describe('PATCH', () => {
        test('Status: 200, and updated review object', () => {
          return request(app)
          .patch('/api/reviews/1')
          .send({ inc_votes: 5 })
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual({ review: {
              review_id: 1,
              title: 'Agricola',
              review_body: 'Farmyard fun!',
              designer: 'Uwe Rosenberg',
              review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
              votes: 6,
              category: 'euro game',
              owner: 'mallionaire',
              created_at: '2021-01-18T10:00:20.514Z'
            }
            })
          })
        });
        test('Status: 200, and unchanged review object when sent empty object', () => {
          return request(app)
          .patch('/api/reviews/1')
          .send({ })
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual({ review: {
              review_id: 1,
              title: 'Agricola',
              review_body: 'Farmyard fun!',
              designer: 'Uwe Rosenberg',
              review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
              votes: 1,
              category: 'euro game',
              owner: 'mallionaire',
              created_at: '2021-01-18T10:00:20.514Z'
            }
            })
          })
        });
        test('Status: 404, and message review not found', () => {
          return request(app)
          .patch('/api/reviews/9999')
          .send({ inc_votes: 5 })
          .expect(404)
          .then(({ body }) => {
            expect(body.message).toBe('Review not found')
          })
        });
        test('Status: 400, and message Invalid data type', () => {
          return request(app)
          .patch('/api/reviews/not_an_id')
          .send({ inc_votes: 5 })
          .expect(400)
          .then(({ body }) => {
            expect(body.message).toBe('Invalid input data')
          })
        });
        test('Status: 400, and message Invalid data type', () => {
          return request(app)
          .patch('/api/reviews/1')
          .send({ inc_votes: 'ten' })
          .expect(400)
          .then(({ body }) => {
            expect(body.message).toBe('Invalid input data')
          })
        });
    })
  })

  describe('/api/reviews', () => {
    describe('GET', () => {
      test('Status: 200, and returns an array of review objects', () => {
        return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(({ body }) => {
          const { reviews } = body;
          expect(reviews).toBeInstanceOf(Array)
          expect(reviews).toHaveLength(13)
          reviews.forEach((review) => {
            expect(review).toMatchObject({
              owner: expect.any(String),
              title: expect.any(String),
              review_id: expect.any(Number),
              category: expect.any(String),
              review_img_url: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(String)
            })
          })
        })
      })
      test('status: 200, reviews are sorted by date as default', () => {
        return request(app)
          .get('/api/reviews')
          .expect(200)
          .then(({ body }) => {
              expect(body.reviews).toBeSortedBy('created_at', { 
                descending: true 
              })
          })
      })
      test('status: 200, accepts sort_by query', () => {
        return request(app)
          .get('/api/reviews?sort_by=title')
          .expect(200)
          .then(({ body }) => {
              expect(body.reviews).toBeSortedBy('title', { 
                descending: true 
              });
          });
      });
      test('status: 400, message of invalid sort query', () => {
        return request(app)
          .get('/api/reviews?sort_by=not_a_valid_query')
          .expect(400)
          .then(({ body }) => {
              expect(body.message).toBe('Invalid sort query');
          });
      });
      test('status: 400, message of invalid data type', () => {
        return request(app)
          .get('/api/reviews?sort_by=9999')
          .expect(400)
          .then(({ body }) => {
              expect(body.message).toBe('Invalid sort query');
          });
      });
      test('status: 200, invalid sort_by query uses default sorting', () => {
        return request(app)
          .get('/api/reviews?soby=title')
          .expect(200)
          .then(({ body }) => {
              expect(body.reviews).toBeSortedBy('created_at', { 
                descending: true 
              });
          });
      });
      test('status: 200, reviews are ordered DESC by default', () => {
        return request(app)
          .get('/api/reviews')
          .expect(200)
          .then(({ body }) => {
            expect(body.reviews).toBeSortedBy('created_at', { 
              descending: true 
            })
          })
      })
      test('status: 200, accepts order query', () => {
        return request(app)
          .get('/api/reviews?order=asc')
          .expect(200)
          .then(({ body }) => {
            expect(body.reviews).toBeSortedBy('created_at', { 
              ascending: true 
            })
          })
      })
      test('status: 400, message of invalid order query', () => {
        return request(app)
          .get('/api/reviews?order=INVALID')
          .expect(400)
          .then(({ body }) => {
            expect(body.message).toBe('Invalid order query')
          })
      })
      test('status: 400, message of invalid data type', () => {
        return request(app)
          .get('/api/reviews?order=5555')
          .expect(400)
          .then(({ body }) => {
            expect(body.message).toBe('Invalid order query')
          })
      })
      test('Status: 200, returns only reviews for category of dexterity', () => {
        return request(app)
          .get('/api/reviews?category=dexterity')
          .expect(200)
          .then(({ body }) => {
            const { reviews } = body;
            expect(reviews).toBeInstanceOf(Array)
            expect(reviews).toHaveLength(1)
            reviews.forEach((review) => {
              expect(review).toMatchObject({
                owner: expect.any(String),
                title: expect.any(String),
                review_id: expect.any(Number),
                category: 'dexterity',
                review_img_url: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                comment_count: expect.any(String)
              })
            })
          })
      })
      test('Status: 400, error message of no matching category when passed a string', () => {
        return request(app)
          .get('/api/reviews?category=not_a_category')
          .expect(400)
          .then(({ body }) => {
            expect(body.message).toBe('No matching category')
          })
      })
      test('Status: 400, error message of no matching category when passed an invalid data type', () => {
        return request(app)
          .get('/api/reviews?category=5555')
          .expect(400)
          .then(({ body }) => {
            expect(body.message).toBe('No matching category')
          })
      })
    })
  })

  describe('/api/reviews/:review_id/comments', () => {
    describe('GET', () => {
      test('status: 200, responds with an array of comment objects', () => {
        return request(app)
        .get('/api/reviews/2/comments')
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          expect(comments).toBeInstanceOf(Array);
          expect(comments).toHaveLength(3);
          comments.forEach((comment) => {
            expect(comment).toMatchObject({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
            })
          })
        })
      })
      test('status: 200, no comments for this review yet, post now to be the first!', () => {
        return request(app)
        .get('/api/reviews/1/comments')
        .expect(200)
        .then(({ body }) => {
          expect(body.message).toBe('No comments for this review yet, post now to be the first!')
        })
      })
      test('status: 404, review not found', () => {
        return request(app)
        .get('/api/reviews/5555/comments')
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe('review not found')
        })
      })
      test('status: 400, invalid data type', () => {
        return request(app)
        .get('/api/reviews/not_valid/comments')
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe('Invalid input data')
        })
      })
    })
    describe('POST', () => {
      test('status: 201, responds with added comment', () => {
        const newComment = {
          username: 'bainesface',
          body: 'THIS IS A TEST'
        }
        return request(app)
        .post('/api/reviews/1/comments')
        .send(newComment)
        .expect(201)
        .then(({ body }) => {
          expect(body.comment).toMatchObject({
            body: 'THIS IS A TEST',
            votes: expect.any(Number),
            author: 'bainesface',
            comment_id: expect.any(Number),
            created_at: expect.any(String)
          })
        })
      });
      test('status: 201, responds with added comment ignoring extra elements', () => {
        const newComment = {
          username: 'bainesface',
          body: 'THIS IS A TEST',
          category: 'euro game',
          unused: 'test'
        }
        return request(app)
        .post('/api/reviews/1/comments')
        .send(newComment)
        .expect(201)
        .then(({ body }) => {
          expect(body.comment).toMatchObject({
            body: 'THIS IS A TEST',
            votes: expect.any(Number),
            author: 'bainesface',
            comment_id: expect.any(Number),
            created_at: expect.any(String)
          })
        })
      })
      test('status: 400, invalid username', () => {
        const newComment = {
          username: 'NOT_A_USER',
          body: 'THIS IS A TEST'
        }
        return request(app)
        .post('/api/reviews/1/comments')
        .send(newComment)
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe('username not found')
        })
      })
      test('status: 400, invalid username data type', () => {
        const newComment = {
          username: 5555,
          body: 'THIS IS A TEST'
        }
        return request(app)
        .post('/api/reviews/1/comments')
        .send(newComment)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe('Invalid username')
        })
      })
      test('status: 400, invalid body', () => {
        const newComment = {
          username: 'bainesface',
          body: 5555
        }
        return request(app)
        .post('/api/reviews/1/comments')
        .send(newComment)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe('Invalid body')
        })
      });
      test('status: 400, missing body', () => {
        const newComment = {
          username: 'bainesface',
        }
        return request(app)
        .post('/api/reviews/1/comments')
        .send(newComment)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe('Missing required field(s)')
        })
      });
      test('status: 400, missing username', () => {
        const newComment = {
          body: 'THIS IS A TEST',
        }
        return request(app)
        .post('/api/reviews/1/comments')
        .send(newComment)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe('Missing required field(s)')
        })
      });
      test('status: 400, missing all required fields', () => {
        const newComment = {}
        return request(app)
        .post('/api/reviews/1/comments')
        .send(newComment)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe('Missing required field(s)')
        })
      });
      test('status: 404, review_id valid but doesn\'t exist message review not found', () => {
        const newComment = {
          username: 'bainesface',
          body: 'THIS IS A TEST'
        }
        return request(app)
        .post('/api/reviews/5555/comments')
        .send(newComment)
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe('Review not found')
        })
      })
      test('status: 404, review_id valid but doesn\'t exist message review not found', () => {
        const newComment = {
          username: 'bainesface',
          body: 'THIS IS A TEST'
        }
        return request(app)
        .post('/api/reviews/NOT_AN_ID/comments')
        .send(newComment)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe('Invalid input data')
        })
      })
    })
  })

  describe('/api/comments/:comment_id', () => {
    describe('DELETE', () => {
      test('Status: 204, no return', () => {
        return request(app)
        .delete('/api/comments/1')
        .expect(204)
        .then(() => {
          return request(app)
          .get('/api/comments')
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).toHaveLength(5)
          })
        })      
      })
      test('status: 400, message comment not found', () => {
        return request(app)
        .delete('/api/comments/5555')
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe('comment not found')
        })
      })
      test('status: 400, message invalid input data', () => {
        return request(app)
        .delete('/api/comments/NOT_VALID')
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe('Invalid input data')
        })
      })
    })
  })

  describe('/api', () => {
    describe('GET', () => {
      test('status: 200, returns all endpoints', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual({
            "GET /api": {
              "description": "provides a json representation of all the available endpoints of the api"
            },
            "GET /api/categories": {
              "description": "provides an array of all categories",
              "queries": [],
              "exampleResponse": {
                "categories": [
                  {
                    "description": "Players attempt to uncover each other's hidden role",
                    "slug": "Social deduction"
                  }
                ]
              }
            },
            "GET /api/reviews": {
              "description": "provides an array of all reviews",
              "queries": ["sort_by", "order", "category"],
              "exampleResponse": {
                "reviews": [
                  {
                    "owner": "bainesface",
                    "title": "Ultimate Werewolf",
                    "review_id": 2,
                    "category": "social deduction",
                    "review_img_url": "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
                    "created_at": "2021-01-18T10:00:20.514Z",
                    "votes": 5,
                    "comment_count": 6
                  }
                ]
              }
            },
            "GET /api/reviews/:review_id": {
              "description": "provides an array with just one review",
              "queries": [],
              "exampleResponse": {
                "reviews": [
                  {
                    "owner": "bainesface",
                    "title": "Ultimate Werewolf",
                    "review_id": 2,
                    "review_body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "designer": "Akihisa Okui",
                    "category": "social deduction",
                    "review_img_url": "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
                    "created_at": "2021-01-18T10:00:20.514Z",
                    "votes": 5,
                    "comment_count": 6
                  }
                ]
              }
            },
            "PATCH /api/reviews/:review_id": {
              "description": "provides an array with the updated review",
              "queries": [],
              "exampleResponse": {
                "reviews": [
                  {
                    "review_id": 1,
                    "title": "Agricola",
                    "review_body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "designer": "Uwe Rosenberg",
                    "review_img_url": "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
                    "votes": 6,
                    "category": "euro game",
                    "owner": "mallionaire",
                    "created_at": "2021-01-18T10:00:20.514Z"
                  }
                ]
              }
            },
            "GET /api/reviews/:review_id/comments": {
              "description": "provides an array with all comments for a review",
              "queries": [],
              "exampleResponse": {
                "comments": [
                  {
                    "comment_id": 1,
                    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "votes": 6,
                    "author": "mallionaire",
                    "created_at": "2021-01-18T10:00:20.514Z"
                  }
                ]
              }
            },
            "POST /api/reviews/:review_id/comments": {
              "description": "provides an array with the new comment for a review",
              "queries": [],
              "exampleResponse": {
                "comments": [
                  {
                    "comment_id": 1,
                    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "votes": 6,
                    "author": "mallionaire",
                    "created_at": "2021-01-18T10:00:20.514Z"
                  }
                ]
              }
            },
            "DELETE /api/reviews/:review_id/comments": {
              "description": "provides only a status code of 204"
            }
          })
        })
      })
    })
  })
})
