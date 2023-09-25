require('dotenv').config({ path: '.env.local' });
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.URI
console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function connectToDatabase() {
  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connected to database');
    
    const database = client.db('shortener');
    const links = database.collection('links');
    
    // You can optionally return the collection here or any other objects you need.
    return {links};
  } catch (err) {
    console.error('Error connecting to database:', err);
    throw err;
  }
}

module.exports = connectToDatabase;
