import React, { useRef, useState, useEffect } from 'react';
import { Splide } from '@splidejs/react-splide';
import PropTypes from 'prop-types';
import css from '@styled-system/css';
import styled from 'styled-components';
import { Box, IconWrapper, Icon, Pagination } from '@honda-canada/design-system-react';
import keypressCallback from '@honda-canada/js-utilities/lib/keypressCallback';
import { useTranslation } from 'react-i18next';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { getIsDarkMode } from '../../utils/sitecoreFields';
import themeStyles from './CarouselSlider.styles';

const StyledIconWrapper = styled(IconWrapper)(({ theme }) =>
  css({
    boxSizing: 'border-box',
    '&:focus': {
      border: 'transparent',
    },
    ...theme?.focused?.button(theme),
  }),
);

const CarouselContainer = themeStyles.apply(Box, 'CarouselContainer');

const CarouselSlider = ({
  index,
  length,
  children,
  content,
  arrowColor,
  paginationPaddingTop,
  paginationBgColor,
  paginationIsSticky,
  setAbsoluteLeft,
  splideOptions,
  hasPagination,
  paginationControlWithShadow,
  carouselStyles,
  centerAlign,
}) => {
  const carouselEl = useRef();
  const slideRefs = carouselEl?.current?.slides;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const { t } = useTranslation();
  const { sitecoreContext } = useSitecoreContext() || {};
  const enterKeyCode = 13;

  const setCurrentSlidePage = slideIndex => {
    carouselEl?.current?.splide?.go(slideIndex);
  };
  const isDark = getIsDarkMode(sitecoreContext?.route);
  const containerBackgroundColor = isDark ? 'black' : paginationBgColor;
  const chevronIconColor = isDark ? 'grey.2' : arrowColor;

  const perMove = splideOptions?.perMove ?? 1;
  const options = {
    pagination: false,
    arrows: false,
    padding: {
      left: '12vw',
      right: '12vw',
    },
    perMove,
    ...splideOptions,
  };

  useEffect(() => {
    if (!index) {
      setCurrentPage(0);
      carouselEl.current.splide.go(0);
    } else if (index > 0) {
      setCurrentSlide(index);
      setCurrentPage(Math.ceil(index / perMove));
    }
  }, [index, perMove, length]);

  useEffect(() => {
    slideRefs?.forEach(slide => {
      const focusableElements = slide.querySelectorAll('button, a');
      const isAriaHidden = slide.getAttribute('aria-hidden');
      if (isAriaHidden) {
        focusableElements.forEach(element => {
          element.setAttribute('tabIndex', '-1');
        });
      } else {
        focusableElements.forEach(element => {
          element.setAttribute('tabIndex', '0');
        });
      }
    });
  });

  return (
    <CarouselContainer centerAlign={centerAlign}>
      <Splide
        styles={{ backgroundColor: 'red' }}
        options={options}
        ref={carouselEl}
        onMove={(_, slideIndex) => {
          setCurrentSlide(slideIndex);
          setCurrentPage(Math.ceil(slideIndex / perMove));
        }}
      >
        {children({ currentSlide, setCurrentSlidePage })}
      </Splide>
      {content}
      <Box
        display="flex"
        mx="auto"
        mt={paginationPaddingTop}
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        height="48px"
        left={setAbsoluteLeft}
        boxShadow={paginationControlWithShadow ? '0px -2px 4px rgba(0, 0, 0, 0.1)' : 'none'}
        position={paginationIsSticky && 'fixed'}
        bottom={0}
        backgroundColor={containerBackgroundColor}
        {...carouselStyles}
      >
        {hasPagination && (
          <>
            <StyledIconWrapper
              onClick={e => {
                if (currentSlide === 0) {
                  e.preventDefault();
                } else {
                  carouselEl.current.splide.go(`-${perMove}`);
                }
              }}
              onKeyDown={keypressCallback(enterKeyCode, () => {
                if (!currentSlide === 0) {
                  carouselEl.current.splide.go(`-${perMove}`);
                }
              })}
              opacity={currentSlide === 0 ? 0.5 : 1}
              role="button"
              tabIndex={0}
              cursor="pointer"
              aria-label={t('Shared.Common.previousSlideAria')}
              display={['flex']}
              data-testid="arrow-left"
              backgroundColor={containerBackgroundColor}
            >
              <Icon name="arrowLeft" iconSize="large" height="13px" iconColor={chevronIconColor} />
            </StyledIconWrapper>
            <Pagination
              tabIndex={0}
              pages={length}
              styling={isDark ? 'dark' : undefined}
              currentPage={currentPage >= length ? currentPage : currentPage + 1}
              setPage={page => {
                carouselEl.current.splide.go((page - 1) * perMove);
                setCurrentPage(page - 1);
              }}
              isRound
            />
            <StyledIconWrapper
              onClick={e => {
                if (currentPage === length - 1) {
                  e.preventDefault();
                } else {
                  carouselEl.current.splide.go(`+${perMove}`);
                }
              }}
              onKeyDown={keypressCallback(enterKeyCode, () => {
                if (currentPage === length - 1) {
                  carouselEl.current.splide.go(`+${perMove}`);
                }
              })}
              opacity={currentPage === length - 1 ? 0.5 : 1}
              role="button"
              tabIndex={0}
              cursor="pointer"
              aria-label={t('Shared.Common.nextSlideAria')}
              display="flex"
              data-testid="arrow-right"
              backgroundColor={containerBackgroundColor}
            >
              <Icon name="arrowRight" iconSize="large" height="13px" iconColor={chevronIconColor} />
            </StyledIconWrapper>
          </>
        )}
      </Box>
    </CarouselContainer>
  );
};

CarouselSlider.defaultProps = {
  arrowColor: 'grey.0',
  hasPagination: true,
  paginationControlWithShadow: true,
  paginationPaddingTop: 'm',
  setAbsoluteLeft: undefined,
  paginationBgColor: 'white',
  carouselStyles: {},
};

CarouselSlider.propTypes = {
  index: PropTypes.number,
  length: PropTypes.number,
  children: PropTypes.func,
  arrowColor: PropTypes.string,
  setAbsoluteLeft: PropTypes.string,
  paginationBgColor: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  paginationPaddingTop: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  content: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  paginationControlWithShadow: PropTypes.bool,
  paginationIsSticky: PropTypes.bool,
  hasPagination: PropTypes.bool,
  splideOptions: PropTypes.shape({
    perMove: PropTypes.number,
  }),
  carouselStyles: PropTypes.shape({}),
};

export default CarouselSlider;
