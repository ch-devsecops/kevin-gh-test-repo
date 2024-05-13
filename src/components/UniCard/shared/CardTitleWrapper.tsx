import React from 'react';
import { Box } from '@honda-canada/design-system-react';
import { EqualHeightElement } from '../../../utils/components/EqualHeight';

const TitleWrapper = ({ children }: { children: React.ReactNode }) => (
  <EqualHeightElement name="UniCardTitle" inherit>
    <Box>{children}</Box>
  </EqualHeightElement>
);

export default TitleWrapper;
