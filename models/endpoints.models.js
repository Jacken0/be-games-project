const fs = require('fs/promises');

exports.fetchEndpoints = () => {
  console.log('HELLO')
  return {
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
  }
  
}
// return fs.readFile('../routes/endpoints.json','utf-8', (err, data))
//   .then((data) => {
//     console.log(data,'NOT HERE?')
//     return response
//   })