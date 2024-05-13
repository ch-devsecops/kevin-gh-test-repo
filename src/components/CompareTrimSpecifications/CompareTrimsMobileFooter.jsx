import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, Row, Icon, IconWrapper, Fade } from '@honda-canada/design-system-react';

const CompareTrimsMobileFooter = ({ currentDisplayedTrim, onTrimSelect, isVisible }) => {
  const isDisabled = pageNumber => pageNumber === currentDisplayedTrim;

  return (
    <Fade
      shouldAnimate={!isVisible}
      initialOpacity={isVisible ? 0 : 1}
      duration="0.05s"
      as={Row}
      zIndex={300}
      justifyContent="space-between"
      alignItems="center"
      boxShadow="box.top"
      bg="white"
      position="fixed"
      bottom={0}
    >
      <IconWrapper
        onClick={() => onTrimSelect(0)}
        bg="transparent"
        border="none"
        as="button"
        tabIndex={0}
        display="flex"
        cursor={isDisabled(0) ? 'initial' : 'pointer'}
        disabled={isDisabled(0)}
        data-testid="arrow-left"
      >
        <Icon iconColor={isDisabled(0) ? 'grey[2]' : 'black'} name="arrowLeft" />
      </IconWrapper>
      <Pagination
        tabIndex={0}
        pages={2}
        currentPage={currentDisplayedTrim + 1}
        setPage={page => onTrimSelect(page - 1)}
      />
      <IconWrapper
        onClick={() => onTrimSelect(1)}
        bg="transparent"
        border="none"
        as="button"
        tabIndex={0}
        display="flex"
        cursor={isDisabled(1) ? 'initial' : 'pointer'}
        disabled={isDisabled(1)}
        data-testid="arrow-right"
      >
        <Icon iconColor={isDisabled(1) ? 'grey[2]' : 'black'} name="arrowRight" />
      </IconWrapper>
    </Fade>
  );
};

CompareTrimsMobileFooter.propTypes = {
  currentDisplayedTrim: PropTypes.number,
  onTrimSelect: PropTypes.func,
  firstSelectedTrim: PropTypes.shape({
    name: PropTypes.string,
  }),
  secondSelectedTrim: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default CompareTrimsMobileFooter;
