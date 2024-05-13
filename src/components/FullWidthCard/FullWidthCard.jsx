import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  MarkdownHeading,
  Markdown,
  MediaItem,
  useOptionalVideo,
  Optional,
} from '@honda-canada/design-system-react';
import themeStyles from './FullWidthCard.styles';

const CTAGroup = themeStyles.apply(Box, 'CTAGroup');
const ContentContainer = themeStyles.apply(Box, 'ContentContainer');
const ContentWrapper = themeStyles.apply(Box, 'ContentWrapper');

const FullWidthCardBase = ({
  title,
  bodyText,
  image,
  video,
  isTertiaryCTAGroup,
  ctas,
  anchorId,
  gtmTags = {},
  isDark,
}) => {
  const { optionalVideo } = useOptionalVideo(video);

  return (
    <Box
      pb={['l', 'big']}
      id={anchorId}
      data-gtm-component-type={gtmTags.type}
      data-gtm-category={gtmTags.category}
      backgroundColor={isDark ? 'black' : 'white'}
    >
      <MediaItem image={image} video={optionalVideo} containerSize="100%" />

      <Optional when={title || bodyText}>
        <ContentContainer>
          <ContentWrapper>
            <Optional when={title}>
              <MarkdownHeading headingOverride="h5" mb={['xs', 'm']} color={isDark ? 'white' : undefined}>
                {title}
              </MarkdownHeading>
            </Optional>

            <Optional when={bodyText}>
              <Markdown textAlign="center" mb={['0']} color={isDark ? 'white' : undefined}>
                {bodyText}
              </Markdown>
            </Optional>
          </ContentWrapper>

          <CTAGroup isTertiary={isTertiaryCTAGroup}>{ctas}</CTAGroup>
        </ContentContainer>
      </Optional>
    </Box>
  );
};

FullWidthCardBase.defaultProps = {
  bodyText: '',
  isTertiaryCTAGroup: false,
};

FullWidthCardBase.propTypes = {
  title: PropTypes.string,
  /**
   * Markdown enabled text
   */
  bodyText: PropTypes.string,
  isTertiaryCTAGroup: PropTypes.bool,
  image: PropTypes.element,
  video: PropTypes.element,
  ctas: PropTypes.arrayOf(PropTypes.element),
  anchorId: PropTypes.string,
  gtmTags: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
  }),
  isDark: PropTypes.bool,
};

export default FullWidthCardBase;
