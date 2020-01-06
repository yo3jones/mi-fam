import mongoose from 'mongoose';
import userSchema from './user';
import familySchema from './family';

export default async ({ host, port, user, password, dbName }) => {
  const url = `mongodb://${user}:${password}@${host}:${port}/${dbName}?authSource=admin`;

  const instance = await mongoose.connect(url, {
    useNewUrlParser: true,
  });

  return instance;
};

export const User = mongoose.model('User', userSchema);
export const Family = mongoose.model('Family', familySchema);

export const Models = {
  User,
  Family,
};
