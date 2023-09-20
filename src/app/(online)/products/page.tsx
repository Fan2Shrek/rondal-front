'use client';

import type { NextPage } from 'next';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { assign } from 'lodash';

import { ListConfiguration } from 'src/components/ListGenerator';
import { ListGenerator } from 'src/components/ListGenerator';
import { ListContextProvider } from 'src/components/ListGenerator/ListContext';
import { TextRenderer } from 'src/components/ListGenerator/Renderer/TextRenderer';
import { tokens } from 'src/locales/tokens';
import { ApiClient } from 'src/lib/api';
import { SearchQuery } from 'src/components/ListGenerator';

const convertQuery = (query: SearchQuery) => {
  const dataSorts = (query?.sorts || []).reduce((acc, cur) => ({ ...acc, [`order[${cur.field}]`]: cur.direction }), {})

  return assign(
    { page: query.page, itemsPerPage: query.itemsPerPage },
    query?.filters ?? undefined,
    dataSorts ?? undefined,
  );
}

const List: NextPage = () => {
  const { t } = useTranslation();
  const client = new ApiClient("http://192.168.197.132:8000");

  const configuration: ListConfiguration<any> = {
    code: 'projects',
    title: t(tokens.page.product.list.title),
    identifier: (item) => item?.id || '',
    onQuery: (query) => client.product.getAll(convertQuery(query)),
    sorts: [{ field: 'name', direction: 'asc' }],
    structure: [
      {title: t(tokens.page.product.title), render: TextRenderer, resolver: (row) => {
          console.log(row);
          return row?.name;
        }},
      ],
  };

  return <>
    <ListContextProvider>
      <ListGenerator {...configuration} />
    </ListContextProvider>
  </>
};

export default List;
