import React from 'react';

export const TextRenderer = ({ value }) => {
  const text = `${(value ? String(value) : '').substring(0, 30)}${value?.length > 30 ? '...' : ''}`;

  return <span title={value?.length > 50 && value}>{text}</span>;
}