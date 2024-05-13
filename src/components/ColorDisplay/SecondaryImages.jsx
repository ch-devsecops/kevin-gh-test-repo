import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, Image, Scale } from '@honda-canada/design-system-react';

const ToggleFade = styled(Box)(({ theme, shouldAnimate }) => ({
  opacity: shouldAnimate ? 1 : 0,
  transition: 'opacity',
  transitionDuration: theme.transitionDuration.t6,
  transitionTimingFunction: theme.transitionTimingFunction.in,
  position: 'absolute',
  top: 0,
  left: 0,
}));

const SecondaryImages = ({ images, activeImage }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Scale
      shouldAnimate={hovered}
      startAt={1}
      endAt={1.03}
      transitionDuration="t3"
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {images.map((image, i) => {
        const isSelected = i === activeImage;
        return (
          <ToggleFade key={i.toString()} shouldAnimate={isSelected}>
            <Image {...image} />
          </ToggleFade>
        );
      })}
    </Scale>
  );
};

export default SecondaryImages;
