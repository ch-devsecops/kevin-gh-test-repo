import React, { useState } from 'react';
import { Box, Optional, Markdown, MarkdownHeading, Fade } from '@honda-canada/design-system-react';
import themeStyles from './HoverCard.styles.desktop';
import types from './HoverCard.types';

const Container = themeStyles.apply(Box, 'Container');
const ImageContainer = themeStyles.apply(Box, 'ImageContainer');
const CtaContainer = themeStyles.apply(Box, 'CtaContainer');
const DesktopHeading = themeStyles.apply(MarkdownHeading, 'Heading');
const Gradient = themeStyles.apply(Box, 'Gradient');
const HoverBackground = themeStyles.apply(Box, 'HoverBackground');
const HoverContent = themeStyles.apply(Box, 'HoverContent');
const SlideUp = themeStyles.apply(Box, 'SlideUp');

const DesktopHoverCard = ({ image, title, bodyText, ctas, anchorId, gtmTags = {} }) => {
  const [hovered, setHovered] = useState(false);
  const [firstTouch, setFirstTouch] = useState(true);

  const handleTouchOnClick = () => {
    // handles click on first touch to cancel previous card hover state
    if (firstTouch) {
      setHovered(true);
      setFirstTouch(false);
    }
  };

  const handleTouchOnToggle = () => {
    // handles touchstart to toggle hover state on subsequent touches
    if (!firstTouch) {
      setHovered(prevState => !prevState);
    }
  };

  return (
    <Container
      id={anchorId}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleTouchOnClick}
      onTouchStart={handleTouchOnToggle}
      data-gtm-component-type={gtmTags.type}
      data-gtm-category={gtmTags.category}
    >
      {/* background image */}
      <Optional when={image}>
        <ImageContainer>{image}</ImageContainer>
      </Optional>

      <Gradient />

      <Optional when={title}>
        <DesktopHeading headingOverride="h5">{title}</DesktopHeading>
      </Optional>

      {/* hover components */}
      <SlideUp shouldAnimate={hovered} zIndex={2}>
        <HoverBackground />
      </SlideUp>

      <Fade shouldAnimate={hovered} zIndex={3} initialOpacity={0}>
        <HoverContent>
          <Optional when={title}>
            <MarkdownHeading mb="xs" color="white" headingOverride="h5">
              {title}
            </MarkdownHeading>
          </Optional>
          <Optional when={bodyText}>
            <Markdown color="white">{bodyText}</Markdown>
          </Optional>
          <CtaContainer mt="m">{ctas}</CtaContainer>
        </HoverContent>
      </Fade>
    </Container>
  );
};

DesktopHoverCard.propTypes = types;

export default DesktopHoverCard;
