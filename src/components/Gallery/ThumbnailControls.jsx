import React from 'react';
import PropTypes from 'prop-types';
import { Row, Pagination } from '@honda-canada/design-system-react';
import { ArrowButton } from './Arrows';
import themeStyles from './Gallery.styles';

const ThumbnailControlContainer = themeStyles.apply(Row, 'ThumbnailControlsContainer');

const ThumbnailControls = ({ pages = 1, setPage, currentPage, controlId, strings, isDark, isFullScreenMobile }) => (
  <ThumbnailControlContainer backgroundColor={isDark && !isFullScreenMobile ? 'black' : 'white'}>
    <ArrowButton
      name="arrowLeft"
      onClick={() => setPage(currentPage - 1)}
      aria-controls={controlId}
      disabled={currentPage === 1}
      aria-label={strings.prevThumbnailPageAria}
      isDark={isDark && !isFullScreenMobile}
    />

    <Pagination
      pages={pages}
      currentPage={currentPage}
      setPage={setPage}
      styling={isDark && !isFullScreenMobile ? 'dark' : null}
      isRound
    />

    <ArrowButton
      name="arrowRight"
      onClick={() => setPage(currentPage + 1)}
      aria-controls={controlId}
      disabled={currentPage === pages}
      aria-label={strings.nextThumbnailPageAria}
      isDark={isDark && !isFullScreenMobile}
    />
  </ThumbnailControlContainer>
);

ThumbnailControls.propTypes = {
  pages: PropTypes.number,
  setPage: PropTypes.func,
  currentPage: PropTypes.number,
  controlId: PropTypes.string,
  strings: PropTypes.shape(),
  isDark: PropTypes.bool,
};

export default ThumbnailControls;
