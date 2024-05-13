import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Fade, Icon, Image, Link, Markdown, MarkdownHeading } from '@honda-canada/design-system-react';
import { InView } from 'react-intersection-observer';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import themeStyles from './InfoCard.styles';
import { getIsDarkMode, mapFieldToDesignSystemImage, mapGTMCategory } from '../../utils/sitecoreFields';
import { JSSFieldPropType } from '../../utils/propTypes';
import { getGtmTagValue } from '../../utils/gtmEvents';
import { getBackgroundColorToken, getForegroundColorToken } from '../../utils/carouselSlider';

const Container = themeStyles.apply(Box, 'InfoContainer');
const Heading = themeStyles.apply(MarkdownHeading, 'Heading');
const TextContainer = themeStyles.apply(Box, 'TextContainer');
const BodyText = themeStyles.apply(Markdown, 'BodyText');

const InfoCard = ({ fields, params, rendering, setIndex, ...rest }) => {
  const { t } = useTranslation();
  const { sitecoreContext } = useSitecoreContext() || {};

  if (!fields) return null;

  const { mediaImage, bodyText, title, gtmCategory } = fields;
  const image = mapFieldToDesignSystemImage(mediaImage, undefined, { objectFit: 'contain' });
  const gtmTags = {
    type: rendering?.componentName,
    category: mapGTMCategory(gtmCategory),
  };
  const isDark = getIsDarkMode(sitecoreContext?.route);
  const cardBackgroundColorToken = params?.cardBgColour?.toLowerCase();
  const cardBackgroundColor = getBackgroundColorToken(isDark, cardBackgroundColorToken);
  const cardForegroundColor = getForegroundColorToken(isDark, cardBackgroundColorToken);

  return (
    <InView triggerOnce>
      {({ inView, ref }) => (
        <Fade ref={ref} shouldAnimate={inView} height="100%" initialOpacity={0}>
          <Container
            color={cardForegroundColor}
            data-gtm-component-type={getGtmTagValue(gtmTags?.type)}
            data-gtm-category={getGtmTagValue(gtmTags?.category)}
            {...rest}
          >
            <Box>
              <Image src={image?.props?.src} alt={image?.props?.alt} />
            </Box>
            <TextContainer backgroundColor={cardBackgroundColor} color={cardForegroundColor}>
              <Heading headingOverride="h6" color="inherit">
                {title?.value}
              </Heading>
              <BodyText color="inherit">{bodyText?.value}</BodyText>
              <Box justifyContent="center">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Link as="button" styling="primary" onClick={setIndex} color={`${cardForegroundColor} !important`}>
                  {t('Shared.Common.learnMoreLabel')}
                  <Icon name="arrowRight" ml="xs" height="9px" width="5px" iconColor="primary" />
                </Link>
              </Box>
            </TextContainer>
          </Container>
        </Fade>
      )}
    </InView>
  );
};

InfoCard.propTypes = {
  fields: PropTypes.shape({
    mediaImage: PropTypes.shape({
      value: oneOfType([
        PropTypes.string,
        PropTypes.shape({
          alt: PropTypes.string,
          height: PropTypes.string,
          src: PropTypes.string,
          width: PropTypes.string,
        }),
      ]),
    }),
    modalMediaImage: PropTypes.shape({
      value: oneOfType([
        PropTypes.string,
        PropTypes.shape({
          alt: PropTypes.string,
          height: PropTypes.string,
          src: PropTypes.string,
          width: PropTypes.string,
        }),
      ]),
    }),
    title: JSSFieldPropType,
    bodyText: JSSFieldPropType,
    videoUrl: PropTypes.shape({
      src: PropTypes.string,
      ariaLabel: PropTypes.string,
      closeAriaLabel: PropTypes.string,
      onPlay: PropTypes.func,
    }),
    modalTitle: JSSFieldPropType,
    modalBodyText: JSSFieldPropType,
    gtmCategory: JSSFieldPropType,
  }),
  params: PropTypes.shape({
    autoId: PropTypes.string,
    cardAlignment: PropTypes.string,
    cardBgColour: PropTypes.string,
    cardHasPadding: PropTypes.string,
    cardsPerPage: PropTypes.string,
    containerBgColour: PropTypes.string,
    containerBottomMargin: PropTypes.string,
    containerTopMargin: PropTypes.string,
  }),
  rendering: PropTypes.shape({
    componentName: PropTypes.string,
  }),
  setIndex: PropTypes.func,
};

export default InfoCard;
