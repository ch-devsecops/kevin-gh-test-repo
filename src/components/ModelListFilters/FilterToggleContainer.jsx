import React, { useRef, useLayoutEffect, useState } from 'react';
import { Copy, Box, IconWrapper, Icon, Expand, useMediaQueries } from '@honda-canada/design-system-react';
import keypressCallback from '@honda-canada/js-utilities/lib/keypressCallback';
import keyCodes from '@honda-canada/js-utilities/lib/keyCodes';
import styled from 'styled-components';
import css from '@styled-system/css';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const Heading = styled(Box)(({ isActive }) => ({
  '&::before': {
    content: '" "',
    position: 'absolute',
    transition: 'max-height 0.2s ease',
    top: 0,
    left: 0,
    width: '3px',
    height: '100%',
    maxHeight: isActive ? '100%' : 0,
    background: 'red',
  },
}));

const CollapseButton = styled(IconWrapper)(({ theme }) =>
  css({
    background: 'none',
    display: 'flex',
    alignItems: 'center',
    border: 'none',
    padding: '0',
    outline: 'none',
    cursor: 'pointer',

    '&:focus-visible': {
      outline: `solid 8px ${theme.colors.aodaFocused}`,
      outlineOffset: '-8px',
    },
    '&:focus': {
      border: 'transparent',
    },
  }),
);

const FilterToggleContainer = ({
  heading,
  hasSelections,
  expanded,
  setExpanded,
  expandOffsetHeight,
  children,
  toggleContainerWidth,
  ...rest
}) => {
  const containerEl = useRef(null);
  const [expandedHeight, setExpandedHeight] = useState(null);
  const { isMobile } = useMediaQueries();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const currentOffsetHeight = parseInt(containerEl?.current?.offsetHeight, 10);
    setExpandedHeight(`${currentOffsetHeight + expandOffsetHeight || 0}px`);
  }, [expanded]);

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { expanded });
    }
    return child;
  });

  return (
    <Box {...rest}>
      <Heading
        isActive={hasSelections}
        data-testid="category-heading"
        position="relative"
        height="45px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={0}
        borderBottom="1px solid"
        borderBottomColor="grey.2"
        boxShadow={expanded && isMobile && 'box.subNav'}
        width={toggleContainerWidth}
        cursor="pointer"
        onClick={() => setExpanded(!expanded)}
        onKeyDown={() => keypressCallback(keyCodes.ENTER, () => setExpanded(!expanded))}
      >
        <Copy ml={['20px', '20px', '16px']} size="small" fontFamily="bold" as="span" aria-label={heading}>
          {heading}
        </Copy>
        <CollapseButton
          as="button"
          aria-label={expanded ? t('Shared.Common.collapseAria') : t('Shared.Common.expandAria')}
          data-testid="expand-collapse-btn"
        >
          <Icon name="animatedPlusMinus" toggle={expanded} />
        </CollapseButton>
      </Heading>
      <Expand transitionDuration="t1" shouldAnimate={expanded} expandedHeight={expandedHeight}>
        <Box mt="s" mb="s" px={['default', 'zero']} ref={containerEl}>
          {childrenWithProps}
        </Box>
      </Expand>
    </Box>
  );
};

FilterToggleContainer.defaultProps = {
  expandOffsetHeight: 37,
};

FilterToggleContainer.propTypes = {
  expandOffsetHeight: PropTypes.number,
  heading: PropTypes.string,
  hasSelections: PropTypes.bool,
  expanded: PropTypes.bool,
  setExpanded: PropTypes.func,
  children: PropTypes.node,
};

export default FilterToggleContainer;
