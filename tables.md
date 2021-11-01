categories 
    slug  - unique  - primary key

comments
    comment_id
    author     - user.username
    review_id


reviews
    review_id    primary Key
    title
    owner      -  user.username
    category   - category.slug


users
    username   - unique - primary key
    name