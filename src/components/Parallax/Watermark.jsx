import React from 'react';
import { Box, Fade, Image } from '@honda-canada/design-system-react';
import TranslateChildren from '../ModelPageNav/TranslateChildren';

const Watermark = ({ image, fadeDirection, position = 'sticky', positionTop }) => (
  <Box position={position} top={positionTop}>
    <Fade shouldAnimate={!!fadeDirection} direction={fadeDirection} duration="0.1s">
      <TranslateChildren>
        <Image {...image} mx="auto" height="auto" style={{ maxWidth: '100%' }} />
      </TranslateChildren>
    </Fade>
  </Box>
);

export default Watermark;
