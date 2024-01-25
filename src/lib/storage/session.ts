import { storageFunction } from 'storage-function';

const {
  fromSessionStorage,
  toSessionStorage,
  removeFromSessionStorage,
  clearSessionStorage,
} = storageFunction;

export const get = <T = string>(
  key: string,
  defaultvalue: T | null = null
): T | null => {
  const value = fromSessionStorage(key) as T;
  if (value === undefined) {
    return defaultvalue;
  }
  return value;
};

export const set = <T = string>(key: string, value: T | null): void => {
  if (value === null) {
    return remove(key);
  }
  return toSessionStorage(key, value);
};

export const remove = (key: string): void => {
  return removeFromSessionStorage(key);
};

export const clear = (): void => {
  return clearSessionStorage();
};
