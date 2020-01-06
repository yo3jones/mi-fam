import { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import useLocalStorage from './useLocalStorage';
import { userLogin, renewUser } from '../graphql';

export default () => {
  const [
    renew,
    { loading: renewLoading, error: renewError, data: renewData },
  ] = useLazyQuery(renewUser);

  const [
    login,
    { loading: loginLoading, error: loginError, data: loginData },
  ] = useLazyQuery(userLogin);

  const [localSession, setLocalSession, removeLocalSession] = useLocalStorage(
    'mifamly-session'
  );

  useState(() => {
    if (localSession) {
      renew({
        variables: { renewToken: localSession.renewToken },
      });
      removeLocalSession();
    }
  });

  let session;
  if (renewData) {
    ({ renewUser: session } = renewData);
  } else if (loginData) {
    ({ loginUser: session } = loginData);
  }

  if (session && !localSession) setLocalSession(session);

  const loading = renewLoading || loginLoading;

  const requiresLogin =
    !session && (!renewLoading || loginLoading || !!renewError);

  const error = loginError;

  return [login, { loading, requiresLogin, error, session }];
};
