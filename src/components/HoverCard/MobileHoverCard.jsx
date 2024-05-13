import React from 'react';
import { Box, Optional, Markdown, MarkdownHeading } from '@honda-canada/design-system-react';
import themeStyles from './HoverCard.styles.mobile';
import types from './HoverCard.types';

const MobileContainer = themeStyles.apply(Box, 'MobileContainer');
const ImageContainer = themeStyles.apply(Box, 'ImageContainer');

const MobileHoverCard = ({ image, title, bodyText, ctas, anchorId, gtmTags = {} }) => (
  <MobileContainer id={anchorId} data-gtm-component-type={gtmTags.type} data-gtm-category={gtmTags.category}>
    <Optional when={image}>
      <ImageContainer>{image}</ImageContainer>
    </Optional>
    <Optional when={title}>
      <MarkdownHeading my="xs" headingOverride="h6">
        {title}
      </MarkdownHeading>
    </Optional>
    <Optional when={bodyText}>
      <Box mb="xs">
        <Markdown>{bodyText}</Markdown>
      </Box>
    </Optional>
    <Box>{ctas}</Box>
  </MobileContainer>
);

MobileHoverCard.propTypes = types;

export default MobileHoverCard;
