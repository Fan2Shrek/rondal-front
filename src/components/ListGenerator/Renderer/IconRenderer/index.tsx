import React, { FC, ReactComponentElement } from 'react';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import SvgIcon from '@mui/material/SvgIcon';
import { OverrideProps } from '@mui/material/OverridableComponent';
import { ExtendButtonBaseTypeMap } from '@mui/material/ButtonBase/ButtonBase';
import { IconButtonTypeMap } from '@mui/material/IconButton/IconButton';

type IconLinkRendererProps = {
  link: string,
  icon: ReactComponentElement<any>,
  target?: string
} & OverrideProps<ExtendButtonBaseTypeMap<IconButtonTypeMap>, 'a'>;

export const IconLinkRenderer: FC<IconLinkRendererProps> = ({ link, icon, target = '_self', ...props }) => {
  return <IconButton component={Link} href={link} target={target} {...props}>
    <SvgIcon>{icon}</SvgIcon>
  </IconButton>;
}