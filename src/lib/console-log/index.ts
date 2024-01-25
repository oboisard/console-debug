import { TDebugConfig } from './constants';
import { canWrite } from './helpers';
import { writeGroupCollapsed } from './writeLogs';

export * as storage from './storage';
export * as helpers from './helpers';

export const writeDebugConsole = <TArgs extends Array<any> = Array<any>>(
  config: TDebugConfig<TArgs>,
  ...args: TArgs
): void => {
  const { key, title, getLabel, getLogs, getColors } = config;

  if (!canWrite(key)) {
    return;
  }

  writeGroupCollapsed(
    title,
    getLabel(...args),
    getLogs(...args),
    getColors(...args)
  );
};
