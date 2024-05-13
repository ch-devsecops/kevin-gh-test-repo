import React from 'react';
import { Fade, Box, Scale, Image } from '@honda-canada/design-system-react';
import TranslateChildren from '../ModelPageNav/TranslateChildren';

const SectionImages = ({
  sections,
  features,
  activeFeature,
  activeSection,
  previousActiveSection,
  positionTop,
  position = 'sticky',
  height,
  maxWidth,
  mx,
}) =>
  sections.map((section, i) => (
    <Fade
      key={i.toString()}
      as={Box}
      shouldAnimate={i === activeSection || i === previousActiveSection}
      initialOpacity={i === activeSection ? 1 : 0}
      direction={i === activeSection ? 'in' : 'out'}
      top={positionTop}
      position={position}
      height={height}
      maxWidth={maxWidth}
      mx={mx}
      overflow="hidden"
      width="100%"
    >
      <Scale
        startAt={features[activeFeature].scaleStartAt}
        endAt={features[activeFeature].scaleEndAt}
        transformOrigin={features[activeFeature].transformOrigin}
      >
        <TranslateChildren>
          <Image
            {...section.fields.image?.value}
            height="auto"
            style={{
              maxWidth: '100%',
              maxHeight: height,
            }}
          />
        </TranslateChildren>
      </Scale>
    </Fade>
  ));

export default SectionImages;
