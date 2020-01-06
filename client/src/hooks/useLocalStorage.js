import { useState } from 'react';

export default (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      /* istanbul ignore next */
      return initialValue;
    }
  });

  const setValue = value => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  const remove = () => {
    setStoredValue();
    window.localStorage.removeItem(key);
  };

  return [storedValue, setValue, remove];
};
