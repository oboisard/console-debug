export type FunctionLogType = {
  type: 'group' | 'string';
  name?: string;
  data: any;
  styles?: string;
};

export type TDebugLog = (() => FunctionLogType) | Array<any> | string | null;

export type TDebugConfig<TArgs extends Array<any> = Array<any>> = {
  key: string;
  title: string | Array<string>;
  getLabel: (...args: TArgs) => string;
  getLogs: (...args: TArgs) => Array<TDebugLog> | null;
  getColors: (...args: TArgs) => string | Array<string>;
};
