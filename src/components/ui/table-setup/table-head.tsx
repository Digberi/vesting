import { MouseEvent } from 'react';

import {
  Box,
  Checkbox,
  TableCell,
  TableHead as MuiTableHead,
  TableRow,
  TableSortLabel
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { observer } from 'mobx-react-lite';

import { RowData, StringKeyOf, TableHeadProps } from './types';

function TableHeadUnobserver<Keys extends string, Data extends RowData<Keys>>({
  headCells,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  onSelectAllClick
}: TableHeadProps<Keys, Data>) {
  const createSortHandler =
    (property: StringKeyOf<Omit<Data, 'metadata'>>) => (event: MouseEvent<unknown>) =>
      onRequestSort(event, property);

  return (
    <MuiTableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all vestings'
            }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
}

export const TableHead = observer(TableHeadUnobserver);
