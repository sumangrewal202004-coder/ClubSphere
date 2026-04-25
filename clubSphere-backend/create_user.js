const { Client } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect().then(async () => {
  const hash = await bcrypt.hash('placeholder_not_used', 10);
  await client.query(
    `INSERT INTO users (email, password_hash, role, name, college_id) VALUES ($1, $2, 'college', $3, NULL)`,
    ['admin@gmail.com', hash, 'Test College']
  );
  console.log('User created');
  client.end();
}).catch(console.error);