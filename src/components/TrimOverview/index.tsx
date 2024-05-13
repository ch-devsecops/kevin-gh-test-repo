import React, { useMemo } from 'react';

import { HONDA_SITE_NAME, ACURA_SITE_NAME } from '../../utils/constants';
import { useAppName } from '../../utils/sitecoreContext';
import { createObjectFromProps, isEmpty } from '../../utils/object';
import safelyStringifyJSON from '../../utils/safelyStringifyJSON';
import TrimOverview from './TrimOverview';

import type { TrimOverviewMapProps } from './types';

const TrimOverviewMap = ({ variant: propVariant, fields, rendering, params }: TrimOverviewMapProps) => {
  const appName = useAppName();

  let variant!: string;
  let mappedFields = fields?.data?.value || {};

  switch (appName) {
    case ACURA_SITE_NAME:
      break;

    case HONDA_SITE_NAME:
    default:
  }

  const appNameConfig = useMemo(
    () => ({ params, variant: propVariant ?? variant }),
    [propVariant, variant, safelyStringifyJSON(params)],
  );
  mappedFields = useMemo(() => createObjectFromProps(mappedFields), [safelyStringifyJSON(mappedFields)]);

  if (!fields || isEmpty(fields) || !fields?.data?.value) {
    return null;
  }

  return <TrimOverview appNameConfig={appNameConfig} componentName={rendering?.componentName} fields={mappedFields} />;
};

export default TrimOverviewMap;
