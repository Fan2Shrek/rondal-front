import React, { useState, useEffect, FC } from 'react';
import type { ChangeEvent, MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';

import { Scrollbar } from 'src/components/Scrollbar';
import { ListAction, ListStructure } from 'src/components/ListGenerator';
import { tokens } from 'src/locales/tokens';
import TableLoader from 'src/components/TableLoader';

type ListTableProps = {
  items: any,
  loading: boolean,
  itemsCount: number,
  onDelete?: (items: string[]) => void,
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void,
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  page: number,
  rowsPerPage: number,
  rowsPerPageOptions: number[],
  structure: ListStructure[],
  actions?: ListAction[],
  identifier: (item) => string,
  editable?: boolean
  setForm?: (id, value) => void
}

export const ListTable: FC<ListTableProps> = ({
  items,
  loading,
  itemsCount,
  onDelete = null,
  onPageChange,
  onRowsPerPageChange,
  page,
  rowsPerPage,
  rowsPerPageOptions,
  structure,
  actions = [],
  identifier
}) => {
  const { t } = useTranslation();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    if (selectedItems.length) {
      setSelectedItems([]);
    }
  },[items]);

  const handleSelectAllItems = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedItems(event.target.checked ? items.filter(item => !!identifier(item)).map((item) => identifier(item)) : []);
  };

  const handleSelectOneItem = (event: ChangeEvent<HTMLInputElement>, itemId: string): void => {
    if (!selectedItems.includes(itemId)) {
      setSelectedItems((prevSelected) => [...prevSelected, itemId]);
    } else {
      setSelectedItems((prevSelected) => prevSelected.filter((id) => id !== itemId));
    }
  };

  const enableBulkActions = onDelete && selectedItems.length > 0;
  const selectedSomeItems = selectedItems.length > 0 && selectedItems.length < items.length;
  const selectedAllItems = selectedItems.length === items.length && selectedItems.length > 0;

  return <Box sx={{ position: 'relative' }}>
    {enableBulkActions && <Stack
      direction="row"
      spacing={2}
      sx={{
        alignItems: 'center',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.50',
        display: enableBulkActions ? 'flex' : 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        px: 2,
        py: 0.5,
        zIndex: 10,
      }}
    >
      <Checkbox
        checked={selectedAllItems}
        indeterminate={selectedSomeItems}
        onChange={handleSelectAllItems}
      />
      <Button color="inherit" size="small">Delete</Button>
    </Stack>}
    <Scrollbar>
      <Table sx={{ minWidth: 700 }}>
        <TableHead sx={{ visibility: enableBulkActions ? 'collapse' : 'visible' }}>
          <TableRow>
            {onDelete && <TableCell padding="checkbox"><Checkbox
              checked={selectedAllItems}
              indeterminate={selectedSomeItems}
              onChange={handleSelectAllItems}
            /></TableCell>}
            {structure.map((data, key) => {
              return <TableCell key={key} align={data?.align ?? 'inherit'} sx={data.style || {}} >{data.title}</TableCell>
            })}
            {actions?.length > 0 && <TableCell align="center">Actions</TableCell>}
          </TableRow>
        </TableHead>
        {!loading && items?.length > 0 && <TableBody>
          {items.map((item, key) => {
            const isItemSelected = selectedItems.includes(identifier(item));

            return (
              <TableRow hover key={key} selected={isItemSelected}>
                {onDelete && <TableCell padding="checkbox">
                  {identifier(item) ? <Checkbox
                    checked={isItemSelected}
                    onChange={(event) => handleSelectOneItem(
                      event,
                      identifier(item)
                    )}
                    value={isItemSelected}
                  /> : <span></span>}
                </TableCell>}
                {structure.map((data, cellKey) => {
                  return <TableCell key={cellKey} align={data?.align ?? 'inherit'} sx={data.style || {}}>
                    {React.createElement(data.render, {
                      value: data.resolver ? data.resolver(item) : item,
                      row: item,
                    })}
                  </TableCell>
                })}
                {actions && <TableCell key={key} align="center">
                  {actions.map((data, key) => {
                    return React.createElement(data.render, { value: data.resolver ? data.resolver(item) : item, row: item })
                  })}
                </TableCell>}
              </TableRow>
            );
          })}
        </TableBody>}
      </Table>
    </Scrollbar>
    {loading && <TableLoader />}
    {!loading && items?.length === 0 && <Typography align="center" sx={{ my: 3 }}>{t(tokens.list.empty)}</Typography>}
    <TablePagination
      component="div"
      count={itemsCount}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      page={page - 1}
      labelRowsPerPage={t(tokens.list.itemsPerPage)}
      labelDisplayedRows={({ from, to, count }) => {
        return `${from}–${to} sur ${count}`;
      }}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
    />
  </Box>;
};
