require('dotenv').config();

const knex = require('knex');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})

console.log('connection successful');

// =============================================================================
// Two ways to tell the knexinstance which table we want to query
// exampleInstance.from('example_table')
// exampleInstance('example_table')
// =============================================================================

// const q1 = knexInstance('amazong_products').select('*').toQuery()
// const q2 = knexInstance.from('amazong_products').select('*').toQuery()
// console.log('q1:', q1)
// console.log('q2:', q2)

// =============================================================================

// knexInstance.from('amazong_products').select('*')
//     .then(result => {
//         console.log(result)
//     })

// =============================================================================
//  Equivalent to:
//  SELECT product_id, name, price, category
//  FROM amazong_products
//  WHERE name = 'Point of view gun';
// =============================================================================
// .first() will only select the first item (taking the first object out of the array)

// knexInstance
//     .select('product_id', 'name', 'price', 'category')
//     .from('amazong_products')
//     .where({ name: 'Point of view gun' })
//     .first()
//     .then(result => {
//         console.log(result)
//     })

// =============================================================================
// Same as above, but using the to query method
// =============================================================================

// const qry = knexInstance
//     .select('product_id', 'name', 'price', 'category')
//     .from('amazong_products')
//     .where({ name: 'Point of view gun' })
//     .first()
//     .toQuery()

// console.log(qry);

// =============================================================================
// Search amazong_products table for items with the word cheese:
// SELECT product_id, name, price, category
// FROM amazong_products
// WHERE name ILIKE '%holo%';
//   LIKE is case sensitive, ILIKE is case insensitive
// =============================================================================

// const searchTerm = 'holo'

// knexInstance
//   .select('product_id', 'name', 'price', 'category')
//   .from('amazong_products')
//   .where('name', 'ILIKE', `%${searchTerm}%`)
//   .then(result => {
//     console.log(result)
//   })

// as a function...

// function searchByProduceName(searchTerm) {
//     knexInstance
//       .select('product_id', 'name', 'price', 'category')
//       .from('amazong_products')
//       .where('name', 'ILIKE', `%${searchTerm}%`)
//       .then(result => {
//         console.log(result)
//       })
//   }
  
//   searchByProduceName('holo')

// =============================================================================
// Build a query that allows customers to paginate the amazong_products
// table products, 10 products at a time

// SELECT product_id, name, price, category
//   FROM amazong_products
// LIMIT 10
//   OFFSET 0;

// If we want page 4, to find the offset: we'd minus one from the page 
// number (3), multiply this number by the limit, 10, giving us 30.

// SELECT product_id, name, price, category
//   FROM amazong_products
// LIMIT 10
//   OFFSET 30;
// =============================================================================

// function paginateProducts(page) {
//     const productsPerPage = 10
//     const offset = productsPerPage * (page - 1)
//     knexInstance
//       .select('product_id', 'name', 'price', 'category')
//       .from('amazong_products')
//       .limit(productsPerPage)
//       .offset(offset)
//       .then(result => {
//         console.log(result)
//       })
// }
  
// paginateProducts(2)

// =============================================================================
// Filter Amazong products that have images

// SELECT product_id, name, price, category, image
//   FROM amazong_products
//   WHERE image IS NOT NULL;
// =============================================================================

// function getProductsWithImages() {
//     knexInstance
//       .select('product_id', 'name', 'price', 'category', 'image')
//       .from('amazong_products')
//       .whereNotNull('image')
//       .then(result => {
//         console.log(result)
//       })
//   }
  
//   getProductsWithImages()

// =============================================================================
// Find the most popular Whopipe videos

// SELECT video_name, region, count(date_viewed) AS views
// FROM whopipe_video_views
//   WHERE date_viewed > (now() - '30 days'::INTERVAL)
// GROUP BY video_name, region
// ORDER BY region ASC, views DESC;
// =============================================================================

function mostPopularVideosForDays(days) {
    knexInstance
        .select('video_name', 'region')
        .count('date_viewed AS views')
        .where(
            'date_viewed',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
        )
        .from('whopipe_video_views')
        .groupBy('video_name', 'region')
        .orderBy([
            { column: 'region', order: 'ASC'},
            { column: 'views', order: 'DESC'},
        ])
        .then(result => {
            console.log(result)
        })
}

mostPopularVideosForDays(30)