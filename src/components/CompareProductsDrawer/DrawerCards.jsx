import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Box } from '@honda-canada/design-system-react';
import MiniatureProductCard from './MiniatureProductCard';
import themeStyles from './CompareDrawer.styles';
import Context from './service/Context';
import { NUMBER_OF_CARDS } from './service/constants';

const CardsContainer = themeStyles.apply(Box, 'CardsContainer');

const DrawerCards = ({ compareProducts = [] }) => {
  const compareCount = compareProducts?.length;
  const lastCardIndex = compareCount - 1;

  const { styles } = useContext(Context) || {};
  const { isHorizontal } = styles || {};

  return (
    <CardsContainer isHorizontal={isHorizontal}>
      {new Array(NUMBER_OF_CARDS).fill()?.map((_, index) => (
        <Box key={index.toString()}>
          {index <= lastCardIndex && <MiniatureProductCard fields={compareProducts?.[index]} cardIndex={index} />}
          {index > lastCardIndex && <MiniatureProductCard empty />}
        </Box>
      ))}
    </CardsContainer>
  );
};

DrawerCards.propTypes = {
  compareProducts: PropTypes.arrayOf(PropTypes.shape({})),
};

export default DrawerCards;
