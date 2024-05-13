import React from 'react';
import { Copy } from '@honda-canada/design-system-react';
import capitalize from 'lodash/capitalize';
import { HOUR_SEPARATOR } from './utils/constants';
import type { Hours } from './types/hours.interface';

const DealerHours = ({ status, message }: Hours) => (
  <Copy size="extraSmall" color="white">
    <span data-testid="cy-dealer-hours-status">{capitalize(status)}</span>
    {` ${HOUR_SEPARATOR} `}
    <span data-testid="cy-dealer-hours-message">{message}</span>
  </Copy>
);

export default DealerHours;
