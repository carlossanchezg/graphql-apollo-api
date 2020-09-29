/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import mongoose from 'mongoose';
// eslint-disable-next-line no-unused-vars
import colors from 'colors';

const getMongoDBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected 🥳'.magenta.bold);
  } catch (error) {
    console.log('Error connecting to database 👻'.red.bold, error);
  }
};

export { getMongoDBConnection };
