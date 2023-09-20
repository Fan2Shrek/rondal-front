import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { SeverityPill } from 'src/components/SeverityPill';
import { Enum, EnumStatusColor } from 'src/enum';

type Props = {
  value: {
    enumName: keyof typeof Enum,
    value: string
  }
}
export const StatusRenderer: FC<Props> = ({ value }) => {
  const { t } = useTranslation();

  return <SeverityPill color={EnumStatusColor?.[value.enumName]?.[value.value]}>
    {t(Enum?.[value.enumName]?.[value.value])}
  </SeverityPill>
}
