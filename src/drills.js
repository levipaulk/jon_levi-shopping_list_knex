require('dotenv').config();
const { DATABASE_URL} = require('../config');

const knex = require('knex')({
    client: 'pg',
    connection: DATABASE_URL,
    debug:true
})

// =============================================================================
// 1. Get all items that contain text
// =============================================================================

function searchForItem(searchTerm) {
    knex
        .from('shopping_list')
        .select('*')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        })
};

// searchForItem('bur');

// =============================================================================
// 2. Get all items paginated
// =============================================================================

function paginateItems(pageNumber) {
    const pageLength = 6;
    const offset = pageLength * (pageNumber - 1);
    knex
        .from('shopping_list')
        .select('id', 'name')
        .limit(pageLength)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
};

// paginateItems(2);
// =============================================================================
// 3. Get all items added after date
// =============================================================================

function getItemsAddedAfterDate(daysAgo=2) {
    knex
        .from('shopping_list')
        .select('id', 'name', 'date_added')
        .where(
            'date_added',
            '>',
            knex.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .then(result => {
            console.log(result)
        })
};

// getItemsAddedAfterDate(5);
// =============================================================================
// 4. Get the total cost for each category
// =============================================================================

function totalCostPerCategory() {
    knex
        .from('shopping_list')
        .select('category')
        .sum('price AS total')
        .groupBy('category')
        .then(result => {
            console.log(result)
        })
};

totalCostPerCategory();