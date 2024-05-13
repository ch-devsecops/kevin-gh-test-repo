import React from 'react';
import PropTypes from 'prop-types';

import {
  Wrapper,
  Column,
  Box,
  Markdown,
  MarkdownHeading,
  MediaItem,
  useOptionalVideo,
  Media,
} from '@honda-canada/design-system-react';

import themeStyles from './LandscapeBoxCard.styles';

const Container = themeStyles.apply(Box, 'Container');
const MediaContainer = themeStyles.apply(Box, 'MediaContainer');
const CTAGroup = themeStyles.apply(Box, 'CTAGroup');
const ContentBox = themeStyles.apply(Box, 'ContentBox');

const LandscapeBoxCard = ({
  title,
  bodyText,
  backgroundColor,
  contentCardColor,
  contentAlignment,
  desktopImage,
  video,
  ctas,
  isTertiaryCTAGroup,
  anchorId,
  mobileImage,
  imageTitle,
  gtmTags = {},
  isDark,
}) => {
  const { optionalVideo } = useOptionalVideo(video);

  return (
    <Box
      bg={isDark ? 'black' : backgroundColor}
      py={['l', 'big']}
      id={anchorId}
      data-gtm-component-type={gtmTags.type}
      data-gtm-category={gtmTags.category}
    >
      <Wrapper gutters={[false]}>
        <Column width={1}>
          <Container contentAlignment={contentAlignment}>
            <ContentBox bg={isDark ? '#000000' : contentCardColor}>
              {imageTitle ? (
                <Box px={[0, 'default']} mb={['xs', 'm']}>
                  {imageTitle}
                </Box>
              ) : (
                <MarkdownHeading
                  px={[0, 'default']}
                  mb={['xs', 'm']}
                  style={{ textAlign: 'center' }}
                  color={isDark ? 'white' : undefined}
                  headingOverride="h3"
                >
                  {title}
                </MarkdownHeading>
              )}
              <Box px={['m', 'xxl']}>
                <Markdown style={{ textAlign: 'center' }} mb={[0, 0]} color={isDark ? 'white' : undefined}>
                  {bodyText}
                </Markdown>
              </Box>
              <CTAGroup isTertiary={isTertiaryCTAGroup}>{ctas}</CTAGroup>
            </ContentBox>

            <Media greaterThanOrEqual="smallDesktop">
              <MediaContainer contentAlignment={contentAlignment}>
                <MediaItem image={desktopImage} video={optionalVideo} containerSize="100%" />
              </MediaContainer>
            </Media>
            <Media lessThan="smallDesktop">
              <MediaContainer contentAlignment={contentAlignment}>
                <MediaItem image={mobileImage || desktopImage} video={optionalVideo} containerSize="100%" />
              </MediaContainer>
            </Media>
          </Container>
        </Column>
      </Wrapper>
    </Box>
  );
};

LandscapeBoxCard.defaultProps = {
  contentCardColor: 'grey.5',
  backgroundColor: 'white',
  bodyText: '',
  contentAlignment: 'left',
  isTertiaryCTAGroup: false,
};

LandscapeBoxCard.propTypes = {
  title: PropTypes.string,
  /**
   * Markdown enabled text
   */
  bodyText: PropTypes.string,
  backgroundColor: PropTypes.oneOf(['white', 'grey.5']),
  contentCardColor: PropTypes.oneOf(['white', 'grey.5']),
  /**
   * If true, `contentCardColor` is replaced with `#000000` and text is white
   */
  isDark: PropTypes.bool,
  contentAlignment: PropTypes.oneOf(['left', 'right']),
  desktopImage: PropTypes.element,
  video: PropTypes.shape({
    onPlay: PropTypes.func,
  }),
  ctas: PropTypes.arrayOf(PropTypes.element),
  isTertiaryCTAGroup: PropTypes.bool,
  anchorId: PropTypes.string,
  mobileImage: PropTypes.element,
  gtmTags: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
  }),
  imageTitle: PropTypes.element,
};

export default LandscapeBoxCard;
