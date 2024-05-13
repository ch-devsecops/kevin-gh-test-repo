import React from 'react';
import { Box } from '@honda-canada/design-system-react';

const Container = ({ isShort, children }) =>
  isShort ? (
    <Box
      position="absolute"
      bottom={0}
      width="100%"
      pt="xl"
      pb="l"
      pl={['m', 'l']}
      pr={['m', 'l']}
      display="flex"
      flexDirection="column"
      alignItems="start"
      justifyContent="center"
      background="linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%)"
    >
      {children}
    </Box>
  ) : (
    <Box
      position="absolute"
      top={['auto', 0]}
      right={['auto', 0]}
      bottom={[0, 'auto']}
      width={['100%', '42%']}
      height={['auto', '100%']}
      pt={['xl', 'zero']}
      pb={['l', 'zero']}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      background={[
        'linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%)',
        'linear-gradient(270deg, #000000 0%, rgba(0, 0, 0, 0) 100%)',
      ]}
    >
      {children}
    </Box>
  );

export default Container;
