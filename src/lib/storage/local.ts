import { storageFunction } from 'storage-function';

const {
  fromLocalStorage,
  toLocalStorage,
  removeFromLocalStorage,
  clearLocalStorage,
} = storageFunction;

export const get = <T = string>(
  key: string,
  defaultvalue: T | null = null
): T | null => {
  const value = fromLocalStorage(key) as T;
  if (value === undefined) {
    return defaultvalue;
  }
  return value;
};

export const set = <T = string>(key: string, value: T | null): void => {
  if (value === null) {
    return remove(key);
  }
  return toLocalStorage(key, value);
};

export const remove = (key: string): void => {
  return removeFromLocalStorage(key);
};

export const clear = (): void => {
  return clearLocalStorage();
};
