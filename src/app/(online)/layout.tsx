'use client';

import type { FC, ReactNode } from 'react';
import React from 'react'

import { Navbar } from 'src/components/Navbar';

interface LayoutProps {
  children?: ReactNode;
}

const Layout: FC<LayoutProps> = ((props) => {
  const { children } = props;

  return (
    <>
      <Navbar />
      {children}
    </>
  );
});

export default Layout;
