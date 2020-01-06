import { createServer } from 'http';
import express from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { verifyJwt } from './providers/jwt';
import connect from './models';
import schemas from './schemas';
import resolvers from './resolvers';

const getTokenPayload = async req => {
  const token = req.headers['x-access-token'];

  if (!token) return undefined;

  try {
    return await verifyJwt(token);
  } catch (err) {
    /* istanbul ignore next */
    throw new AuthenticationError('Invalid Token');
  }
};

const listen = async (httpServer, port) =>
  new Promise((resolve, reject) =>
    httpServer.listen(port, err =>
      /* istanbul ignore next */
      err ? reject(err) : resolve()
    )
  );

export default async ({ http: { port }, db }) => {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs: schemas,
    resolvers,
    context: async ({ req }) => {
      /* istanbul ignore next */
      if (!req) return {};

      const tokenPayload = await getTokenPayload(req);

      return {
        me: tokenPayload,
      };
    },
  });

  apolloServer.applyMiddleware({ app, path: '/graphql' });

  await connect(db);

  const httpServer = createServer(app);
  await listen(httpServer, port);

  return httpServer;
};
