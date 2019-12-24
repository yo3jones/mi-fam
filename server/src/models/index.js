import mongoose from 'mongoose';
import user from './user';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

export const User = mongoose.model('User', user);

export const connect = async () => {
  const instance = await mongoose.connect(
    `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`,
    {
      useNewUrlParser: true,
    }
  );

  instance.connection.useDb(DB_NAME);

  return instance;
};
