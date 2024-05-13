import React from 'react';
import { Box } from '@honda-canada/design-system-react';

const ContentRow = ({ title, bodyText, cta }) => (
  <Box pt={['l', 'zero']} pb={cta ? 'l' : 'xl'}>
    {title && (
      <Box fontFamily="heading" px="default" mb="xs" textAlign="center">
        {title}
      </Box>
    )}
    {bodyText && (
      <Box maxWidth={['', '824px']} px="default" mb={cta && ['m', 'l']} textAlign="center">
        {bodyText}
      </Box>
    )}
    {cta && <Box textAlign="center">{cta}</Box>}
  </Box>
);

export default ContentRow;
