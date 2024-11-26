export interface ISmartTableConfig {
  columns: Array<ISmartTableColumnConfigItem>;
  data: Array<any>;
}

export type ISmartTableColumnConfigItemType = "string" | "list";

export interface ISmartTableColumnConfigItem {
  label: string;
  key: string;
  type: ISmartTableColumnConfigItemType;
}
