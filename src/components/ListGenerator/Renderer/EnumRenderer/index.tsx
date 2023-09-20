import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { SeverityPill } from 'src/components/SeverityPill';
import { Enum, EnumStatusColor } from 'src/enum';
import Stack from '@mui/material/Stack';

type Props = {
  value: {
    enumName: keyof typeof Enum,
    values: string[]
  }
}
export const EnumRenderer: FC<Props> = ({ value }) => {
  const { t } = useTranslation();

  return <Stack direction="row" gap={2}>
    {value.values.map((string) => <SeverityPill color={EnumStatusColor?.[value.enumName]?.[string]}>
      {t(Enum?.[value.enumName]?.[string])}
    </SeverityPill>)}
  </Stack>
}
