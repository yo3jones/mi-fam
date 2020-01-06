import 'dotenv/config';
import portfinder from 'portfinder';
import mongoose from 'mongoose';
import fs from 'fs';
import { Models } from '../src/models';
import start from '../src';
import { init as initFactories } from './factories';

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  TEST_DB_NAME,
  TEST_PORT,
} = process.env;

let httpServer;

const getPort = () => {
  const min = 1001;
  const max = 1999;
  return Math.floor(Math.random() * (max - min) + min);
};

const closeHttpServer = async () =>
  new Promise((resolve, reject) =>
    httpServer.close(err => (err ? reject(err) : resolve()))
  );

const disconnectMongoose = async () =>
  new Promise((resolve, reject) =>
    mongoose.disconnect(err => (err ? reject(err) : resolve()))
  );

const log = msg => fs.appendFileSync('./.log', `\n${msg}`);

beforeAll(async () => {
  try {
    await portfinder.getPortPromise({ port: TEST_PORT });
    const port = getPort();
    const dbName = `${TEST_DB_NAME}${port}`;

    process.env.TEST_PORT = port;

    httpServer = await start({
      http: { port },
      db: {
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        dbName,
      },
    });

    initFactories();
  } catch (err) {
    log('beforeAll error');
    log(err);
    throw err;
  }
});

beforeEach(async () => {
  await Promise.all(
    Object.entries(Models).map(([, model]) => model.deleteMany({}))
  );
});

afterAll(async () => {
  try {
    await disconnectMongoose();
    await closeHttpServer();
  } catch (err) {
    log('afterAll error');
    log(err);
    throw err;
  }
});
