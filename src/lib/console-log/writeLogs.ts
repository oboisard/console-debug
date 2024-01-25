import { FunctionLogType, TDebugLog } from './constants';
import { getCurrentTimeFormatted } from './helpers';

const GetTitle = (title: string | Array<string>): string =>
  Array.isArray(title) ? title.filter((sT) => !!sT).join('][') : title;

const GetArgs = (
  title: string,
  label: string,
  colors: string | Array<string>
): Array<string> => [
  `▪ %c[${title}] %c ${label} - %cat ${getCurrentTimeFormatted()}`,
  `color: ${Array.isArray(colors) ? colors[0] : colors}`,
  'color: black',
  'color: lightblue; font-weight: lighter;',
];

/* eslint no-console: off */
export const writeGroupCollapsed = (
  title: string | Array<string>,
  label: string,
  logs: Array<TDebugLog> | null,
  colors: string | Array<string> = 'green'
): void => {
  if (!!logs && logs.length) {
    // construct args parameter of groupCollapsed functionality
    const sTitle = GetTitle(title);
    const args = GetArgs(sTitle, label, colors);

    if (Array.isArray(colors)) {
      colors.slice(1).forEach((color) => {
        args.push(`color: ${color}`);
      });
    }

    console.groupCollapsed.apply(null, args);
    logs.forEach((log) => {
      if (log) {
        if (typeof log === 'function') {
          writeFunctionSpecificLog(log());
        } else if (Array.isArray(log)) {
          console.log.apply(null, log);
        } else {
          console.log(log);
        }
      }
    });
    console.groupEnd();
  }
};

export const writeFunctionSpecificLog = (log: FunctionLogType): void => {
  try {
    switch (log.type) {
      case 'group': {
        console.groupCollapsed(log.name || '*****');
        console.log(log.data);
        console.groupEnd();
        break;
      }
      case 'string': {
        if (Array.isArray(log.data)) {
          console.log.apply(null, log.data);
        } else {
          console.log(log.data, log.styles || '');
        }
        break;
      }
    }
  } catch (err) {
    console.warn('Error on debug function', err);
  }
};
