
# The Games Room API

## Project Summary

This API seeds a database with game reviews, comments and categories.
It allows the user to retrieve all the information stored in various ways, as well as post and delete comments and edit reviews.

---

## Hosted Version

If you would like to see the API in action with no setup required, please head [here](https://jacks-games.herokuapp.com/api).


## Hosting A Local Instance

If you would like to host a local version of my API please follow these instructions.

- Fork and clone this repository.
- `cd` into your local repository and open the code.
- Run npm install
  - this should install all packages needed to use the API.

Inside the package are some handy scripts to help create the database and run the test suite.
These are all used via 
```http
npm run
```
```http
setup-dbs   - creates the database.
seed        - populates the database with tables and data.
start       - starts listening on the relevant port.
test        - runs the test suite.
```

To create the database simply use the command `npm run setup-dbs`.

After the database has been initaialised use `npm run seed` to populate it will tables and data.

To run the test suite simply use `npm test`. This will atomatically poplulate the test database with testing data, allowing you to test functionality using much smaller data sets.
The test suite will also re-seed the data after each test to allow for optimal testing conditions.

## Additional Setup

### **Important**

This API uses `.env` files to control which data is seeded to which database.

You will need to create 2 `.env` files.
- `.env.dev` 
  - this needs to hold the following data
  ```http
  PGDATABASE=nc_games
  ```
- `.env.test`
  - this needs to hold the following data
  ```http
  PGDATABASE=nc_games_test
  ```
*please note - these files are in the .gitignore file by default.*

---

This API requires :
- `Node.js` version 6.9.0 or above.
- `postgres` version 2.2.0 or above.