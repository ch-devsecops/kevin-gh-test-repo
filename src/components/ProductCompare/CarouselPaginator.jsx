import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconWrapper, Icon, Pagination, Optional } from '@honda-canada/design-system-react';
import keypressCallback from '@honda-canada/js-utilities/lib/keypressCallback';
import { useTranslation } from 'react-i18next';
import themeStyles from './styles/CarouselPaginator.styles';
import { ENTER_KEY_CODE } from '../../utils/constants';

const ArrowIconWrapper = themeStyles.apply(IconWrapper, 'ArrowIconWrapper');
const Container = themeStyles.apply(Box, 'Container');

const slidingDirection = Object.freeze({
  prev: 'prev',
  next: 'next',
});

const CarouselPaginator = ({
  pages,
  currentSlide,
  prevSlide,
  nextSlide,
  setCurrentSlide,
  showPagination,
  arrowColor,
  paginationPaddingTop,
  paginationBgColor,
  paginationIsSticky,
  setAbsoluteLeft,
  paginationControlWithShadow,
  carouselStyles,
}) => {
  const { t } = useTranslation();

  const handleChangeSlide = direction => {
    if (direction === slidingDirection.next) {
      nextSlide();
    } else {
      prevSlide();
    }
  };
  return (
    <Container
      paginationPaddingTop={paginationPaddingTop}
      setAbsoluteLeft={setAbsoluteLeft}
      paginationControlWithShadow={paginationControlWithShadow}
      paginationIsSticky={paginationIsSticky}
      backgroundColor={paginationBgColor}
      {...carouselStyles}
    >
      <Optional when={showPagination}>
        <ArrowIconWrapper
          onClick={() => handleChangeSlide(slidingDirection.prev)}
          onKeyDown={keypressCallback(ENTER_KEY_CODE, () => handleChangeSlide(slidingDirection.prev))}
          disableArrow={currentSlide === 0}
          role="button"
          tabIndex={0}
          aria-label={t('Shared.Common.previousSlideAria')}
          data-testid="arrow-left"
          backgroundColor={paginationBgColor}
        >
          <Icon name="arrowLeft" iconSize="large" height="13px" iconColor={arrowColor} />
        </ArrowIconWrapper>
        <Pagination
          tabIndex={0}
          pages={pages}
          currentPage={currentSlide + 1}
          setPage={newPageIndex => setCurrentSlide(newPageIndex - 1)}
          isRound
        />
        <ArrowIconWrapper
          onClick={() => handleChangeSlide(slidingDirection.next)}
          onKeyDown={keypressCallback(ENTER_KEY_CODE, () => handleChangeSlide(slidingDirection.next))}
          disableArrow={currentSlide === pages - 1}
          role="button"
          tabIndex={0}
          aria-label={t('Shared.Common.nextSlideAria')}
          data-testid="arrow-right"
          backgroundColor={paginationBgColor}
        >
          <Icon name="arrowRight" iconSize="large" height="13px" iconColor={arrowColor} />
        </ArrowIconWrapper>
      </Optional>
    </Container>
  );
};

CarouselPaginator.defaultProps = {
  arrowColor: 'grey.0',
  showPagination: true,
  paginationControlWithShadow: false,
  paginationPaddingTop: 'm',
  setAbsoluteLeft: undefined,
  paginationBgColor: 'white',
  carouselStyles: {},
};

CarouselPaginator.propTypes = {
  currentSlide: PropTypes.number,
  prevSlide: PropTypes.func,
  nextSlide: PropTypes.func,
  setCurrentSlide: PropTypes.func,
  pages: PropTypes.number,
  arrowColor: PropTypes.string,
  setAbsoluteLeft: PropTypes.string,
  paginationBgColor: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  paginationPaddingTop: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  content: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  paginationControlWithShadow: PropTypes.bool,
  paginationIsSticky: PropTypes.bool,
  showPagination: PropTypes.bool,
  carouselStyles: PropTypes.shape({}),
};

export default CarouselPaginator;
