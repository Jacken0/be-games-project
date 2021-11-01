const db = require('../db/index.js');
const app = require('../app');
const request = require('supertest');

const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('app', () => {
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
})
