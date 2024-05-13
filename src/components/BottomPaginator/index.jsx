import React from 'react';
import { Box, Pagination } from '@honda-canada/design-system-react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ArrowIcon from './ArrowIcon';
import themeStyles from './BottomPaginator.styles';

const Container = themeStyles.apply(Box, 'Container');

const BottomPaginator = ({
  pages,
  currentSlide,
  prevSlide,
  nextSlide,
  setCurrentSlide,
  isRound,
  iconColor,
  containerStyles,
  arrowStyles,
}) => {
  const { t } = useTranslation();

  return (
    <Container {...containerStyles}>
      <ArrowIcon
        name="arrowLeft"
        onClick={prevSlide}
        data-testid="arrow-left"
        ariaLabel={t('Shared.Common.previousSlideAria')}
        iconSize="default"
        iconColor={iconColor}
        {...arrowStyles}
      />
      <Pagination
        tabIndex={0}
        pages={pages}
        currentPage={currentSlide + 1}
        setPage={newPageIndex => setCurrentSlide(newPageIndex - 1)}
        isRound={isRound}
      />
      <ArrowIcon
        name="arrowRight"
        onClick={nextSlide}
        data-testid="arrow-right"
        ariaLabel={t('Shared.Common.nextSlideAria')}
        iconSize="default"
        iconColor={iconColor}
        {...arrowStyles}
      />
    </Container>
  );
};

BottomPaginator.defaultProps = {
  isRound: true,
  iconColor: 'grey.0',
  containerStyles: { width: '100%' },
  arrowStyles: { mx: 'big' },
};

BottomPaginator.propTypes = {
  pages: PropTypes.number,
  currentSlide: PropTypes.number,
  prevSlide: PropTypes.func,
  nextSlide: PropTypes.func,
  setCurrentSlide: PropTypes.func,
  isRound: PropTypes.bool,
  iconColor: PropTypes.string,
  containerStyles: PropTypes.shape({}),
  arrowStyles: PropTypes.shape({}),
};

export default BottomPaginator;
