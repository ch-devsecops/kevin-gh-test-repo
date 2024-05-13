import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import css from '@styled-system/css';
import {
  Icon,
  IconWrapper,
  Pagination,
  Box,
  Row,
  useThemeContext,
  SwatchPicker,
  useMediaQueries,
} from '@honda-canada/design-system-react';
import useCarouselSwatch from './useCarouselSwatch';
import { SWATCH_GAP, SWATCH_WIDTH } from './constants';
import { ACURA_THEME_NAME } from '../../../utils/constants';

const CarouselSwatchColumn = styled(Box)(
  css({
    p: 'zero',
    mr: ['m', 'xs'],

    ':last-child': {
      mr: 'zero',
    },
  }),
);

const ArrowButton = ({ onClick, name, disabled = false, isDark, ...otherProps }) => {
  const { name: themeName, colors } = useThemeContext();
  const defaultActiveColor = isDark ? colors.white : colors.black;
  const disabledColor = themeName === ACURA_THEME_NAME ? colors.grey[3] : colors.grey[2];
  const color = themeName === ACURA_THEME_NAME ? colors.grey[0] : defaultActiveColor;

  return (
    <IconWrapper
      onClick={onClick}
      as="button"
      backgroundColor="transparent"
      border="none"
      cursor={!disabled ? 'pointer' : 'initial'}
      disabled={disabled}
      p={0}
      {...otherProps}
    >
      <Icon name={name} color={disabled ? disabledColor : color} width="7px" />
    </IconWrapper>
  );
};

const CarouselSwatch = ({
  swatches = [],
  selected,
  setSelected,
  length = 4,
  strings = {
    nextSwatchAria: 'view next swatch',
    prevSwatchAria: 'view previous swatch',
  },
  id = 'carousel-swatch-picker',
  isDark,
}) => {
  const pages = Math.ceil(swatches.length / length);
  const { currentPage, setCurrentPage, containerRef } = useCarouselSwatch(pages);
  const { isSmallDesktop, isDesktop } = useMediaQueries();

  const gap = isSmallDesktop || isDesktop ? SWATCH_GAP.desktop : SWATCH_GAP.mobile;
  const swatchWidth = isSmallDesktop || isDesktop ? SWATCH_WIDTH.desktop : SWATCH_WIDTH.mobile;
  const totalWidth = length * swatchWidth + (length - 1) * gap;

  if (typeof window === 'undefined') return null;

  return (
    <Box width={`${totalWidth}px`}>
      <Row ref={containerRef} id={id} as="ul" flexWrap="no-wrap" overflow="hidden" width="100%">
        {swatches.map((swatch, i) => (
          <CarouselSwatchColumn as="li" key={i.toString()}>
            <SwatchPicker
              swatch={swatch}
              isDark={isDark}
              onClick={() => setSelected(i)}
              icon={selected === i && 'checkmark'}
            />
          </CarouselSwatchColumn>
        ))}
      </Row>
      <Box width="calc(100% + 38px)" ml="-20px" display="flex" justifyContent="space-between" alignItems="center">
        <ArrowButton
          name="arrowLeft"
          onClick={() => setCurrentPage(currentPage - 1)}
          aria-controls={id}
          aria-label={strings.prevSwatchAria}
          disabled={currentPage === 1}
          isDark={isDark}
        />
        <Pagination pages={pages} currentPage={currentPage} setPage={setCurrentPage} isRound />
        <ArrowButton
          name="arrowRight"
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
          aria-controls={id}
          aria-label={strings.nextSwatchAria}
          disabled={currentPage === pages}
          isDark={isDark}
        />
      </Box>
    </Box>
  );
};

CarouselSwatch.propTypes = {
  swatches: PropTypes.arrayOf(PropTypes.shape({})),
  selected: PropTypes.number,
  setSelected: PropTypes.func,
  strings: PropTypes.shape({
    nextSwatchAria: PropTypes.string,
    prevSwatchAria: PropTypes.string,
  }),
};

export default CarouselSwatch;
