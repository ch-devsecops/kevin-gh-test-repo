import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Icon,
  Image,
  Markdown,
  MarkdownHeading,
  MediaItem,
  Optional,
  Tooltip,
  useOptionalVideo,
} from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import { ModelExplorationContext } from '../ModelExplorationContext';
import { getGtmTagValue } from '../../utils/gtmEvents';
import themeStyles from './PortraitCard.styles';

const Container = themeStyles.apply(Box, 'Container');
const MediaContainer = themeStyles.apply(Box, 'MediaContainer');
const HeadingContainer = themeStyles.apply(Box, 'HeadingContainer');
const TextContainer = themeStyles.apply(Box, 'TextContainer');
const BodyTextContainer = themeStyles.apply(Box, 'BodyTextContainer');
const CTAGroup = themeStyles.apply(Box, 'CTAGroup');

const PortraitCard = ({
  title,
  bodyText,
  ctas,
  image,
  textColor = 'typographyDefault',
  contentAlignment = 'center',
  backgroundColor,
  iconImage,
  video = {},
  isTertiaryCTAGroup = false,
  textContainerMargins,
  gtmTags = {},
  toolTip,
}) => {
  const { optionalVideo } = useOptionalVideo(video);
  const tooltipContainer = useRef(null);
  const [maxWidth, setMaxWidth] = useState('none');

  const modelExplorationContext = useContext(ModelExplorationContext) || {};
  const { isDark } = modelExplorationContext;
  const { t } = useTranslation();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      const tooltipContainerWidth = tooltipContainer?.current?.offsetWidth || 0;

      if (tooltipContainerWidth > 0 && tooltipContainerWidth < 315) {
        setMaxWidth('180px');
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderCTAs = isTertiary => {
    if (!ctas) {
      return null;
    }

    return (
      <CTAGroup
        isTertiaryCTAGroup={isTertiary}
        contentAlignment={contentAlignment}
        color={isDark ? 'white' : textColor}
      >
        {ctas}
      </CTAGroup>
    );
  };
  const ctaGroup = renderCTAs(isTertiaryCTAGroup);

  return (
    <Container
      backgroundColor={isDark ? '#000000' : backgroundColor}
      textAlign={contentAlignment}
      data-gtm-component-type={getGtmTagValue(gtmTags?.type)}
      data-gtm-category={getGtmTagValue(gtmTags?.category)}
      ref={tooltipContainer}
    >
      <Optional when={image}>
        <MediaContainer>
          <MediaItem
            image={<Image src={image?.props?.src} alt={image?.props?.alt} />}
            cmsIcon={iconImage}
            video={optionalVideo}
          />
        </MediaContainer>
      </Optional>
      <Optional when={!image}>
        <Box
          pt={['6px', '19px']}
          px={textContainerMargins && ['20px', '32px']}
          justifyContent={contentAlignment}
          display="flex"
        >
          <MediaItem image={iconImage} />
        </Box>
      </Optional>
      <Optional when={title || bodyText || (ctas && ctas.length > 0)}>
        <TextContainer hasMargins={textContainerMargins} hasImage={!!image}>
          <Optional when={title}>
            <HeadingContainer isDark={isDark} display="flex" justifyContent={contentAlignment}>
              <MarkdownHeading headingOverride="h4" color={isDark ? 'white' : textColor}>
                {title}
              </MarkdownHeading>
              <Optional when={toolTip}>
                <Tooltip
                  maxWidth={maxWidth}
                  styling={backgroundColor === 'white' || !backgroundColor ? 'light' : 'dark'}
                  content={
                    <Markdown size="xSmall" color="inherit">
                      {toolTip}
                    </Markdown>
                  }
                  ml="xxs"
                  forceHorizontalPosition="left"
                  ariaLabel={t('Shared.Common.showTooltipPopupAria')}
                  closeAriaLabel={t('Shared.Common.pressToClosePopupAria')}
                >
                  {({ active }) => (
                    <Box
                      width="16px" // iOS mobile / tablet fix
                      height="16px"
                    >
                      <Icon
                        name="information"
                        filled={active}
                        inverted={backgroundColor && backgroundColor !== 'white'}
                      />
                    </Box>
                  )}
                </Tooltip>
              </Optional>
            </HeadingContainer>
          </Optional>
          <Optional when={bodyText}>
            <BodyTextContainer isDark={isDark}>
              <Markdown color={isDark ? 'white' : textColor}>{bodyText}</Markdown>
            </BodyTextContainer>
          </Optional>
          {ctaGroup}
        </TextContainer>
      </Optional>
    </Container>
  );
};

PortraitCard.propTypes = {
  video: PropTypes.shape({
    src: PropTypes.string,
    ariaLabel: PropTypes.string,
    closeAriaLabel: PropTypes.string,
    onPlay: PropTypes.func,
  }),
  /**
   * Heading text (Markdown enabled)
   */
  title: PropTypes.string,
  image: PropTypes.element,
  /**
   * Content text (Markdown enabled)
   */
  bodyText: PropTypes.string,
  toolTip: PropTypes.string,
  /**
   * Sets text container background color.
   */
  backgroundColor: PropTypes.oneOf(['black', 'white', 'honda black', 'grey.5']),
  // Sets text color
  textColor: PropTypes.oneOf(['black', 'white']),
  /**
   * Content driven Icon
   */
  iconImage: PropTypes.element,
  contentAlignment: PropTypes.oneOf(['left', 'center']),
  ctas: PropTypes.arrayOf(PropTypes.element),
  isTertiaryCTAGroup: PropTypes.bool,
  textContainerMargins: PropTypes.bool,
  gtmTags: PropTypes.shape({
    type: PropTypes.string,
    category: PropTypes.string,
  }),
};

export default PortraitCard;
