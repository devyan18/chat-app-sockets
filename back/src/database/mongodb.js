import { connect } from 'mongoose'

export const connectDB = async (URI) => {
  try {
    const connection = await connect(URI)
    if (!connection) throw new Error('Error connecting to database')
    console.log(`Connected to database ${connection.connection.db.databaseName}`)
  } catch (error) {
    console.log(error)
  }
}
