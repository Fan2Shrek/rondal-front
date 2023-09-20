'use client';

import type { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';

import { tokens } from 'src/locales/tokens';

interface LayoutProps {
  children?: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;
  const { t } = useTranslation();
  
  return <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
    <Container maxWidth="xl">
      <Typography variant="h1" sx={{ pb: 4 }}>{t(tokens.page.product.title)}</Typography>
      {children}
    </Container>
  </Box>
}

export default Layout;
