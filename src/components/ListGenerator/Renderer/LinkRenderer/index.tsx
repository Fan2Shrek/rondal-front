import React, { FC } from 'react';
import Link from 'next/link';

type Props = {
  value: {
    link?: string,
    text?: string,
  }
}

export const LinkRenderer: FC<Props> = ({ value }) => {
  return <Link href={value?.link || ''} style={{ textDecoration: 'none', color: 'inherit' }}>
    {value?.text || ''}
  </Link>;
}