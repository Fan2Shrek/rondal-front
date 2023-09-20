'use client';

import { ThemeProvider } from '@emotion/react';
import type { ReactNode } from 'react';

import './globals.css'
import 'src/locales/i18n'
import { createTheme } from 'src/theme';
  
interface LayoutProps {
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  const theme = createTheme({
    colorPreset: 'primary',
    contrast: 'normal',
    direction: 'ltr',
    paletteMode: 'light',
    responsiveFontSizes: true,
  });

  return (
    <html>
      <body>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
