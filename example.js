const { ChimeraDB } = require('./dist/chimera');

async function main() {
  // Create a new ChimeraDB instance
  const chimera = new ChimeraDB('MyDatabase');

  // Example usage
  try {
    // Create a logical database
    await chimera.createDB('UserDB');

    // Create a table in the current logical database
    await chimera.createTable('Users', ['id', 'name', 'email']);

    // Insert rows into the table
    await chimera.insertIntoTable('Users', [1, 'Alice', 'alice@example.com']);
    await chimera.insertIntoTable('Users', [2, 'Bob', 'bob@example.com']);

    // Select and display all rows from the table
    const users = await chimera.selectFromTable('Users');
    console.log('Users:', users);

    // Create a collection in the current logical database
    await chimera.createCollection('Documents');

    // Insert documents into the collection
    await chimera.insertIntoCollection('Documents', {
      title: 'Document 1',
      content: 'Content 1',
    });
    await chimera.insertIntoCollection('Documents', {
      title: 'Document 2',
      content: 'Content 2',
    });

    // Select and display all documents from the collection
    const documents = await chimera.selectFromCollection('Documents');
    console.log('Documents:', documents);

    // Drop the table and collection
    await chimera.dropTable('Users');
    await chimera.dropCollection('Documents');

    // Drop the logical database
    await chimera.dropDatabase('UserDB');

    // Drop the physical database group (including all logical databases)
    await chimera.dropDatabaseGroup();
  } catch (error) {
    console.error('Error:', error.message);
  }
}
main();
