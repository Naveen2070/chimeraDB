const { ChimeraDB } = require('./dist/chimera');

const chimera = new ChimeraDB('MyDatabase');
chimera.createDB();
chimera.createTable('Users', ['ID', 'Name', 'Email']);
chimera.insertIntoTable('Users', [1, 'Alice', 'alice@example.com']);
chimera.insertIntoTable('Users', [2, 'Bob', 'bob@example.com']);

chimera.createCollection('Documents');
chimera.insertIntoCollection('Documents', {
  id: '1',
  title: 'Document 1',
  content: 'Content of Document 1',
});
chimera.insertIntoCollection('Documents', {
  id: '2',
  title: 'Document 2',
  content: 'Content of Document 2',
});

chimera.saveDB();
