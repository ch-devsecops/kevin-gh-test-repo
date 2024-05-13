import React from 'react';
import PropTypes from 'prop-types';
import {
  Wrapper,
  Row,
  Box,
  MediaItem,
  Optional,
  Markdown,
  MarkdownHeading,
  Media,
  useOptionalVideo,
} from '@honda-canada/design-system-react';
import themeStyles from './LandscapeCard.styles';

const Container = themeStyles.apply(Row, 'Container');
const Content = themeStyles.apply(Box, 'Content');
const BodyTextContainer = themeStyles.apply(Box, 'BodyTextContainer');
const CTAGroup = themeStyles.apply(Box, 'CTAGroup');
const StyledMedia = themeStyles.apply(Media, 'Media');
const MediaContainer = themeStyles.apply(Box, 'MediaContainer');

// Renders a Media Component that either renders an image or video
const MediaContent = ({ image, video, inSideNav, ...rest }) => (
  <StyledMedia {...rest}>
    <MediaContainer inSideNav={inSideNav}>
      <MediaItem image={image} video={video} />
    </MediaContainer>
  </StyledMedia>
);

MediaContent.propTypes = {
  image: PropTypes.element,
  video: PropTypes.shape({
    onPlay: PropTypes.func,
    ariaLabel: PropTypes.string,
    closeAriaLabel: PropTypes.string,
  }),
  inSideNav: PropTypes.bool,
};

const LandscapeCard = ({
  title,
  bodyText,
  ctas,
  image,
  video,
  contentAlignment,
  backgroundColor,
  isDark,
  gtmTags = {},
  layoutContainer,
  anchorId,
  ...otherProps
}) => {
  const { optionalVideo } = useOptionalVideo(video);

  const inSideNav = layoutContainer === 'SideNavLayout';

  return (
    <Box
      id={anchorId}
      bg={isDark ? 'black' : backgroundColor}
      data-gtm-category={gtmTags.category}
      data-gtm-component-type={gtmTags.type}
      pb={['xl', 'xxl']}
      pt={['xl', 'xxl']}
      {...otherProps}
    >
      <Wrapper>
        <Container contentAlignment={contentAlignment}>
          <Content contentAlignment={contentAlignment}>
            <MediaContent at="mobile" image={image} video={video} />

            <Optional when={title}>
              <MarkdownHeading
                style={{ textAlign: ['center', 'left'] }}
                headingOverride="h3"
                color={isDark ? 'white' : ''}
              >
                {title}
              </MarkdownHeading>
            </Optional>

            <Optional when={bodyText}>
              <BodyTextContainer>
                <Markdown color={isDark ? 'white' : ''}>{bodyText}</Markdown>
              </BodyTextContainer>
            </Optional>

            <Optional when={ctas?.length}>
              <CTAGroup>{ctas}</CTAGroup>
            </Optional>
          </Content>

          <MediaContent greaterThan="mobile" image={image} video={optionalVideo} inSideNav={inSideNav} />
        </Container>
      </Wrapper>
    </Box>
  );
};

LandscapeCard.defaultProps = {
  contentAlignment: 'left',
  backgroundColor: 'white',
};

LandscapeCard.propTypes = {
  /**
   * Array of React Components or HTML elements
   */
  ctas: PropTypes.arrayOf(PropTypes.element),
  title: PropTypes.string,
  image: PropTypes.element,
  video: PropTypes.shape({
    src: PropTypes.string,
    ariaLabel: PropTypes.string,
    closeAriaLabel: PropTypes.string,
    onPlay: PropTypes.func,
  }),
  /**
   * Markdown driven element
   */
  bodyText: PropTypes.string,
  /**
   * Orientation of Text within Card
   */
  contentAlignment: PropTypes.oneOf(['left', 'right']),
  /**
   * Sets background color of Container
   */
  backgroundColor: PropTypes.oneOf(['white', 'grey.5']),
  gtmTags: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
  }),
  layoutContainer: PropTypes.string,
  isDark: PropTypes.bool,
  anchorId: PropTypes.string,
};

export default LandscapeCard;
