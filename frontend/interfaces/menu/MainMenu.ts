export interface IMainMenuConfig {
  header: string;
  items: Array<IMainMenuItem>;
}

export interface IMainMenuItem {
  label: string;
  path: string;
}
