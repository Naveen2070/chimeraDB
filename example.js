const { connect, create } = require('./dist/main');

function Db() {
  // Create a new database instance if it doesn't exist
  const db = create('testDB');

  // Create a new table
  db.createTable('users', ['id', 'name', 'email']);

  // Insert into the table
  db.insertIntoTable('users', [1, 'Alice', 'alice@example.com']);
  db.insertIntoTable('users', [2, 'Bob', 'bob@example.com']);

  // Create a new collection
  db.createCollection('products');

  // Insert into the collection
  db.insertIntoCollection('products', { id: 1, name: 'Laptop', price: 999.99 });
  db.insertIntoCollection('products', { id: 2, name: 'Phone', price: 699.99 });

  // Retrieve data from the database
  getDb();

  // Drop the table
  db.dropTable('users');

  // Drop the collection
  db.dropCollection('products');

  // Drop the database
  db.dropDatabase();
}

// Run the database operations
Db();

// Function to retrieve data from the database
function getDb() {
  // Connect to the existing database
  const db = connect('testDB');

  // Retrieve products from collection
  const products = db.selectFromCollection('products');
  console.log('Products:', products);

  // Retrieve users from table
  const users = db.selectFromTable('users');
  console.log('Users:', users);
}
