import React from 'react';
import { compiler } from 'markdown-to-jsx';
import { Placeholder, useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Box, H3, useMediaQueries, Wrapper } from '@honda-canada/design-system-react';
import { SplideSlide } from '@splidejs/react-splide';
import { wrapJSSFields } from '../../utils/wrapJSSFields';
import { getIsDarkMode, mapGTMCategory } from '../../utils/sitecoreFields';
import { getTitleComponent, stripMarkdownHeading } from '../../utils/markdown';
import CarouselSlider from '../CarouselSlider';
import { cardsPerPageParam, getCarouselPagesNumber, getResponsiveCardsPerPage } from './utils';
import { getIconColorToken, getBackgroundColorToken, getForegroundColorToken } from '../../utils/carouselSlider';

const StyledSplide = styled(SplideSlide)(({ theme, responsiveCardsPerPage }) =>
  css({
    display: responsiveCardsPerPage === 2 ? 'none' : 'flex',
    boxShadow: 'border-box',
    justifyContent: responsiveCardsPerPage === 1 && 'center',
    '&:focus-visible': {
      border: `solid 8px ${theme.colors.aodaFocused}`,
    },
    '&.is-next': {
      display: 'flex',
      justifyContent: responsiveCardsPerPage === 2 && 'flex-start',
    },
    '&.is-active': {
      display: 'flex',
      justifyContent: responsiveCardsPerPage === 2 && 'flex-end',
    },
  }),
);

const ItemContainer = styled(Box)(({ cardWidth }) =>
  css({
    boxSizing: 'content-box',
    width: `${cardWidth}%`,
    height: '100%',
    float: 'left',
    px: 's',
    maxWidth: [undefined, undefined, '400px'],
  }),
);

const CarouselCardsContainer = ({ fields, params, rendering }) => {
  const { isMobile, isSmallDesktop: isTablet } = useMediaQueries();
  const { sitecoreContext } = useSitecoreContext() || {};

  if (!fields) return null;

  const { placeholders } = rendering;
  const cardsPerPage = cardsPerPageParam[params?.cardsPerPage.toLowerCase()] || 4;

  const isDark = getIsDarkMode(sitecoreContext?.route);
  const backgroundColorToken = params?.bgColour?.toLowerCase();
  const containerBackgroundColor = getBackgroundColorToken(isDark, backgroundColorToken);
  const containerForegroundColor = getForegroundColorToken(isDark, backgroundColorToken);
  const arrowColor = getIconColorToken(isDark, backgroundColorToken);

  const { contentTitle, gtmTitle, gtmCategory } = wrapJSSFields(fields);

  const gtmTags = {
    category: mapGTMCategory(gtmCategory),
    type: rendering?.componentName,
    title: gtmTitle?.value,
  };

  const TitleComponent = getTitleComponent(contentTitle?.value, H3);

  const items = placeholders ? placeholders['carousel-cards-content']?.filter(i => !!i.componentName) : null;

  const responsiveCardsPerPage = items ? getResponsiveCardsPerPage(items.length, cardsPerPage, isMobile, isTablet) : 0;
  const carouselPagesNumber = items ? getCarouselPagesNumber(items.length, responsiveCardsPerPage) : 0;
  const hidePagination = (isMobile && carouselPagesNumber === 1) || responsiveCardsPerPage === 0;

  return (
    <Box
      data-gtm-category={gtmTags.category}
      data-gtm-component-type={gtmTags.type}
      data-gtm-title={gtmTags.title}
      pb="xl"
      data-testid="carousel-cards-container"
      backgroundColor={containerBackgroundColor}
    >
      <Wrapper maxWidth="1440px">
        {contentTitle?.value && (
          <TitleComponent
            color={containerForegroundColor}
            mt={['20px', '40px']}
            width="100%"
            textAlign="center"
            textTransformation="none"
          >
            {compiler(stripMarkdownHeading(contentTitle?.value))}
          </TitleComponent>
        )}
        <CarouselSlider
          length={carouselPagesNumber}
          paginationControlWithShadow={false}
          paginationBgColor={containerBackgroundColor}
          arrowColor={arrowColor}
          hasPagination={!hidePagination}
          splideOptions={{
            padding: null,
            perPage: responsiveCardsPerPage,
            perMove: responsiveCardsPerPage,
          }}
          data-testid="carousel-page"
        >
          {() => (
            <Placeholder
              name="carousel-cards-content"
              rendering={rendering}
              renderEach={(component, index) => (
                <StyledSplide
                  key={index.toString()}
                  data-testid="carouselCard"
                  responsiveCardsPerPage={responsiveCardsPerPage}
                  index={index}
                >
                  <Box alignItems="center" display="flex" flexDirection="column" pt="l" height="100%">
                    <Box width="100%" height="100%">
                      <ItemContainer>{component}</ItemContainer>
                    </Box>
                  </Box>
                </StyledSplide>
              )}
            />
          )}
        </CarouselSlider>
      </Wrapper>
    </Box>
  );
};

export default CarouselCardsContainer;
