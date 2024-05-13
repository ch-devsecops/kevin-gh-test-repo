import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Wrapper, Box, Column } from '@honda-canada/design-system-react';
import { useContainerResize } from '../../../utils/hooks/useContainerResize';

const desktopResizeSpeed = '.3s';

const LeftColumn = styled(Column)(({ isResized }) =>
  css({
    pt: isResized ? 'l' : 'xl',
    pb: isResized ? '44px' : 'xxl',
    transition: `padding-bottom ${desktopResizeSpeed} ease, padding-top ${desktopResizeSpeed} ease`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: '100%',
  }),
);

const RightColumn = styled(Column)(({ isResized }) =>
  css({
    pt: isResized ? 'l' : 'xl',
    pb: isResized ? 'l' : '54px',
    transition: `padding-bottom ${desktopResizeSpeed} ease, padding-top ${desktopResizeSpeed} ease`,
    height: '100%',
    display: 'flex',
  }),
);

const Header = styled(Box)(({ isResized }) =>
  css({
    transition: `height ${desktopResizeSpeed} ease`,
    height: isResized ? '297px' : '395px',
    top: '75px',
  }),
);

const DesktopHeader = ({ leftColumn, rightColumn, isSticky, isWide }) => {
  const resizeAfter = 20;
  const scrollable = typeof window !== 'undefined' && window;
  const { isResized } = useContainerResize(resizeAfter, scrollable);

  return (
    <Header
      scrollable={scrollable}
      resizeAfter={resizeAfter}
      isResized={isResized}
      position={isSticky && 'sticky'}
      bg="grey.5"
      width="100%"
      zIndex={210}
      boxShadow={isResized ? 'box.subNav' : 'none'}
    >
      <Wrapper height="100%" overflow="hidden">
        <Box
          width="100%"
          height="100%"
          display="flex"
          flexDirection="row"
          justifyContent={leftColumn ? 'space-between' : 'center'}
          alignItems="flex-start"
        >
          {leftColumn && (
            <LeftColumn width={4 / 12} isResized={isResized}>
              {leftColumn}
            </LeftColumn>
          )}
          <RightColumn width={isWide ? 1 : 8 / 12} isResized={isResized}>
            {rightColumn}
          </RightColumn>
        </Box>
      </Wrapper>
    </Header>
  );
};

DesktopHeader.propTypes = {
  leftColumn: PropTypes.element,
  rightColumn: PropTypes.element,
  isSticky: PropTypes.bool,
};

export default DesktopHeader;
