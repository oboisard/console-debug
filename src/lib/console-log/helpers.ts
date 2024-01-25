import { getStorage, setStorage } from './storage';

export const canWrite = (name: string): boolean => {
  let canW = getStorage(name);
  if (canW === null || canW === undefined) {
    if (process.env.NODE_ENV !== 'production') {
      canW = true;
      setStorage(name, true);
    } else {
      canW = false;
    }
  }
  return canW;
};

export const getCurrentTimeFormatted = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const milliseconds = currentTime.getMilliseconds();
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const getBooleanLog = (text: string, bool: boolean): string => {
  return `▫ ${text} ? ${getBooleanIcon(bool)}`;
};

export const getArrayLog = (text: string, arr: Array<any>): string => {
  return `▫ ${text}: [${arr.join(', ')}]`;
};

export const getArrayListLog = (
  text: string,
  arr: Array<Array<any>>
): string => {
  return `▫ ${text}: ${arr.map((a) => {
    const sArray = a.join(', ');
    return `[${sArray}]`;
  })}`;
};

export const getBooleanIcon = (bool: boolean): string => {
  return bool ? '✔' : '✖';
};
