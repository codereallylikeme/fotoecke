// test-db.js
require('dotenv').config({ path: '.env' })
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

async function testConnection() {
  try {
    console.log('Connecting to MongoDB Atlas...')
    console.log(
      'URI:',
      MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')
    )

    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    })

    console.log('✅ Successfully connected to MongoDB Atlas!')

    // Test creating a simple document
    const TestSchema = new mongoose.Schema({ test: String })
    const TestModel = mongoose.model('Test', TestSchema)

    const testDoc = new TestModel({ test: 'Connection successful!' })
    await testDoc.save()

    console.log('✅ Successfully created test document!')

    // Clean up
    await TestModel.deleteOne({ _id: testDoc._id })
    console.log('✅ Test document cleaned up!')
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
  } finally {
    await mongoose.disconnect()
    console.log('📤 Disconnected from MongoDB')
    process.exit(0)
  }
}

testConnection()
