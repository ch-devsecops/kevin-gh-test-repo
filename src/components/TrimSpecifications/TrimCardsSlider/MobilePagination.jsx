import React, { useContext } from 'react';
import { Icon, IconWrapper, Box, Pagination as DesignSystemPagination } from '@honda-canada/design-system-react';
import keypressCallback from '@honda-canada/js-utilities/lib/keypressCallback';

import themeStyles from '../TrimSpecifications.styles';
import Context from '../service/Context';

const StyledWrapper = themeStyles.apply(Box, 'DesktopPaginationWrapper');

export const ArrowControls = ({ onPreviousPage, onNextPage, length, children, containerRef, ...otherProps }) => {
  const configurationProvider = useContext(Context);
  const { currentSlide, setCurrentSlide } = configurationProvider || {};

  const enterKeyCode = 13;
  const pageCount = length;

  const currentPage = currentSlide + 1;
  if (pageCount === 1) return null;

  const isLeftArrowDisabled = currentSlide === 0;
  const isRightArrowDisabled = currentPage === pageCount;

  return (
    <StyledWrapper ref={containerRef} {...otherProps} data-testid="cy-trim-mobile-pagination">
      <IconWrapper
        onClick={() => {
          if (isLeftArrowDisabled) return;
          setCurrentSlide(slide => slide - 1);
        }}
        onKeyDown={keypressCallback(enterKeyCode, onPreviousPage)}
        role="button"
        display="flex"
        cursor={!isLeftArrowDisabled ? 'pointer' : 'initial'}
        disabled={isLeftArrowDisabled}
      >
        <Icon name="arrowLeft" iconSize="default" width="7px" iconColor={isLeftArrowDisabled ? 'grey.2' : 'grey.0'} />
      </IconWrapper>
      {children({
        pageCount,
        currentPage,
        length,
      })}
      <IconWrapper
        onClick={() => {
          if (isRightArrowDisabled) return;
          setCurrentSlide(previousSlide => previousSlide + 1);
        }}
        onKeyDown={keypressCallback(enterKeyCode, onNextPage)}
        role="button"
        display="flex"
        cursor={!isRightArrowDisabled ? 'pointer' : 'initial'}
        disabled={isRightArrowDisabled}
      >
        <Icon name="arrowRight" iconSize="default" width="7px" iconColor={isRightArrowDisabled ? 'grey.2' : 'grey.0'} />
      </IconWrapper>
    </StyledWrapper>
  );
};

const Pagination = props => {
  const configurationProvider = useContext(Context);
  const { setCurrentSlide, styles } = configurationProvider || {};

  return (
    <ArrowControls {...props}>
      {({ pageCount, currentPage }) => (
        <DesignSystemPagination
          tabIndex={0}
          pages={pageCount}
          currentPage={currentPage}
          setPage={page => {
            setCurrentSlide(page - 1);
          }}
          isRound={styles?.slider?.pagination?.sliderIndicators === 'isRound'}
          isSquare={styles?.slider?.pagination?.sliderIndicators === 'isSquare'}
        />
      )}
    </ArrowControls>
  );
};

export default Pagination;
