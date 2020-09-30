/* eslint-disable no-console */
import mongoose from 'mongoose';

export default async () => {
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
