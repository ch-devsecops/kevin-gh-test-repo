import React from 'react';
import PropTypes from 'prop-types';

import { Box, MediaItem, Optional, useOptionalVideo } from '@honda-canada/design-system-react';

import themeStyles from './AppCard.styles';
import { getGtmTagValue } from '../../utils/gtmEvents';

const Wrapper = themeStyles.apply(Box, 'Wrapper');
const MediaContainer = themeStyles.apply(Box, 'MediaContainer');
const ContentContainer = themeStyles.apply(Box, 'ContentContainer');
const ContentWrapper = themeStyles.apply(Box, 'ContentWrapper');
const CtaContainer = themeStyles.apply(Box, 'CtaContainer');
const CtaWrapper = themeStyles.apply(Box, 'CtaWrapper');

const AppCard = ({
  title,
  bodyText,
  image,
  video,
  cta,
  appCtas,
  anchorId,
  gtmTags = {},
  backgroundColor = 'darkBlue',
}) => {
  const { optionalVideo } = useOptionalVideo(video);

  return (
    <Wrapper
      id={anchorId}
      data-gtm-component-type={getGtmTagValue(gtmTags?.type)}
      data-gtm-category={getGtmTagValue(gtmTags?.category)}
      backgroundColor={backgroundColor}
    >
      <MediaContainer>
        <MediaItem image={image} video={optionalVideo} containerSize="100%" />
      </MediaContainer>

      <ContentContainer>
        <ContentWrapper>
          <Box mb={['xs', 'm']}>{title}</Box>

          {bodyText}
        </ContentWrapper>

        <CtaContainer>
          <Optional when={cta}>
            <CtaWrapper>{cta}</CtaWrapper>
          </Optional>

          <Optional when={appCtas}>
            <CtaWrapper isAppCta>{appCtas}</CtaWrapper>
          </Optional>
        </CtaContainer>
      </ContentContainer>
    </Wrapper>
  );
};

AppCard.defaultProps = {
  bodyText: '',
};

AppCard.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  bodyText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  image: PropTypes.element,
  video: PropTypes.shape({
    src: PropTypes.string,
    ariaLabel: PropTypes.string,
    closeAriaLabel: PropTypes.string,
  }),
  cta: PropTypes.element,
  appCtas: PropTypes.arrayOf(PropTypes.element),
  anchorId: PropTypes.string,
  gtmTags: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
  }),
  backgroundColor: PropTypes.string,
};

export default AppCard;
