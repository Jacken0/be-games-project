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
  describe('/api/reviews', () => {
    describe('/:review_id', () => {
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
      describe.only('PATCH', () => {
        test('Status: 201, and updated review object', () => {
          return request(app)
          .patch('/api/reviews/1')
          .send({ inc_votes: 5 })
          .expect(201)
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
        })
      })
      // describe('POST', () => {
      //   test('Status: 201, adds new review to review table', () => {

      //   })
      // })
    })
  })
})
