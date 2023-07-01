import { ChangeEvent, MouseEvent, ReactNode } from 'react';

export type RowData<Keys extends string> = {
  metadata: {
    id: number;
    isSelected: boolean;
    align: Record<Keys, 'left' | 'right' | 'center'>;
  };
} & {
  [key in Keys]: ReactNode;
};

export type StringKeyOf<T> = keyof T & string;

interface HeadCell<Keys extends string, Data extends Omit<RowData<Keys>, 'metadata'>> {
  id: StringKeyOf<Data>;
  label: string;
  align: 'left' | 'right' | 'center';
}

export type Order = 'asc' | 'desc';

export interface TableHeadProps<Keys extends string, Data extends RowData<Keys>> {
  headCells: readonly HeadCell<Keys, Omit<Data, 'metadata'>>[];
  numSelected: number;
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: StringKeyOf<Omit<Data, 'metadata'>>
  ) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface TableBodyProps<Keys extends string, Data extends RowData<Keys>> {
  rows: Array<Data>;
  handleSelect: (event: MouseEvent<HTMLTableRowElement> | null, id: number) => void;
}
