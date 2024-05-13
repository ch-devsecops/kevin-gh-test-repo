import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Box } from '@honda-canada/design-system-react';
import themeStyles from './ScrollableDrawerCards.styles';
import Context from './service/Context';
import { NUMBER_OF_CARDS } from './service/constants';
import HorizontalProductCard from './HorizontalProductCard';

const ScrollableCardsContainer = themeStyles.apply(Box, 'ScrollableCardsContainer');

const ScrollableDrawerCards = ({ compareProducts = [] }) => {
  const compareCount = compareProducts?.length;
  const lastCardIndex = compareCount - 1;

  const { styles } = useContext(Context) || {};
  const { isHorizontal } = styles || {};
  const firstProduct = compareProducts[0]?.productline;

  return (
    <ScrollableCardsContainer isHorizontal={isHorizontal}>
      {new Array(NUMBER_OF_CARDS).fill()?.map((_, index) => (
        <Box key={index.toString()}>
          {index <= lastCardIndex && <HorizontalProductCard fields={compareProducts?.[index]} cardIndex={index} />}
          {index > lastCardIndex && <HorizontalProductCard firstProduct={firstProduct} empty />}
        </Box>
      ))}
    </ScrollableCardsContainer>
  );
};

ScrollableDrawerCards.propTypes = {
  compareProducts: PropTypes.arrayOf(PropTypes.shape({})),
};

export default ScrollableDrawerCards;
