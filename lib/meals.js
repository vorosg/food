import sql from 'better-sqlite3';

const db = sql('meals.db');

const getMeals = async() => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // throw new Error('Loading melas failed!');
    return db.prepare('SELECT * FROM meals').all();    // .all() fetches all records
                                                // .get() for 1 singular record 
                                                // .run() for inserting / changing data
}

const getMeal = (slug) => {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export { getMeals, getMeal };