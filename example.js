const { connect, create } = require('./dist/main');

async function Db() {
  try {
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
    db.insertIntoCollection('products', {
      id: 1,
      name: 'Laptop',
      price: 999.99,
    });
    db.insertIntoCollection('products', {
      id: 2,
      name: 'Phone',
      price: 699.99,
    });

    // Retrieve data from the database
    await getDb();

    // Drop the table
    db.dropTable('users');

    // Drop the collection
    db.dropCollection('products');

    // Drop the database
    db.dropDatabase();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the database operations
Db();

// Function to retrieve data from the database
async function getDb() {
  try {
    // Connect to the existing database
    const db = connect('testDB');

    // Retrieve products from collection
    const productsBeforeUpdate = db.selectFromCollection('products');
    console.log('Products before update:', productsBeforeUpdate);

    // Retrieve users from table
    const usersBeforeUpdate = db.selectFromTable('users');
    console.log('Users before update:', usersBeforeUpdate);

    // Update a document in the collection
    const updatedDoc = { id: 1, name: 'Updated Laptop', price: 1099.99 };
    db.updateDocument('testDB', 'products', '1', updatedDoc);

    // Update a row in the table
    const updatedRow = { name: 'Updated Alice' };
    db.updateRow('testDB', 'users', 1, updatedRow);

    // Retrieve products from collection
    const products = db.selectFromCollection('products');
    console.log('Products after update:', products);

    // Retrieve users from table
    const users = db.selectFromTable('users');
    console.log('Users after update:', users);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
