import start from './src';

const { PORT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

start({
  http: { port: PORT },
  db: {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    dbName: DB_NAME,
  },
})
  .then(() => console.log('started')) // eslint-disable-line no-console
  .catch(err => console.log(err)); // eslint-disable-line no-console
