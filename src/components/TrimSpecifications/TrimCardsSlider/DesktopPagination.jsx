import React, { useContext } from 'react';
import { Icon, IconWrapper, Box, Pagination as DesignSystemPagination } from '@honda-canada/design-system-react';
import keypressCallback from '@honda-canada/js-utilities/lib/keypressCallback';
import { useTranslation } from 'react-i18next';
import Context from '../service/Context';

import themeStyles from '../TrimSpecifications.styles';

const StyledWrapper = themeStyles.apply(Box, 'DesktopPaginationWrapper');

export const ArrowControls = ({ onPreviousPage, onNextPage, length, children, containerRef }) => {
  const { t } = useTranslation();
  const configurationProvider = useContext(Context);
  const { styles, slidePerPage, currentSlide, setCurrentSlide } = configurationProvider;

  const enterKeyCode = 13;
  const pageCount = Math.ceil(length / slidePerPage);
  let currentPage = currentSlide + 1;
  if (pageCount === 1) return null;

  currentPage = 1;
  if (currentSlide < length && currentSlide >= length - slidePerPage) {
    currentPage = pageCount;
  } else if (currentSlide >= slidePerPage) {
    currentPage = 2;
  }

  const isLeftArrowDisabled = currentSlide === 0;
  const isRightArrowDisabled = currentPage === pageCount;

  return (
    <StyledWrapper ref={containerRef} pagination={styles?.slider?.pagination}>
      <IconWrapper
        onClick={() => {
          if (isLeftArrowDisabled) return;

          if (currentPage === 3) {
            setCurrentSlide(Math.floor(length / 2));
          } else {
            setCurrentSlide(0);
          }
        }}
        onKeyDown={keypressCallback(enterKeyCode, onPreviousPage)}
        role="button"
        display="flex"
        cursor={!isLeftArrowDisabled ? 'pointer' : 'initial'}
        disabled={isLeftArrowDisabled}
        aria-label={t('Shared.Common.previousSlideAria')}
      >
        <Icon
          name="arrowLeft"
          iconSize={styles?.slider?.pagination.arrowIconSize}
          width="18px"
          iconColor={isLeftArrowDisabled ? 'grey.2' : 'grey.0'}
        />
      </IconWrapper>
      {children({
        pageCount,
        currentPage,
        length,
      })}
      <IconWrapper
        onClick={() => {
          if (isRightArrowDisabled) return;
          setCurrentSlide(previousSlide => previousSlide + slidePerPage);
        }}
        onKeyDown={keypressCallback(enterKeyCode, onNextPage)}
        role="button"
        display="flex"
        cursor={!isRightArrowDisabled ? 'pointer' : 'initial'}
        disabled={isRightArrowDisabled}
        aria-label={t('Shared.Common.nextSlideAria')}
      >
        <Icon
          name="arrowRight"
          iconSize={styles?.slider?.pagination.arrowIconSize}
          width="18px"
          iconColor={isRightArrowDisabled ? 'grey.2' : 'grey.0'}
        />
      </IconWrapper>
    </StyledWrapper>
  );
};

const Pagination = props => {
  const configurationProvider = useContext(Context);
  const { styles, setCurrentSlide } = configurationProvider || {};
  return (
    <ArrowControls {...props}>
      {({ pageCount, currentPage, length }) => (
        <DesignSystemPagination
          tabIndex={0}
          pages={pageCount}
          currentPage={currentPage}
          setPage={page => {
            if (page === 1) {
              setCurrentSlide(0);
            } else if (page === 2) {
              setCurrentSlide(Math.floor(length / 2));
            } else {
              setCurrentSlide(length - 1);
            }
          }}
          isRound={styles?.slider?.pagination?.sliderIndicators === 'isRound'}
          isSquare={styles?.slider?.pagination?.sliderIndicators === 'isSquare'}
        />
      )}
    </ArrowControls>
  );
};

export default Pagination;
