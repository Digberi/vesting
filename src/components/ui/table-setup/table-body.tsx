import { TableBody as MuiTableBody, TableRow, TableCell, Checkbox } from '@mui/material';

import { RowData, TableBodyProps } from './types';

export function TableBody<Keys extends string, Data extends RowData<Keys>>({
  rows,
  handleSelect
}: TableBodyProps<Keys, Data>) {
  return (
    <MuiTableBody>
      {rows.map(row => (
        <TableRow
          hover
          onClick={event => handleSelect(event, row.metadata.id)}
          role="checkbox"
          aria-checked={row.metadata.isSelected}
          tabIndex={-1}
          key={row.metadata.id}
          selected={row.metadata.isSelected}
          sx={{ cursor: 'pointer' }}
        >
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              checked={row.metadata.isSelected}
              inputProps={{
                'aria-labelledby': row.metadata.id.toString()
              }}
            />
          </TableCell>
          {(Object.keys(row) as Keys[]).map(key => {
            if (key === 'metadata') {
              return null;
            }

            return (
              <TableCell key={key} align={row.metadata.align[key]}>
                {row[key]}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </MuiTableBody>
  );
}
