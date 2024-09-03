export type TableColumn = {
  key: string;
  label: string;
  sortable?: boolean;
  hideOn1024?: boolean;
};

export type TableData = {
  id: string;
  [key: string]: string | number;
};
