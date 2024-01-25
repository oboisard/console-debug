import { get, set, remove } from '../storage/local';

const KEY = (name: string): string => `debug.console-log.${name}`;

export const getStorage = (name: string): boolean => {
  return get<boolean>(KEY(name), false) || false;
};

export const setStorage = (name: string, enable: boolean): void => {
  if (enable === null) {
    return remove(KEY(name));
  }
  set<boolean>(KEY(name), enable);
};
