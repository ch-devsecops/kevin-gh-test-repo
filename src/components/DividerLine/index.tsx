import React from 'react';
import { Divider as DsrDivider } from '@honda-canada/design-system-react';
import themeStyles from './styles/DividerLine.styles';

type DividerLineProps = {
  fields: {
    anchorId: {
      value: string,
    },
    gtmTitle: {
      value: string,
    },
  },
};

const Divider = themeStyles.apply(DsrDivider, 'Divider');

const DividerLine = ({ fields }: DividerLineProps) => (
  <Divider id={fields?.anchorId?.value} data-gtm-title={fields?.gtmTitle?.value} />
);

export default DividerLine;
