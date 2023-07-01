import { TableContainer, Table as MuiTable, Paper } from '@mui/material';

import { TableBody } from './table-body';
import { TableHead } from './table-head';
import { RowData, TableBodyProps, TableHeadProps } from './types';

interface TableProps<Keys extends string, Data extends RowData<Keys>>
  extends Omit<TableHeadProps<Keys, Data>, 'rowCount' | 'numSelected'>,
    TableBodyProps<Keys, Data> {}

export function Table<Keys extends string, Data extends RowData<Keys>>({
  rows,
  order,
  orderBy,
  headCells,
  onRequestSort,
  handleSelect,
  onSelectAllClick
}: TableProps<Keys, Data>) {
  const numSelected = rows.filter(row => row.metadata.isSelected).length;

  return (
    <Paper>
      <TableContainer>
        <MuiTable>
          <TableHead
            numSelected={numSelected}
            rowCount={rows.length}
            order={order}
            orderBy={orderBy}
            headCells={headCells}
            onRequestSort={onRequestSort}
            onSelectAllClick={onSelectAllClick}
          />
          <TableBody rows={rows} handleSelect={handleSelect} />
        </MuiTable>
      </TableContainer>
    </Paper>
  );
}
