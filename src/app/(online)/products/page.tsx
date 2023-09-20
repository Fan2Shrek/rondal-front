'use client';

import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { assign } from 'lodash';

import { ListConfiguration } from 'src/components/ListGenerator';
import { ListGenerator } from 'src/components/ListGenerator';
import { ListContextProvider } from 'src/components/ListGenerator/ListContext';
import { TextRenderer } from 'src/components/ListGenerator/Renderer/TextRenderer';
import { tokens } from 'src/locales/tokens';
import { ApiClient } from 'src/lib/api';
import { SearchQuery } from 'src/components/ListGenerator';

import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';

import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { log } from 'console';

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
  const client = new ApiClient("http://192.168.1.45:8000");
  const [data, setData] = React.useState<any[]>([]);

  const getProduct = async () => {
    const response = await client.product.getAll({ page: 1, itemsPerPage: 10 })
    setData(response)
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Head>
        <title>
          Customers | Devias Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Customers
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <CustomersSearch />
            <CustomersTable
              count={data.length}
              items={[data]}
              page={0}
              rowsPerPage={10}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default List;
