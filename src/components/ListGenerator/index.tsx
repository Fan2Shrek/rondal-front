'use client';

import React, { ChangeEvent, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { CardHeader } from '@mui/material';
import { SxProps } from '@mui/system/styleFunctionSx';
import { Theme } from '@mui/material/styles/createTheme';
import { omit } from 'lodash';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { ListTable } from 'src/components/ListGenerator/ListTable';
import { ListContext } from 'src/components/ListGenerator/ListContext';
import { tokens } from 'src/locales/tokens';


export type ListStructure = {
  title: string,
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify',
  render: any,
  resolver?: (raw) => any,
  formName?: string,
  style?: SxProps<Theme>,
}

export type ListAction = {
  render: any,
  resolver?: (raw) => any,
}

export type SortQuery = {
  field: string,
  direction: 'asc' | 'desc',
}

export type SearchQuery = {
  sorts?: Array<SortQuery>,
  filters?: any,
  pagination?: boolean,
  page?: number,
  itemsPerPage?: number,
}

export type SearchResult<T> = {
  items: Array<T>,
  total: number,
}

export type ListConfiguration<T> = {
  code: string,
  user?: any,
  title?: string,
  sorts?: SortQuery[],
  enableFilters?: boolean,
  structure?: ListStructure[],
  actions?: ListAction[],
  controls?: ReactNode | ((listContext) => ReactNode),
  defaultRowsPerPage?: number,
  rowsPerPageOptions?: number[],
  onDelete?: (itemId: string) => Promise<SearchResult<T>>,
  onQuery?: (query: SearchQuery) => Promise<SearchResult<T>>
  onSubmit?: (data: any, locale: string, strapiStructure, components) => Promise<any>
  modifier?: (item: any, data: any) => any
  identifier?: (item) => string,
  filters?: any,
  exportColumns?: { [key: string]: any },
  exportFormatData?: (data: any) => any,
  defaultFilters?: any,
}

export const updateQueryFilters = (listContext, newFilters, deletePath) => {
  let filters = { ...listContext?.query?.filters, ...newFilters(listContext?.query?.filters) };
  if (deletePath) {
    filters = omit(filters, deletePath);
  }

  return listContext?.setQuery({ ...listContext?.query, ...{ filters: filters } });
}

export const ListGenerator: React.FC<ListConfiguration<any>> = ({
  code,
  title,
  controls = null,
  sorts,
  structure,
  actions = null,
  defaultRowsPerPage = 10,
  rowsPerPageOptions = [5, 10, 25],
  onQuery,
  onDelete,
  identifier,
  filters,
  defaultFilters
}) => {
  const { t } = useTranslation();
  const defaultQuery = Object.assign(
    { page: 1, itemsPerPage: defaultRowsPerPage },
    sorts && sorts.length > 0 ? {sorts} : undefined,
    defaultFilters ? { filters: defaultFilters } : undefined
  );
  const [result, setResult] = useState<SearchResult<any>>({items: [], total: 0});
  const [loading, setLoading] = useState<boolean>(true);
  const listContext = useContext(ListContext);
  const getItems = useCallback(async (query) => {
    const data = await onQuery(query);
    setResult(data);
    setLoading(false);
  }, [onQuery]);

  useEffect(() => {
    listContext?.setQuery(defaultQuery);
  }, [code]);

  useEffect(() => {
    setLoading(true);
    setResult({items: [], total: 0});
    listContext?.query && getItems(listContext?.query);
  }, [listContext?.query]);

  const handleDelete = (items: string[]) => {
    let errors = false;

    items.forEach(async (itemId) => {
      const res = await onDelete(itemId);
      res && getItems(listContext?.query);
      errors = !!res;
    });

    errors && toast.error(t(tokens.list.delete.success));
    !errors && toast.success(t(tokens.list.delete.error));
  }

  const handlePageChange = (e, newPage: number) => listContext?.setQuery((query) => ({
    ...query,
    page: newPage + 1,
  }));

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => listContext?.setQuery((query) => ({
    ...query,
    itemsPerPage: parseInt(event.target.value, 10) || 10,
  }));

  return <Stack spacing={4}>
    <Card>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={4}
      >
        <CardHeader title={title} />
        <Stack alignItems="center" direction="row" spacing={3} sx={{ pr: 3 }}>
          {controls instanceof Function ? controls(listContext) : controls}
        </Stack>
      </Stack>
      {filters}
      <ListTable
        items={result.items}
        loading={loading}
        itemsCount={result.total}
        onDelete={onDelete ? handleDelete : null}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPage={parseInt(listContext?.query?.itemsPerPage)}
        rowsPerPageOptions={rowsPerPageOptions}
        page={listContext?.query?.page}
        structure={structure}
        actions={actions}
        identifier={identifier}
      />
    </Card>
  </Stack>
}
