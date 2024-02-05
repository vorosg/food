import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs';

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

const saveMeal = async (meal) => {
    meal.slug = slugify(meal.title, {lower: true});
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}_uploaded.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`)
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error(`Saving image: ${meal.image.name} to file: ${fileName} failed!`);
        }
    });

    meal.image = `/images/${fileName}`;

    db.prepare(`
        INSERT INTO meals
            (title, summary, instructions, creator, creator_email, image, slug)
        VALUES
            (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
    `).run(meal);
}

export { getMeals, getMeal, saveMeal };