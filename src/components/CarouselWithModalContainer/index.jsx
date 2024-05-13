import React, { useState } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import {
  Box,
  Markdown,
  MarkdownHeading,
  Optional,
  Row,
  useMediaQueries,
  Wrapper,
} from '@honda-canada/design-system-react';
import { SplideSlide } from '@splidejs/react-splide';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { wrapJSSFields } from '../../utils/wrapJSSFields';
import themeStyles from './CarouselWIthModalContainer.styles';
import CarouselSlider from '../CarouselSlider';
import { JSSFieldPropType } from '../../utils/propTypes';
import { getIsDarkMode, mapGTMCategory } from '../../utils/sitecoreFields';
import { cardsPerPageParam, getCarouselPagesNumber } from '../CarouselCardsContainer/utils';
import ModalContent from './ModalContent';
import getContentMargins from '../../utils/getContentMargins';
import InfoCard from './InfoCard';
import getResponsiveCardsPerPage from './utils';
import { getGtmTagValue } from '../../utils/gtmEvents';
import { getIconColorToken, getBackgroundColorToken, getForegroundColorToken } from '../../utils/carouselSlider';

const Content = themeStyles.apply(Box, 'Content');
const Container = themeStyles.apply(Row, 'Container');
const TitleHeader = themeStyles.apply(MarkdownHeading, 'TitleHeader');
const CarouselWrapper = themeStyles.apply(Box, 'CarouselWrapper');
const CarouselContainer = themeStyles.apply(Box, 'CarouselContainer');
const BodyText = themeStyles.apply(Markdown, 'BodyText');
const StyledSplide = themeStyles.apply(SplideSlide, 'StyledSplide');

const CarouselWithModalContainer = ({ fields, params, rendering, ...rest }) => {
  const [index, setIndex] = useState(-1);
  const { isMobile } = useMediaQueries();
  const { sitecoreContext } = useSitecoreContext() || {};

  if (!fields) return null;

  const margins = getContentMargins(params);

  const { title, bodyText, gtmTitle, gtmCategory } = wrapJSSFields(fields);
  const items = fields?.items;

  if (!items?.length) return null;

  const MAX_CARD_PER_SLIDE = 4;
  const cardsPerPage = cardsPerPageParam[params?.cardsPerPage?.toLowerCase()] || MAX_CARD_PER_SLIDE;

  const setIsModalOpen = i => setIndex(i);
  const onClose = () => setIndex(-1);

  const gtmTags = {
    category: mapGTMCategory(gtmCategory),
    type: rendering?.componentName,
    title: gtmTitle?.value,
  };

  const responsiveCardsPerPage = items ? getResponsiveCardsPerPage(items.length, cardsPerPage, isMobile) : 0;
  const carouselPagesNumber = items ? getCarouselPagesNumber(items.length, responsiveCardsPerPage) : 0;
  const hidePagination = responsiveCardsPerPage >= items.length;

  const isDark = getIsDarkMode(sitecoreContext?.route);
  const backgroundColorToken = params?.containerBgColour?.toLowerCase();
  const containerBackgroundColor = getBackgroundColorToken(isDark, backgroundColorToken);
  const containerForegroundColor = getForegroundColorToken(isDark, backgroundColorToken);
  const arrowColor = getIconColorToken(isDark, backgroundColorToken);

  return (
    <CarouselWrapper backgroundColor={containerBackgroundColor} color={containerForegroundColor} margins={margins}>
      <Wrapper
        data-gtm-category={getGtmTagValue(gtmTags?.category)}
        data-gtm-component-type={getGtmTagValue(gtmTags?.type)}
        data-gtm-title={getGtmTagValue(gtmTags?.title)}
        px="0 !important"
        {...rest}
      >
        <Container margins={margins}>
          <Content>
            <TitleHeader headingOverride="h3" color={containerForegroundColor}>
              {title?.value}
            </TitleHeader>
            <BodyText size="regular" color={containerForegroundColor}>
              {bodyText?.value}
            </BodyText>
          </Content>
        </Container>
        <Optional when={items?.length}>
          <CarouselContainer margins={margins}>
            <CarouselSlider
              arrowColor={arrowColor}
              length={carouselPagesNumber}
              paginationControlWithShadow={false}
              hasPagination={!hidePagination}
              paginationBgColor={containerBackgroundColor}
              paginationPaddingTop={['m', 'm', 'xxl']}
              splideOptions={{
                padding: undefined,
                perPage: responsiveCardsPerPage,
                perMove: responsiveCardsPerPage,
                start: index,
                gap: '24px',
              }}
              data-testid="carousel-page"
            >
              {() =>
                items.map((item, i) => (
                  <StyledSplide key={item.id} responsiveCardsPerPage={responsiveCardsPerPage}>
                    <InfoCard index={i} params={params} setIndex={() => setIsModalOpen(i)} {...item} />
                  </StyledSplide>
                ))
              }
            </CarouselSlider>
          </CarouselContainer>
        </Optional>
        <ModalContent items={items} index={index} onClose={onClose} />
      </Wrapper>
    </CarouselWrapper>
  );
};

CarouselWithModalContainer.propTypes = {
  fields: PropTypes.shape({
    anchorId: JSSFieldPropType,
    videoUrl: JSSFieldPropType,
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
    title: JSSFieldPropType,
    bodyText: JSSFieldPropType,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        url: PropTypes.string,
        name: PropTypes.string,
        displayName: PropTypes.string,
        fields: PropTypes.shape({
          id: PropTypes.string,
          url: PropTypes.string,
          name: PropTypes.string,
          displayName: PropTypes.string,
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
            title: JSSFieldPropType,
            modalTitle: JSSFieldPropType,
            bodyText: JSSFieldPropType,
            modalBodyText: JSSFieldPropType,
            videoUrl: PropTypes.shape({
              src: PropTypes.string,
              ariaLabel: PropTypes.string,
              closeAriaLabel: PropTypes.string,
              onPlay: PropTypes.func,
            }),
            modalVideoUrl: PropTypes.shape({
              src: PropTypes.string,
              ariaLabel: PropTypes.string,
              closeAriaLabel: PropTypes.string,
              onPlay: PropTypes.func,
            }),
            gtmTitle: JSSFieldPropType,
            gtmCategory: JSSFieldPropType,
          }),
        }),
      }),
    ),
  }),
  rendering: PropTypes.shape({
    componentName: PropTypes.string,
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
    cntnrHorizontalMargin: PropTypes.string,
  }),
  rest: PropTypes.shape({}),
};

export default CarouselWithModalContainer;
